// Pinterest 去廣告 - Shadowrocket http-response 腳本
// 原理：Pinterest 的 Promoted Pin 和正常 Pin 走同一條 api.pinterest.com/v3 接口，
// 域名屏蔽去不掉，必須在響應 JSON 裏把帶推廣標記的項過濾掉。
// 策略：遞歸遍歷所有數組，刪除帶推廣標記的元素；刪除 ads / promoted_pins 等字段。
// 出錯時原樣返回，絕不讓 App 斷流。

function isAdItem(item) {
  if (!item || typeof item !== 'object') return false;
  if (item.is_promoted === true) return true;
  if (item.is_promoted_pin === true) return true;
  if (item.promoted === true) return true;
  if (item.is_ad === true) return true;
  if (item.sponsored === true) return true;
  if (item.advertiser || item.promotion || item.promoted_by) return true;
  if (item.promotion_id || item.ad_id || item.ad_account_id) return true;
  if (typeof item.type === 'string' && /^(ad|ads|promoted|sponsored)$/i.test(item.type)) return true;
  // 推廣標記常藏在嵌套的 pin/data 對象裏，字符串兜底檢查一次
  try {
    var s = JSON.stringify(item);
    if (s.indexOf('"is_promoted":true') !== -1) return true;
    if (s.indexOf('"is_promoted_pin":true') !== -1) return true;
  } catch (e) {}
  return false;
}

function clean(node) {
  if (Array.isArray(node)) {
    var filtered = node.filter(function (e) { return !isAdItem(e); });
    for (var i = 0; i < filtered.length; i++) {
      filtered[i] = clean(filtered[i]);
    }
    return filtered;
  }
  if (node && typeof node === 'object') {
    for (var k in node) {
      if (!Object.prototype.hasOwnProperty.call(node, k)) continue;
      // 明確的廣告容器直接刪除
      if (k === 'ads' || k === 'promoted_pins' || k === 'ad_slots' || k === 'promoted') {
        delete node[k];
        continue;
      }
      node[k] = clean(node[k]);
    }
  }
  return node;
}

try {
  var body = $response.body;
  if (body) {
    var obj = JSON.parse(body);
    obj = clean(obj);
    $done({ body: JSON.stringify(obj) });
  } else {
    $done({});
  }
} catch (e) {
  // 解析失敗或結構變化時原樣放行，避免 Pinterest 白屏／加載失敗
  $done({});
}

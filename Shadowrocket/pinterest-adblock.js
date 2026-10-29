// Pinterest 去广告 v2 - Shadowrocket http-response 脚本
// 针对 App 更新后失效的情况加宽了判断：原版只认 is_promoted 等旧标记，
// 新版可能换了标记名。v2 增加：任何键名含 promoted / sponsor / advert
// 且值非空的对象都视为广告；同时检查嵌套的 pin / data 对象。
// 策略不变：只删广告项，解析失败原样返回，绝不让 App 断流。
// 注意：这是加宽启发式，不是已验证的新版接口字段；若 v2 仍无效，
// 说明问题不在标记名，而在拦截本身（新接口地址或证书固定），需抓请求日志定位。

function hasAdKey(obj) {
  for (var k in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
    var lk = k.toLowerCase();
    if (lk.indexOf('promoted') !== -1 || lk.indexOf('sponsor') !== -1 || lk.indexOf('advert') !== -1) {
      var v = obj[k];
      if (v === true || (typeof v === 'string' && v.length > 0) || (v && typeof v === 'object')) return true;
    }
    if (lk === 'campaign_id' || lk === 'ad_id' || lk === 'ad_account_id' || lk === 'ad_group_id' || lk === 'ad_creative_id') {
      if (obj[k]) return true;
    }
  }
  return false;
}

function isAdItem(item) {
  if (!item || typeof item !== 'object') return false;
  if (item.is_promoted === true) return true;
  if (item.is_promoted_pin === true) return true;
  if (item.promoted === true) return true;
  if (item.is_ad === true) return true;
  if (item.sponsored === true) return true;
  if (item.is_sponsored === true) return true;
  if (item.advertiser || item.promotion || item.promoted_by || item.sponsored_by) return true;
  if (item.promotion_id || item.ad_id || item.ad_account_id || item.campaign_id) return true;
  if (typeof item.type === 'string' && /^(ad|ads|promoted|sponsored|shopping_ad|product_ad|ad_pin)$/i.test(item.type)) return true;
  // 嵌套对象：推广标记可能藏在 pin / data 里
  if (item.pin && isAdItem(item.pin)) return true;
  if (item.data && isAdItem(item.data)) return true;
  // 通用键名兜底：新标记名只要含 promoted / sponsor / advert 就算
  if (hasAdKey(item)) return true;
  try {
    var s = JSON.stringify(item);
    if (s.indexOf('"is_promoted":true') !== -1) return true;
    if (s.indexOf('"is_promoted_pin":true') !== -1) return true;
    if (s.indexOf('"is_sponsored":true') !== -1) return true;
    if (s.indexOf('"sponsored":true') !== -1) return true;
    if (s.indexOf('"is_ad":true') !== -1) return true;
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
      // 明确的广告容器直接删除（v2 增加 sponsored / shopping_ads 等）
      if (k === 'ads' || k === 'promoted_pins' || k === 'sponsored_pins' || k === 'ad_slots' || k === 'promoted' || k === 'sponsored' || k === 'shopping_ads' || k === 'ad_items' || k === 'promoted_items') {
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
  // 解析失败或结构变化时原样放行，避免 Pinterest 白屏／加载失败
  $done({});
}

// 開屏去廣告 - 定制版，僅處理開屏請求
// 各 App 的處理位置不一樣，腳本只負責下面兩種，其它 App 在模組文件裏處理：
// - 騰訊視頻（重點）：走騰訊廣告平台 GDT，在模組 [Rewrite] 攔 gdt_mview，在 [Rule] 擋 gdt.qq.com，不走本腳本
// - 豆瓣（重點）：在模組 [Rewrite] 直接拒絕 api.douban.com/v2/app_ads/splash，不走本腳本
// - 優酷、咪咕視頻：同樣在模組 [Rewrite] 直接拒絕專用開屏接口，不走本腳本
// - 嗶哩嗶哩、愛奇藝：本腳本處理，見下面代碼
// 安全原則：解析失敗時原樣放行，絕不返回空字符串，避免 App 白屏或閃退
// 不處理片前廣告，不偽造會員狀態，不解鎖付費內容

function cleanSplash(node) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach(cleanSplash);
    return;
  }
  Object.keys(node).forEach(function (key) {
    var lower = key.toLowerCase();
    // 開屏、啓動廣告類字段直接清空，保留其它正常配置
    if (lower.indexOf("splash") !== -1 || lower.indexOf("launch") !== -1 || lower === "ads" || lower === "adlist" || lower === "startup_ad") {
      if (Array.isArray(node[key])) {
        node[key] = [];
      } else {
        node[key] = null;
      }
      return;
    }
    cleanSplash(node[key]);
  });
}

try {
  var url = $request.url || "";
  var body = $response.body || "";
  var obj = JSON.parse(body);

  // 嗶哩嗶哩：app.bilibili.com/x/v2/splash/list
  // 原始結構裏 data.list 就是開屏列表，清空後 App 會認為本次沒有開屏可展示
  if (url.indexOf("app.bilibili.com/x/v2/splash/list") !== -1) {
    if (obj && obj.data && Array.isArray(obj.data.list)) {
      obj.data.list = [];
    }
    if (obj && obj.data && typeof obj.data.show !== "undefined") {
      obj.data.show = false;
    }
  }

  // 愛奇藝：cupid.iqiyi.com/mixer
  // 混排接口裏可能帶有開屏配置，通用清理開屏類字段，其它配置原樣保留
  if (url.indexOf("cupid.iqiyi.com/mixer") !== -1) {
    cleanSplash(obj);
  }

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  // 解析失敗原樣放行
  $done({});
}

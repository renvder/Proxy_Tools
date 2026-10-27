/*
 * 開屏去廣告
 *
 * 本腳本只處理：
 * 1. 嗶哩嗶哩：/x/v2/splash/list
 * 2. 愛奇藝：指定 cupid 網域的 /mixer 回應
 *
 * 其餘 App 由模組中的 Rewrite / Rule 處理。
 *
 * JSON 解析失敗或處理出錯時，保留原始回應，並在日誌中輸出原因。
 * 日誌關鍵字：Splash-AdBlock
 * 不處理片前廣告，不偽造會員狀態，不解鎖付費內容。
 */

(function () {
    "use strict";

    var TAG = "[Splash-AdBlock] ";
    var changed = false;

    /*
     * 只匹配明確的廣告欄位名稱，不使用寬泛的包含匹配，
     * 避免清空可能含有正常設定的整個物件。
     */
    var adKeys = {
        splash_ad: true,
        splash_ads: true,
        splashad: true,
        splashads: true,
        launch_ad: true,
        launch_ads: true,
        launchad: true,
        launchads: true,
        startup_ad: true,
        startup_ads: true,
        startupad: true,
        startupads: true,
        ads: true,
        adlist: true,
        ad_list: true
    };

    function log(msg) {
        if (typeof console !== "undefined" && console.log) {
            console.log(TAG + msg);
        }
    }

    function cleanSplash(node) {
        if (!node || typeof node !== "object") {
            return;
        }

        if (Array.isArray(node)) {
            node.forEach(cleanSplash);
            return;
        }

        Object.keys(node).forEach(function (key) {
            var value = node[key];

            if (Object.prototype.hasOwnProperty.call(adKeys, key.toLowerCase())) {
                if (Array.isArray(value)) {
                    if (value.length > 0) {
                        node[key] = [];
                        changed = true;
                    }
                } else if (value !== null) {
                    node[key] = null;
                    changed = true;
                }
                return;
            }

            cleanSplash(value);
        });
    }

    /*
     * 嗶哩嗶哩：list 與 show 可能是數組，也可能是布爾值。
     * 數組清空，布爾 true 改為 false，保持原有類型，避免客戶端解析失敗。
     */
    function cleanBilibili(obj) {
        var data = obj.data;

        if (!data || typeof data !== "object" || Array.isArray(data)) {
            return;
        }

        ["list", "show"].forEach(function (key) {
            var value = data[key];

            if (Array.isArray(value)) {
                if (value.length > 0) {
                    data[key] = [];
                    changed = true;
                }
            } else if (value === true) {
                data[key] = false;
                changed = true;
            }
        });
    }

    var result = {};

    try {
        var url =
            typeof $request !== "undefined" && $request ? $request.url || "" : "";

        var body =
            typeof $response !== "undefined" && $response ? $response.body : null;

        var isBilibili =
            /^https?:\/\/app\.bilibili\.com\/x\/v2\/splash\/list(?:[/?]|$)/i.test(url);

        var isIqiyi =
            /^https?:\/\/(?:t7z|kjp)\.cupid\.iqiyi\.com\/mixer(?:\?|$)/i.test(url);

        if (!isBilibili && !isIqiyi) {
            log("未匹配的 URL，放行：" + url.slice(0, 80));
        } else if (typeof body !== "string" || body.length === 0) {
            // 二進制或空回應：Shadowrocket 不會以字串提供，此處無法處理
            log((isBilibili ? "bilibili" : "iqiyi") + " 回應不是文本或為空，放行（body 類型：" + typeof body + "）");
        } else {
            var obj = JSON.parse(body);

            if (obj && typeof obj === "object") {
                if (isBilibili) {
                    cleanBilibili(obj);
                } else {
                    cleanSplash(obj);
                }

                if (changed) {
                    result = { body: JSON.stringify(obj) };
                    log((isBilibili ? "bilibili" : "iqiyi") + " 已清除廣告欄位");
                } else {
                    log(
                        (isBilibili ? "bilibili" : "iqiyi") +
                            " 解析成功但沒有可清除的欄位，頂層鍵：" +
                            Object.keys(obj).slice(0, 12).join(",")
                    );
                }
            }
        }
    } catch (e) {
        log("處理失敗，放行原始回應：" + (e && e.message ? e.message : e));
        result = {};
    }

    $done(result);
})();

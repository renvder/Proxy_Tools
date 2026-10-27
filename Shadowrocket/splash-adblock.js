/*
 * 開屏去廣告
 *
 * 本腳本只處理：
 * 1. 嗶哩嗶哩：/x/v2/splash/list
 * 2. 愛奇藝：指定 cupid 網域的 /mixer 回應
 *
 * 豆瓣、優酷、咪咕視頻由模組中的 Rewrite 處理。
 *
 * 騰訊視頻：
 * 本腳本不處理騰訊視頻。
 * 模組內只有通用 GDT 攔截，未確認能攔截騰訊視頻開屏。
 *
 * JSON 解析失敗或處理出錯時，保留原始回應。
 * 不處理片前廣告，不偽造會員狀態，不解鎖付費內容。
 */

(function () {
    "use strict";

    var changed = false;

    /*
     * 只匹配明確的廣告欄位名稱。
     * 不使用「包含 launch 或 splash」的寬泛匹配，
     * 避免直接清空可能含有正常設定的整個物件。
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

    function cleanSplash(node) {
        if (!node || typeof node !== "object") {
            return;
        }

        if (Array.isArray(node)) {
            node.forEach(cleanSplash);
            return;
        }

        Object.keys(node).forEach(function (key) {
            var lower = key.toLowerCase();
            var value = node[key];

            if (
                Object.prototype.hasOwnProperty.call(adKeys, lower)
            ) {
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

    var result = {};

    try {
        var url =
            typeof $request !== "undefined" && $request
                ? $request.url || ""
                : "";

        var body =
            typeof $response !== "undefined" && $response
                ? $response.body
                : null;

        var isBilibili =
            /^https?:\/\/app\.bilibili\.com\/x\/v2\/splash\/list(?:[/?]|$)/i.test(
                url
            );

        var isIqiyi =
            /^https?:\/\/(?:t7z|kjp)\.cupid\.iqiyi\.com\/mixer(?:\?|$)/i.test(
                url
            );

        if (
            (isBilibili || isIqiyi) &&
            typeof body === "string" &&
            body.length > 0
        ) {
            var obj = JSON.parse(body);

            if (obj && typeof obj === "object") {
                if (isBilibili) {
                    if (
                        obj.data &&
                        typeof obj.data === "object" &&
                        !Array.isArray(obj.data)
                    ) {
                        if (
                            Array.isArray(obj.data.list) &&
                            obj.data.list.length > 0
                        ) {
                            obj.data.list = [];
                            changed = true;
                        }

                        if (
                            Object.prototype.hasOwnProperty.call(
                                obj.data,
                                "show"
                            ) &&
                            obj.data.show !== false
                        ) {
                            obj.data.show = false;
                            changed = true;
                        }
                    }
                } else if (isIqiyi) {
                    cleanSplash(obj);
                }

                if (changed) {
                    result = {
                        body: JSON.stringify(obj)
                    };
                }
            }
        }
    } catch (e) {
        result = {};
    }

    $done(result);
})();

/*
 * Splash Ad Blocker
 *
 * This script only handles:
 * 1. Bilibili: /x/v2/splash/list
 * 2. iQiyi: /mixer responses on the specified cupid domains
 *
 * Other apps are handled by Rewrite / Rule in the module.
 *
 * On JSON parse failure or any processing error, keep the original response and log the reason.
 * Log keyword: Splash-AdBlock
 * Does not handle pre-roll ads, does not fake membership status, does not unlock paid content.
 */

(function () {
    "use strict";

    var TAG = "[Splash-AdBlock] ";
    var changed = false;

    /*
     * Only match explicit ad field names, not broad substring matching,
     * to avoid clearing a whole object that may contain normal settings.
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
     * Bilibili: list and show may be an array or a boolean.
     * Empty arrays, change true to false, keep the original type to avoid client parse failure.
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
            log("Unmatched URL, passing through: " + url.slice(0, 80));
        } else if (typeof body !== "string" || body.length === 0) {
            // Binary or empty response: Shadowrocket does not provide it as a string, so it cannot be handled here
            log((isBilibili ? "bilibili" : "iqiyi") + " response is not text or is empty, passing through (body type: " + typeof body + ")");
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
                    log((isBilibili ? "bilibili" : "iqiyi") + " ad fields cleared");
                } else {
                    log(
                        (isBilibili ? "bilibili" : "iqiyi") +
                            " parsed successfully but no removable fields, top-level keys: " +
                            Object.keys(obj).slice(0, 12).join(",")
                    );
                }
            }
        }
    } catch (e) {
        log("Processing failed, passing through original response: " + (e && e.message ? e.message : e));
        result = {};
    }

    $done(result);
})();

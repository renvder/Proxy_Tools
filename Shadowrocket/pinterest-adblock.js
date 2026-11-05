// Pinterest AdBlock v2 - Shadowrocket http-response script
// Widened checks for the case where the app update broke it: the original only recognised old markers like is_promoted,
// and the new version may have renamed the markers. v2 adds: any object with a key containing promoted / sponsor / advert
// and a non-empty value is treated as an ad; it also checks nested pin / data objects.
// Strategy unchanged: only delete ad items, pass through unchanged on parse failure, never break the app.
// Note: this is a widened heuristic, not a verified new-version API field; if v2 still does not work,
// the problem is not the marker name, but interception itself (new endpoint or certificate pinning); capture the request log to locate it.

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
  // Nested objects: promotion markers may hide inside pin / data
  if (item.pin && isAdItem(item.pin)) return true;
  if (item.data && isAdItem(item.data)) return true;
  // Generic key fallback: any new marker name containing promoted / sponsor / advert counts
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
      // Delete explicit ad containers directly (v2 adds sponsored / shopping_ads, etc.)
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
  // On parse failure or structure change, pass through unchanged to avoid a Pinterest blank screen / load failure
  $done({});
}

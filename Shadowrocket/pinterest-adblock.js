var removedCount = 0;

function hasAdKey(obj) {
  for (var k in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
    var lk = k.toLowerCase();
    if (lk.indexOf('promoted') !== -1 || lk.indexOf('sponsor') !== -1 || lk.indexOf('advert') !== -1 ||
        lk.indexOf('shopping_ad') !== -1 || lk.indexOf('ad_metadata') !== -1 ||
        lk.indexOf('idea_ad') !== -1 || lk.indexOf('paid_partnership') !== -1) {
      var v = obj[k];
      if (v === true || (typeof v === 'string' && v.length > 0) || (v && typeof v === 'object')) return true;
    }
    if (lk === 'campaign_id' || lk === 'ad_id' || lk === 'ad_account_id' || lk === 'ad_group_id' || lk === 'ad_creative_id' || lk === 'advertiser_id') {
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
  if (item.is_shopping_ad === true) return true;
  if (item.is_idea_ad === true) return true;
  if (item.is_paid_partnership === true) return true;
  if (item.advertiser || item.promotion || item.promoted_by || item.sponsored_by) return true;
  if (item.shopping_ad || item.ad_metadata || item.promoted_pin_data || item.advertiser_id || item.paid_partnership) return true;
  if (item.promotion_id || item.ad_id || item.ad_account_id || item.campaign_id) return true;
  if (typeof item.type === 'string' && /^(ad|ads|promoted|sponsored|shopping_ad|product_ad|ad_pin|idea_ad)$/i.test(item.type)) return true;
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
    if (s.indexOf('"is_shopping_ad":true') !== -1) return true;
    if (s.indexOf('"is_idea_ad":true') !== -1) return true;
  } catch (e) {}
  return false;
}

function clean(node) {
  if (Array.isArray(node)) {
    var before = node.length;
    var filtered = node.filter(function (e) { return !isAdItem(e); });
    removedCount += before - filtered.length;
    for (var i = 0; i < filtered.length; i++) {
      filtered[i] = clean(filtered[i]);
    }
    return filtered;
  }
  if (node && typeof node === 'object') {
    for (var k in node) {
      if (!Object.prototype.hasOwnProperty.call(node, k)) continue;
      // Delete explicit ad containers directly
      if (k === 'ads' || k === 'promoted_pins' || k === 'sponsored_pins' || k === 'ad_slots' || k === 'promoted' || k === 'sponsored' || k === 'shopping_ads' || k === 'ad_items' || k === 'promoted_items' || k === 'idea_ads' || k === 'ad_pins') {
        delete node[k];
        removedCount++;
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
    try {
      var url = ($request && $request.url) ? $request.url : '';
      console.log('[Pinterest AdBlock] ' + url + ' removed=' + removedCount);
    } catch (e2) {}
    $done({ body: JSON.stringify(obj) });
  } else {
    $done({});
  }
} catch (e) {
  // On parse failure or structure change, pass through unchanged to avoid a Pinterest blank screen / load failure
  $done({});
}

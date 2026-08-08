# Brave Browser Fingerprint, WebRTC, and Location Privacy Guide

This guide explains how to strengthen fingerprinting resistance, reduce WebRTC IP leak risks, and block websites from accessing location information in Brave Browser.

---

## Step 1: Enable Experimental Protections Through Flags

1. Enter the following address in the Brave address bar:

   ```text
   brave://flags
   ```

2. Search for:

   ```text
   Fingerprinting
   ```

3. Change relevant experimental options from **Default** to **Enabled**.

   Possible options may include:

   - `Enable Fingerprinting Protection`
   - `Farbling enhancements`

> **Note:** Experimental flags may be renamed, changed, or removed in future Brave releases. If these options are unavailable, rely on Brave's built-in Shields settings.

---

## Step 2: Configure Shields, WebRTC, and Location Permissions

### Enable Strict Fingerprinting Protection

1. Open:

   ```text
   brave://settings/shields
   ```

2. Locate:

   ```text
   Fingerprinting protection
   ```

3. Set it to:

   ```text
   Strict
   ```

#### Protection Effect

Brave can use its **Farbling** protections to cause some browser characteristics to vary across sessions.

Potentially affected fingerprinting sources include:

- Canvas
- WebGL
- WebGPU
- Audio fingerprinting APIs

This makes it more difficult for websites to build a stable browser fingerprint for cross-site tracking.

---

### Configure the WebRTC IP Handling Policy

> This setting can help prevent WebRTC from bypassing a proxy or VPN and exposing your real IP address.

1. Open:

   ```text
   brave://settings/privacy
   ```

2. Locate:

   ```text
   WebRTC IP Handling Policy
   ```

3. Select:

   ```text
   Disable non-proxied UDP
   ```

#### Protection Effect

This option attempts to route WebRTC traffic through the proxy or use TCP instead, reducing the risk that WebRTC UDP traffic bypasses proxy routing and leaks your real public IP address.

---

### Block Website Location Permissions

> This setting prevents websites from using the browser's location API to request your precise or approximate location.

1. Open:

   ```text
   brave://settings/content/location
   ```

   If the direct URL does not work, navigate to:

   ```text
   Settings → Privacy and security → Site and Shields Settings → Location
   ```

2. Set the default behavior to:

   ```text
   Don't allow sites to see your location
   ```

3. Review the list of websites that have already been allowed to access your location.
4. For any unnecessary permission, open the site's menu and select:

   ```text
   Block
   ```

   or:

   ```text
   Remove
   ```

#### Protection Effect

- Prevents websites from using browser location services to obtain your precise location.
- Reduces the chance that websites infer your area through Wi-Fi, GPS, operating system location services, or nearby network information.
- Works well alongside a proxy or VPN, preventing websites from comparing IP-based location with browser location permission data.

> **Note:** Disabling location permission does not hide your IP address. Websites may still estimate your country, city, or ISP from your IP address. Use a properly configured proxy or VPN if IP masking is required.

---

## Step 3: Verify Protection Effectiveness

### Verify Fingerprint Randomization

1. Visit a browser fingerprint testing website, such as:

   - [BrowserScan](https://www.browserscan.net/)
   - [Cover Your Tracks](https://coveryourtracks.eff.org/)
   - [BrowserLeaks](https://browserleaks.com/)

2. Record the reported fingerprint values, especially:

   - Canvas fingerprint
   - WebGL fingerprint
   - AudioHash

3. Open a new Incognito window, or fully restart Brave.
4. Visit the same testing website again.
5. Check whether the fingerprint values change across sessions.

---

### Verify WebRTC IP Leaks

1. Enable your proxy or VPN.
2. Visit a WebRTC leak testing page:

   - [BrowserLeaks WebRTC Test](https://browserleaks.com/webrtc)

3. Confirm that the page does not reveal:

   - Your real public IP address
   - Your original ISP IP address
   - Local or private network IP addresses
   - Unexpected IPv6 addresses

---

### Verify Location Permissions

1. Visit a website that normally requests location access, such as a map, weather, or shopping website.
2. The website should be unable to obtain browser location, or should report that location access is blocked.
3. Click the site controls icon to the left of the address bar and confirm:

   ```text
   Location: Block
   ```

---

## Recommended Settings Summary

| Setting | Recommended Value | Purpose |
|---|---|---|
| Fingerprinting protection | `Strict` | Strengthens resistance to browser fingerprinting |
| Fingerprinting-related flags | Set to `Enabled` when available | Enables additional experimental fingerprinting protections |
| WebRTC IP Handling Policy | `Disable non-proxied UDP` | Reduces the risk of WebRTC UDP traffic bypassing the proxy |
| Location permission | `Don't allow sites to see your location` | Prevents websites from accessing browser location data |
| Previously allowed location sites | Remove or set to `Block` | Revokes location permissions previously granted to websites |
| Proxy / VPN | Enable before testing | Helps mask IP addresses and test for leaks |

# Brave Browser Fingerprint, WebRTC, QUIC, and DNS Privacy Protection Guide

This guide explains how to strengthen fingerprinting resistance, disable the QUIC protocol and Secure DNS to prevent traffic and DNS leaks, reduce WebRTC IP leak risks, and completely block website location permissions in Brave Browser.

---

## Step 1: Configure Experimental Protections Through Flags

1. Enter the following address in the Brave address bar:

   ```text
   brave://flags
   ```

2. Press Enter.

---

### 1. Enable Experimental Fingerprinting Protection

Search for:

```text
Fingerprinting
```

Change relevant experimental options from **Default** to **Enabled**.

Possible options may include:

- `Enable Fingerprinting Protection`
- `Farbling enhancements`

> **Note:** Experimental flags may be renamed, changed, or removed in future Brave releases. If these options are unavailable, rely on Brave's built-in Shields settings.

---

### 2. Disable the QUIC Transport Protocol

Search for:

```text
QUIC
```

Locate:

```text
Experimental QUIC protocol
```

Change its status from **Default** to **Disabled**, then click **Relaunch** at the bottom right to restart the browser.

#### Protection Effect and Purpose

- **Prevents UDP Traffic from Bypassing Proxy:** QUIC is a UDP-based protocol. Some proxy applications, servers, or routing rules handle UDP traffic less reliably than TCP. If QUIC is enabled, traffic or DNS queries may bypass proxy routing rules and connect directly, leaking your real IP address.
- **Forces TCP Fallback:** Disabling QUIC forces the browser to fall back to traditional TCP connections, ensuring all web requests strictly follow the encrypted tunnel, routing rules, and leak-prevention DNS configured in your proxy client.

---

## Step 2: Configure Shields, Privacy, DNS, and Location Permissions

### 1. Enable Strict Fingerprinting Protection

1. Open:

   ```text
   brave://settings/shields
   ```

2. Locate `Fingerprinting protection` and set it to:

   ```text
   Strict
   ```

#### Protection Effect

Brave uses its **Farbling** mechanism to introduce subtle, randomized variations into browser characteristics across sessions. Affected sources include Canvas, WebGL, WebGPU, and Audio fingerprinting APIs, making it significantly harder for websites to build a persistent browser fingerprint for cross-site tracking.

---

### 2. Configure WebRTC IP Handling Policy

1. Open:

   ```text
   brave://settings/privacy
   ```

2. Locate `WebRTC IP Handling Policy` and select:

   ```text
   Disable non-proxied UDP
   ```

#### Protection Effect

Routes WebRTC traffic through the proxy or forces TCP connections instead, preventing non-proxied WebRTC UDP traffic from bypassing proxy rules and exposing your real public IP address.

---

### 3. Disable Secure DNS (DNS over HTTPS / DoH)

1. Search for `DNS` in the Brave settings search bar, or navigate to:

   ```text
   Settings → Privacy and security → Security
   ```

2. Locate **Use secure DNS**.
3. Toggle the setting completely **Off**.

#### Protection Effect and Purpose

When Chrome/Brave's built-in **DNS over HTTPS (DoH)** is enabled, the browser may perform encrypted DNS queries independently, bypassing local proxy clients or system DNS settings. Disabling this option ensures all DNS resolution requests are handled through your local proxy software or designated DNS server.

---

### 4. Block Website Location Permissions

1. Open:

   ```text
   brave://settings/content/location
   ```

   (Or navigate via: `Settings → Privacy and security → Site and Shields Settings → Location`)

2. Set the default behavior to:

   ```text
   Don't allow sites to see your location
   ```

3. Review the list of allowed location websites below and set unnecessary entries to **Block** or **Remove**.

#### Protection Effect

Prevents websites from obtaining precise geographic location via the browser's location API, avoiding cross-referencing between IP location and browser location permissions.

---

## Step 3: Verify Protection Effectiveness

After applying the settings and enabling your proxy or VPN, perform the following verification tests:

### 1. Verify Fingerprint Randomization
Visit [BrowserScan](https://www.browserscan.net/) or [Cover Your Tracks](https://coveryourtracks.eff.org/) to record Canvas/WebGL fingerprint values. Open a new Incognito window or restart Brave, then test again to confirm the values change across sessions.

### 2. Verify WebRTC IP Leak Protection
Visit [BrowserLeaks WebRTC Test](https://browserleaks.com/webrtc) to confirm that your real public IP address, original ISP IP address, and local/private network IP addresses are not displayed.

### 3. Verify QUIC Protocol Status
Press `F12` to open Developer Tools and switch to the **Network** tab. Visit an HTTP/3-enabled site like `cloudflare.com` or `google.com`. Check the **Protocol** column to ensure it shows only `h2` or `http/1.1`, and that `h3` no longer appears.

### 4. Verify DNS Leak Protection
Visit [DNS Leak Test](https://dnsleaktest.com/) and run an **Extended Test**. Confirm that local ISP DNS servers or unexpected direct domestic DNS nodes do not appear in the results.

### 5. Verify Location Permissions
Visit a map or weather website to confirm it cannot request or obtain browser location access, and that `Location: Block` is displayed in the site settings.

---

## Recommended Settings Summary

| Setting | Recommended Value | Purpose |
|---|---|---|
| Fingerprinting protection | `Strict` | Strengthens resistance to browser fingerprinting via Farbling randomization |
| Fingerprinting-related flags | `Enabled` (when available) | Enables additional experimental fingerprinting protections |
| Experimental QUIC protocol | `Disabled` | Disables QUIC/UDP traffic to prevent proxy rule bypass |
| WebRTC IP Handling Policy | `Disable non-proxied UDP` | Reduces the risk of WebRTC UDP traffic bypassing the proxy |
| Use secure DNS (Secure DNS / DoH) | `Off` | Prevents the browser from bypassing system/proxy DNS handling |
| Location permission | `Don't allow sites to see your location` | Prevents websites from accessing browser location data |
| Previously allowed location sites | Remove or set to `Block` | Revokes location permissions previously granted to websites |
| Proxy / VPN | Enable before testing | Helps mask IP addresses and allows comprehensive leak testing |

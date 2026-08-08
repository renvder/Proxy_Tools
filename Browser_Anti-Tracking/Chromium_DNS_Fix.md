# Chromium Browser DNS Leak Prevention Guide

This guide applies to Chrome and other Chromium-based browsers. It explains browser-level settings that can help reduce the risk of DNS leaks.

---

## 1. Browser Settings

### Step 1: Disable Secure DNS

#### Why Disable It?

When Chrome's **DNS over HTTPS (DoH)** feature is enabled, the browser may perform encrypted DNS queries independently of your operating system or proxy client.

This can bypass local proxy-based DNS handling. If DNS requests use a direct connection, DNS leaks may occur. Disabling this option allows DNS resolution to be handled through your local proxy software or system DNS configuration.

#### Steps

1. Open Chrome.
2. Click the menu in the upper-right corner and open **Settings**.
3. Search for:

   ```text
   DNS
   ```

   Or navigate to:

   ```text
   Privacy and security → Security
   ```

4. Locate:

   ```text
   Use secure DNS
   ```

5. Turn the setting completely off:

   ```text
   Off
   ```

---

### Step 2: Disable the QUIC Transport Protocol

#### Why Disable It?

QUIC is a UDP-based transport protocol developed by Google.

Some proxy applications, servers, or routing rules may handle UDP traffic less reliably than TCP traffic. When QUIC is enabled, certain traffic or DNS requests may bypass proxy routing rules and connect directly through the local network.

Disabling QUIC forces the browser to fall back to traditional TCP-based connections, which are generally easier for proxy software to handle.

#### Steps

1. Enter the following address in the Chrome address bar:

   ```text
   chrome://flags
   ```

2. Press Enter.
3. Search for:

   ```text
   QUIC
   ```

4. Locate:

   ```text
   Experimental QUIC protocol
   ```

5. Change its status from:

   ```text
   Default
   ```

   to:

   ```text
   Disabled
   ```

6. Click:

   ```text
   Relaunch
   ```

7. Restart the browser to apply the setting.

> **Note:** Chrome Flags are experimental. Their names, availability, and behavior may change or be removed in future Chrome or Chromium versions.

---

## 2. Verification and Cross-Testing

After applying the settings, make sure your proxy or VPN is enabled. Then use multiple DNS leak testing websites for cross-verification.

Suggested testing websites:

- [BrowserLinks](https://browserlinks.com/)
- [IPLink](https://iplink.net/)
- [DNS Leak Test](https://dnsleaktest.com/)

When reviewing the results, confirm that they do not show:

- DNS servers provided by your local ISP
- Unexpected domestic DNS servers
- DNS requests that are not routed through your proxy or VPN

---

## Recommended Settings Summary

| Setting | Recommended Value | Purpose |
|---|---|---|
| Use secure DNS (Secure DNS / DoH) | `Off` | Prevents the browser from bypassing system or proxy DNS handling |
| Experimental QUIC Protocol | `Disabled` | Reduces the risk of UDP / QUIC traffic bypassing proxy rules |
| Proxy / VPN | Enable before testing | Ensures traffic and DNS queries follow the intended route |

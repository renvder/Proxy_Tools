# LibreWolf WebRTC, QUIC, and Location Privacy Protection Settings

This guide explains how to use `about:config` to control WebRTC and QUIC behavior in LibreWolf, reduce the risk of public and local IP address leaks, and completely block website location permissions.

---

## 1. Fine-Tune WebRTC and QUIC Through `about:config`

1. Enter the following address in the LibreWolf address bar:

   ```text
   about:config
   ```

2. Press Enter.
3. Click:

   ```text
   Accept the Risk and Continue
   ```

---

### 1. Force WebRTC Traffic Through a Proxy

Search for:

```text
media.peerconnection.ice.proxy_only
```

Set the value to:

```text
true
```

#### Protection Effect

- Forces all WebRTC traffic to use a proxy connection.
- When a proxy is configured, WebRTC will not attempt direct connections.
- Helps prevent WebRTC from bypassing the proxy and exposing your real IP address.

> This setting is recommended for privacy-focused users who have correctly configured a proxy.

---

### 2. Restrict WebRTC to the Default Route Address

Search for:

```text
media.peerconnection.ice.default_address_only
```

Set the value to:

```text
true
```

#### Protection Effect

- Restricts WebRTC to using only the IP address of the default network route.
- Reduces the risk of exposing additional local IP addresses on systems with multiple network adapters, VPN adapters, virtual adapters, or local networks.

---

### 3. Disable WebRTC Host Candidates

Search for:

```text
media.peerconnection.ice.no_host
```

Set the value to:

```text
true
```

#### Protection Effect

- Prevents WebRTC from collecting any **Host Candidates**.
- Further reduces the chance of exposing local/private IP addresses and local network information.
- Can improve anonymity and reduce fingerprinting information.

---

### 4. Disable QUIC (HTTP/3) Protocol

Search for:

```text
network.http.http3.enable
```

Set the value to:

```text
false
```

#### Protection Effect and Purpose

- **Prevents UDP Traffic from Bypassing Proxy:** QUIC runs over UDP. Many proxy tools or nodes default to routing only TCP traffic. If QUIC is enabled, traffic may attempt direct connections to target servers via UDP, bypassing proxy tunnels and exposing your real IP address.
- **Ensures DNS and Routing Rules Apply:** Forcing the browser to use TCP ensures all web traffic strictly follows the encrypted tunnel, routing rules, and leak-prevention DNS settings configured in your proxy client.
- **Reduces Network Fingerprint Association:** Prevents QUIC's Connection ID mechanism from being used by network observers to track your device across different IP addresses during network switches.

> If you regularly use a proxy or VPN, disabling QUIC (setting the value to `false`) is strongly recommended.

---

## 2. Completely Block Website Location Permissions

> This setting blocks new websites from requesting your browser location and allows you to revoke location permissions granted previously.

1. Open LibreWolf:

   ```text
   Settings
   ```

2. In the left sidebar, select:

   ```text
   Permissions & Data
   ```

3. Locate:

   ```text
   Location Permissions
   ```

4. Click:

   ```text
   Settings...
   ```

5. In the **Settings — Location Permissions** window:

   - Review the list of websites with existing location permissions.
   - Change unnecessary websites to:

     ```text
     Block
     ```

     or remove their existing permission entries.

   - Enable:

     ```text
     Block new requests asking to access your location
     ```

6. Click:

   ```text
   Save Changes
   ```

### Protection Effect

- Prevents new websites from requesting location permission.
- Revokes or blocks location access for websites that were previously allowed.
- Reduces the risk of websites inferring your location through browser location services, Wi-Fi, GPS, or operating system location data.

> **Note:** Blocking location permission does not hide your IP address. Websites may still estimate your country, city, or ISP from your IP address. Use a properly configured proxy or VPN if IP masking is required.

---

## 3. Verify Protection Effectiveness

### Verify WebRTC Leak Protection

1. Enable your proxy or VPN.
2. Visit:

   [BrowserLeaks WebRTC Test](https://browserleaks.com/webrtc)

3. Confirm that the page does not reveal:

   - Your real public IP address
   - Your original ISP IP address
   - Local or private network IP addresses
   - Unexpected IPv6 addresses

---

### Verify QUIC Disabling

1. Press `F12` to open Developer Tools and switch to the **Network** tab.
2. Visit any website supporting HTTP/3 (e.g., `cloudflare.com` or `google.com`).
3. Check the **Protocol** column:
   - Confirm it shows only `h2` (HTTP/2) or `http/1.1`.
   - Confirm `h3` no longer appears, indicating QUIC is successfully disabled.

---

### Verify Location Permissions

1. Visit a website that normally requests location access, such as a map, weather, or shopping website.
2. The website should not be able to request or obtain your browser location.
3. If needed, click the permissions icon to the left of the address bar and confirm:

   ```text
   Location: Block
   ```

---

## Recommended Settings Summary

| Preference / Setting | Recommended Value | Purpose |
|---|---|---|
| `media.peerconnection.ice.proxy_only` | `true` | Forces WebRTC traffic through a proxy |
| `media.peerconnection.ice.default_address_only` | `true` | Restricts WebRTC to the default route IP |
| `media.peerconnection.ice.no_host` | `true` | Prevents WebRTC Host Candidate collection |
| `network.http.http3.enable` | `false` | Disables QUIC (HTTP/3) to prevent proxy bypass |
| Previously allowed location websites | Remove or set to `Block` | Revokes location access previously granted to websites |
| Block new requests asking to access your location | Enabled | Prevents new websites from requesting location access |
| Proxy / VPN | Enable before testing | Helps mask IP addresses and test for leaks |

# Shadowrocket Privacy and Network Compatibility Guide

This guide explains how to enable STUN protection, improve compatibility for certain apps, and use TUN mode to handle device traffic in Shadowrocket.

---

## 1. Enable STUN Protection 

> This setting helps reduce the risk of WebRTC using STUN servers to discover your real public IP address.

1. Open Shadowrocket.
2. Navigate to:

   ```text
   Settings → UDP
   ```

3. Enable:

   ```text
   Disable STUN
   ```

### Protection Effect

- Prevents WebRTC from using STUN servers to discover the device's public IP address.
- Reduces the risk of browsers or apps exposing your real IP address through WebRTC.
- Works best when combined with browser-level WebRTC protection settings.

> **Note:** Disabling STUN can affect some UDP, P2P, voice-call, video-call, or real-time communication features. If calling, connectivity, or media features stop working, temporarily disable this option for testing.

---

## 2. Enable Compatibility Mode

> Compatibility Mode is a separate network compatibility option. It is intended to improve connectivity for certain apps in proxy or VPN environments; it is not the same as TUN mode.

1. Open Shadowrocket.
2. Navigate to:

   ```text
   Settings → Proxy
   ```

3. Enable:

   ```text
   Compatibility Mode
   ```

### When to Use It

Try enabling Compatibility Mode if certain apps show issues after Shadowrocket is enabled, such as:

- Connection failures
- Content loading failures
- Login failures
- Network detection errors
- Features that do not work correctly

> **Note:** If all of your apps work normally, Compatibility Mode may not be necessary. Enable and test it only when you encounter compatibility problems.

---

## 3. Enable TUN Mode

> In Shadowrocket, selecting `None` as the Proxy Type means traffic is handled through the TUN interface. Conceptually, this is similar to TUN mode in Clash, v2rayN, and other proxy clients.

1. Open Shadowrocket.
2. Navigate to:

   ```text
   Settings → Proxy
   ```

3. Locate:

   ```text
   Proxy Type
   ```

4. Select:

   ```text
   None
   ```

### How It Works

When `None` is selected, Shadowrocket uses a TUN interface to handle device network connections instead of relying only on a traditional HTTP system proxy.

This can help to:

- Handle traffic from apps that do not support an HTTP system proxy.
- Improve connectivity for certain apps, games, or services.
- Make TCP traffic and supported UDP traffic easier to process through proxy rules.
- Reduce the chance that some traffic bypasses the traditional system proxy.

> **Important:** TUN mode does not mean that every connection is necessarily sent through a proxy server. Actual routing still depends on your Shadowrocket rules, configuration profile, server capabilities, and DNS/UDP settings.

> **Note:** Some apps can detect the iOS VPN/TUN state. Even with TUN mode enabled, those apps may refuse to run or may restrict certain features.

---

## 4. Verify the Settings

### Check for WebRTC IP Leaks

1. Connect Shadowrocket first.
2. Open a browser and visit:

   [BrowserLeaks WebRTC Test](https://browserleaks.com/webrtc)

3. Confirm that the page does not reveal:

   - Your real public IP address
   - Your original ISP IP address
   - Unexpected IPv6 addresses
   - Local or private network IP addresses

### Test App Compatibility

Open your regularly used apps and test:

- Sign-in and account verification
- Website and video loading
- Messaging and notifications
- Voice and video calls
- Games or real-time services
- Local network device access

If calls or real-time features stop working after enabling **Disable STUN**, temporarily turn it off and test again.

---

## Recommended Settings Summary

| Setting | Recommended Value | Purpose |
|---|---|---|
| `Settings → UDP → Disable STUN` | Enabled | Reduces the risk of WebRTC exposing your real IP through STUN |
| `Settings → Proxy → Compatibility Mode` | Enable when app compatibility issues occur | Improves connectivity for certain apps in proxy/VPN environments |
| `Settings → Proxy → Proxy Type` | `None` | Enables TUN mode to handle network traffic through the TUN interface |
| Shadowrocket rules / configuration profile | Configure as needed | Determines whether traffic is proxied, direct, or blocked |
| Browser WebRTC protection | Enable separately | Adds browser-level protection against IP leaks |

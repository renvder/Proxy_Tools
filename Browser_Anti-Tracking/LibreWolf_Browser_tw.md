# LibreWolf 瀏覽器 WebRTC 與位置隱私防護設定

本指南說明如何透過 `about:config` 控制 LibreWolf 的 WebRTC 行為，降低真實 IP 位址與區域網路 IP 位址洩漏的風險，並徹底封鎖網站位置權限。

---

## 一、透過 `about:config` 進行 WebRTC 精細控制

1. 在 LibreWolf 網址列輸入：

   ```text
   about:config
   ```

2. 按下 Enter。
3. 點擊：

   ```text
   接受風險並繼續
   ```

---

### 1. 強制 WebRTC 僅透過 Proxy 連線

在搜尋欄輸入：

```text
media.peerconnection.ice.proxy_only
```

將值設定為：

```text
true
```

#### 保護效果

- 強制所有 WebRTC 流量透過 Proxy 連線。
- 若已設定 Proxy，WebRTC 不會嘗試建立直接連線。
- 可降低 WebRTC 繞過 Proxy 並洩漏真實 IP 位址的風險。

> 此設定適合重視隱私，且已正確設定 Proxy 的使用者。

---

### 2. 限制使用預設路由 IP 位址

在搜尋欄輸入：

```text
media.peerconnection.ice.default_address_only
```

將值設定為：

```text
true
```

#### 保護效果

- 僅使用預設網路路由的 IP 位址。
- 降低多網卡、多 VPN、虛擬網卡或區域網路環境下，其他內網 IP 位址被 WebRTC 收集的風險。

---

### 3. 禁止收集 Host Candidates

在搜尋欄輸入：

```text
media.peerconnection.ice.no_host
```

將值設定為：

```text
true
```

#### 保護效果

- 禁止 WebRTC 收集任何 **Host Candidates**。
- 可進一步降低區域網路 IP 位址與本機網路資訊洩漏的可能性。
- 有助於提升匿名性與降低瀏覽器指紋資訊。

---

## 二、徹底封鎖網站位置權限

> 此設定可阻止新網站要求取得你的瀏覽器位置，並可撤銷先前已授予的位置權限。

1. 開啟 LibreWolf 的：

   ```text
   設定
   ```

2. 在左側選擇：

   ```text
   權限與資料
   ```

3. 找到：

   ```text
   位置權限
   ```

4. 點擊：

   ```text
   設定…
   ```

5. 在「設定——位置權限」視窗中：

   - 檢查已授權網站清單。
   - 將不需要保留的網站設為：

     ```text
     封鎖
     ```

     或直接移除該網站的既有權限。

   - 勾選：

     ```text
     封鎖新網站取得您所在位置的請求
     ```

6. 點擊：

   ```text
   儲存變更
   ```

### 保護效果

- 防止新的網站再向你要求位置權限。
- 撤銷或封鎖已獲得位置存取權的網站。
- 降低網站透過瀏覽器位置服務、Wi-Fi、GPS 或系統位置資料推測所在地區的風險。

> **注意：** 封鎖位置權限不會隱藏 IP 位址。網站仍可能根據 IP 位址大致推測你的國家、城市或 ISP；如需隱藏 IP，仍須正確設定 Proxy 或 VPN。

---

## 三、驗證防護效果

### 驗證 WebRTC 洩漏

1. 先啟用 Proxy 或 VPN。
2. 前往：

   [BrowserLeaks WebRTC Test](https://browserleaks.com/webrtc)

3. 確認測試頁面沒有顯示：

   - 真實公開 IP 位址
   - ISP 原始 IP 位址
   - 區域網路／私人 IP 位址
   - 未預期的 IPv6 位址

---

### 驗證位置權限

1. 前往會要求位置權限的網站，例如地圖、天氣或購物網站。
2. 網站應無法跳出位置授權請求，或顯示位置存取遭封鎖。
3. 如有需要，可點擊網址列左側的權限圖示，確認：

   ```text
   位置：封鎖
   ```

---

## 建議設定總覽

| 設定項目 | 建議值 | 作用 |
|---|---|---|
| `media.peerconnection.ice.proxy_only` | `true` | 強制 WebRTC 流量透過 Proxy |
| `media.peerconnection.ice.default_address_only` | `true` | 限制 WebRTC 使用預設路由 IP |
| `media.peerconnection.ice.no_host` | `true` | 禁止收集 WebRTC Host Candidates |
| 位置權限清單中的已允許網站 | 移除或設為 `封鎖` | 撤銷先前已授予的位置存取權 |
| 封鎖新網站取得您所在位置的請求 | 勾選 | 防止新網站要求取得位置權限 |
| Proxy／VPN | 測試前啟用 | 協助隱藏 IP 位址並測試洩漏情況 |

# Brave 瀏覽器指紋、WebRTC 與位置隱私保護指南

本指南說明如何在 Brave 瀏覽器中強化防指紋追蹤、降低 WebRTC 真實 IP 洩漏風險，並封鎖網站取得裝置位置資訊。

---

## 步驟 1：透過 Flags 啟用實驗性防護功能

1. 在 Brave 網址列輸入：

   ```text
   brave://flags
   ```

2. 在搜尋欄輸入：

   ```text
   Fingerprinting
   ```

3. 將相關實驗性選項從 **Default** 改為 **Enabled**。

   可能包含以下項目：

   - `Enable Fingerprinting Protection`
   - `Farbling enhancements`

> **注意：** 實驗性 Flags 的名稱、功能或可用性，可能會隨 Brave 版本更新而變更或移除。若搜尋不到相關項目，請以 Brave 的內建 Shields 設定為主。

---

## 步驟 2：設定 Shields、WebRTC 與位置權限

### 啟用嚴格指紋保護

1. 開啟：

   ```text
   brave://settings/shields
   ```

2. 找到：

   ```text
   Fingerprinting protection
   ```

3. 設定為：

   ```text
   Strict
   ```

#### 保護效果

Brave 可透過 **Farbling** 保護機制，使部分瀏覽器特徵資料在不同工作階段之間產生變化。

可能受影響的特徵來源包括：

- Canvas
- WebGL
- WebGPU
- 音訊指紋 API

這能增加跨網站追蹤時建立穩定瀏覽器指紋的難度。

---

### 設定 WebRTC IP 處理政策

> 此設定有助於避免 WebRTC 繞過 Proxy 或 VPN，進而暴露真實 IP 位址。

1. 開啟：

   ```text
   brave://settings/privacy
   ```

2. 找到：

   ```text
   WebRTC IP Handling Policy
   ```

3. 選擇：

   ```text
   Disable non-proxied UDP
   ```

#### 保護效果

此選項會讓 WebRTC 流量盡可能透過 Proxy，或改用 TCP 連線，以降低 WebRTC 的 UDP 流量繞過 Proxy 並洩漏真實公開 IP 位址的風險。

---

### 徹底封鎖網站位置權限

> 此設定可防止網站透過瀏覽器的位置 API 取得你的精確或近似所在地區。

1. 開啟：

   ```text
   brave://settings/content/location
   ```

   若此網址無法直接開啟，可依序前往：

   ```text
   設定 → 隱私權與安全性 → 網站與 Shields 設定 → 位置
   ```

2. 將預設行為設定為：

   ```text
   不允許網站查看你的位置
   ```

   或英文介面中的：

   ```text
   Don't allow sites to see your location
   ```

3. 檢查下方已允許的位置網站清單。
4. 若有不需要的位置權限，點擊該網站旁的選單並選擇：

   ```text
   封鎖
   ```

   或：

   ```text
   移除
   ```

#### 保護效果

- 防止網站透過瀏覽器位置服務取得精確位置。
- 降低網站根據 Wi-Fi、GPS、系統位置服務或附近網路資訊推測所在地區的可能性。
- 適合搭配 Proxy 或 VPN 使用，避免網站同時透過 IP 位址與位置權限交叉確認地理位置。

> **注意：** 關閉位置權限不會隱藏 IP 位址。網站仍可能根據 IP 位址大致推測你的國家、城市或網路供應商；如需隱藏 IP，仍須正確設定 Proxy 或 VPN。

---

## 步驟 3：驗證保護效果

### 驗證指紋隨機化

1. 前往瀏覽器指紋偵測網站，例如：

   - [BrowserScan](https://www.browserscan.net/)
   - [Cover Your Tracks](https://coveryourtracks.eff.org/)
   - [BrowserLeaks](https://browserleaks.com/)

2. 記錄網站顯示的指紋資訊，尤其是：

   - Canvas 指紋
   - WebGL 指紋
   - AudioHash

3. 開啟新的無痕視窗，或完全重新啟動 Brave。
4. 再次造訪相同的測試網站。
5. 檢查上述指紋數值是否在不同工作階段之間發生變化。

---

### 驗證 WebRTC IP 洩漏

1. 先啟用你的 Proxy 或 VPN。
2. 前往 WebRTC 洩漏測試頁面：

   - [BrowserLeaks WebRTC Test](https://browserleaks.com/webrtc)

3. 確認頁面沒有顯示：

   - 真實公開 IP 位址
   - ISP 原始 IP 位址
   - 區域網路／私人 IP 位址
   - 不預期的 IPv6 位址

---

### 驗證位置權限

1. 開啟任何曾要求位置權限的網站，例如地圖、天氣或購物網站。
2. 網站應無法取得瀏覽器位置，或顯示位置權限遭封鎖。
3. 點擊網址列左側的網站控制圖示，確認：

   ```text
   位置：封鎖
   ```

---

## 建議設定總覽

| 設定項目 | 建議值 | 作用 |
|---|---|---|
| Fingerprinting protection | `Strict` | 提升對瀏覽器指紋追蹤的防護 |
| 與 Fingerprinting 相關的 Flags | 可用時設為 `Enabled` | 啟用額外的實驗性指紋防護 |
| WebRTC IP Handling Policy | `Disable non-proxied UDP` | 降低 WebRTC UDP 流量繞過 Proxy 的風險 |
| 位置權限（Location） | `Don't allow sites to see your location` | 防止網站取得瀏覽器位置資訊 |
| 已授權位置的網站 | 移除或設為 `Block` | 撤銷先前已授予的位置權限 |
| Proxy／VPN | 測試前先啟用 | 協助隱藏 IP 位址並測試洩漏情況 |

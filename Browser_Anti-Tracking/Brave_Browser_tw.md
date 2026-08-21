# Brave 瀏覽器指紋、WebRTC、QUIC 與 DNS 隱私防護整合指南

本指南說明如何在 Brave 瀏覽器中強化防指紋追蹤、停用 QUIC 協定与安全 DNS 以防止流量及 DNS 洩漏、降低 WebRTC 真實 IP 洩漏風險，並徹底封鎖網站取得位置權限。

---

## 步驟 1：透過 Flags 調整實驗性防護功能

在 Brave 網址列輸入：

```text
brave://flags
```

並按下 Enter。

---

### 1. 啟用實驗性防指紋功能

在搜尋欄輸入：

```text
Fingerprinting
```

將相關實驗性選項從 **Default** 改為 **Enabled**，可能包含：

- `Enable Fingerprinting Protection`
- `Farbling enhancements`

> **注意：** 實驗性 Flags 的名稱或可用性可能會隨 Brave 版本更新而變更。若搜尋不到相關項目，請以 Brave 內建的 Shields 設定為主。

---

### 2. 停用 QUIC 傳輸協定

在搜尋欄輸入：

```text
QUIC
```

找到：

```text
Experimental QUIC protocol
```

將狀態從 **Default** 改為 **Disabled**，隨後點擊右下角的 **Relaunch** 重新啟動瀏覽器。

#### 設定原理與保護效果

- **防止 UDP 流量繞過 Proxy：** QUIC 是 Google 基于 UDP 設計的傳輸協定。部分代理軟體、節點或分流規則對 UDP 流量的接管不如 TCP 完整。若 QUIC 啟用，部分流量或 DNS 查詢可能繞過 Proxy 管道直連，洩漏真實 IP。
- **強制回退 TCP：** 停用 QUIC 後，瀏覽器會強制使用 TCP 連線，確保所有網路請求完全遵循代理軟體所設定的加密隧道、分流規則與防洩漏 DNS。

---

## 步驟 2：設定 Shields、隱私權、DNS 與位置權限

### 1. 啟用嚴格指紋保護

1. 開啟：

   ```text
   brave://settings/shields
   ```

2. 找到 `封鎖指紋識別功能` 並設定為：

   ```text
   嚴格，可能會​​破壞網站
   ```

#### 保護效果

Brave 可透過 **Farbling** 保護機制，使 Canvas、WebGL、WebGPU 及音訊指紋在不同工作階段（Session）之間產生隨機化變化，增加跨網站追蹤的難度。

---

### 2. 設定 WebRTC IP 處理政策

1. 開啟：

   ```text
   brave://settings/privacy
   ```

2. 找到 `WebRTC IP 處理政策` 並選擇：

   ```text
   禁用非代理 UDP
   ```

#### 保護效果

強制 WebRTC 流量盡可能透過 Proxy 或改用 TCP 連線，避免 WebRTC 的未代理 UDP 流量繞過 Proxy 暴露真實公開 IP 位址。

---

### 3. 關閉「使用安全 DNS」（Secure DNS / DoH）

1. 在 Brave 上方搜尋欄輸入 `DNS`，或依序進入：

   ```text
   設定 → 隱私權與安全性 → 安全性
   ```

2. 找到 **使用安全 DNS**（Use secure DNS）。
3. 將開關完全關閉（**Off**）。

#### 設定原理與保護效果

Brave 内建的 DNS over HTTPS（DoH）若啟用，瀏覽器可能會自行發起加密 DNS 解析，繞過代理用戶端或系統的統一接管。關閉此功能可確保所有 DNS 解析請求完全交由本機代理軟體或指定 DNS 處理。

---

### 4. 徹底封鎖網站位置權限

1. 開啟：

   ```text
   brave://settings/content/location
   ```

2. 將預設行為設定為：

   ```text
   不允許網站查看你的位置
   ```

   （英文介面：`Don't allow sites to see your location`）

3. 檢查下方已允許的位置網站清單，將不需要的網站改為 **封鎖** 或 **移除**。

#### 保護效果

防止網站透過瀏覽器位置 API 取得地理位置，避免網站透過 IP 位址與位置權限進行交叉定位。

---

## 步驟 3：驗證防護效果

完成上述設定並啟用 Proxy / VPN 後，請進行以下交叉驗證：

### 1. 驗證指紋隨機化
造訪 [BrowserScan](https://www.browserscan.net/) 或 [Cover Your Tracks](https://coveryourtracks.eff.org/)，記錄 Canvas/WebGL 指紋。開啟新無痕視窗或重啟 Brave 後再次測試，確認指紋數值已發生變化。

### 2. 驗證 WebRTC IP 洩漏
造訪 [BrowserLeaks WebRTC Test](https://browserleaks.com/webrtc)，確認未顯示真實公開 IP、ISP 原始 IP 及區域網路內網 IP。

### 3. 驗證 QUIC 停用狀態
按下 `F12` 開啟開發者工具，切換至 **Network** 分頁，造訪 `cloudflare.com` 或 `google.com`。檢查 **Protocol** 欄位僅顯示 `h2` 或 `http/1.1`，不再出現 `h3`。

### 4. 驗證 DNS 洩漏
造訪 [DNS Leak Test](https://dnsleaktest.com/)，執行 Extended Test，確認測試結果中未出現本地 ISP 提供的 DNS 伺服器或未預期的直連 DNS 節點。

### 5. 驗證位置權限
造訪地圖或天氣網站，確認網站無法存取位置資訊，且網址列左側顯示 `位置：封鎖`。

---

## 建議設定總覽

| 設定項目 | 建議值 | 作用 / 目的 |
|---|---|---|
| Fingerprinting protection | `Strict` | 提升對瀏覽器指紋追蹤的防護（啟用 Farbling 隨機化） |
| 與 Fingerprinting 相關的 Flags | 可用時設為 `Enabled` | 啟用額外的實驗性指紋防護 |
| Experimental QUIC protocol | `Disabled` | 停用 QUIC/UDP，避免流量繞過 Proxy 規則 |
| WebRTC IP Handling Policy | `Disable non-proxied UDP` | 降低 WebRTC UDP 流量繞過 Proxy 的風險 |
| 使用安全 DNS（Secure DNS / DoH） | `Off` | 避免瀏覽器自行發起 DoH 查詢繞過 Proxy 接管 |
| 位置權限（Location） | `Don't allow sites to see your location` | 防止網站取得瀏覽器位置資訊 |
| 已授權位置的網站 | 移除或設為 `Block` | 撤銷先前已授予的位置權限 |
| Proxy／VPN | 測試前先啟用 | 協助隱藏 IP 位址並進行全方位洩漏測試 |

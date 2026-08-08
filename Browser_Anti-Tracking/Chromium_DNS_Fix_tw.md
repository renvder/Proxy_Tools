# Chromium 瀏覽器防 DNS 洩漏設定指南

本指南適用於 Chrome 與其他 Chromium 架構瀏覽器，說明如何降低瀏覽器層級的 DNS 洩漏風險。

---

## 一、瀏覽器設定

### 步驟 1：關閉「使用安全 DNS」

#### 設定原理

Chrome 的 **DNS over HTTPS（DoH）** 功能啟用後，瀏覽器可能自行發起加密 DNS 查詢，繞過系統或 Proxy 用戶端對 DNS 的統一接管。

若 DNS 請求透過直連通道送出，可能導致 DNS 洩漏。關閉此功能後，瀏覽器會將 DNS 解析請求交由本機 Proxy 或系統 DNS 設定處理。

#### 操作步驟

1. 開啟 Chrome 瀏覽器。
2. 點擊右上角選單，進入 **設定**（Settings）。
3. 在上方搜尋欄輸入：

   ```text
   DNS
   ```

   或依序進入：

   ```text
   隱私權與安全性 → 安全性
   ```

4. 找到：

   ```text
   使用安全 DNS
   ```

5. 將開關完全關閉：

   ```text
   Off
   ```

---

### 步驟 2：停用 QUIC 傳輸協定

#### 設定原理

QUIC 是 Google 基於 UDP 設計的傳輸協定。

部分 Proxy 軟體、節點或分流規則對 UDP 流量的處理可能不如 TCP 完整。若 QUIC 啟用，部分流量或 DNS 請求可能繞過 Proxy 節點，改由本機網路直接連線。

停用 QUIC 後，瀏覽器會回退使用較傳統且通常更容易被 Proxy 接管的 TCP 連線。

#### 操作步驟

1. 在 Chrome 網址列輸入：

   ```text
   chrome://flags
   ```

2. 按下 Enter。
3. 在搜尋欄輸入：

   ```text
   QUIC
   ```

4. 找到：

   ```text
   Experimental QUIC protocol
   ```

5. 將狀態從：

   ```text
   Default
   ```

   改為：

   ```text
   Disabled
   ```

6. 點擊右下角的：

   ```text
   Relaunch
   ```

7. 重新啟動瀏覽器，使設定生效。

> **注意：** Chrome Flags 屬於實驗性功能，選項名稱可能隨 Chrome 或 Chromium 瀏覽器版本變更、移除或不再提供。

---

## 二、驗證與交叉測試

完成上述設定後，請先確認 Proxy 或 VPN 已啟用，再使用 DNS 洩漏測試網站進行交叉驗證。

建議測試網站：

- [BrowserLinks](https://browserlinks.com/)
- [IPLink](https://iplink.net/)
- [DNS Leak Test](https://dnsleaktest.com/)

檢查測試結果時，確認沒有出現：

- 本地 ISP 提供的 DNS 伺服器
- 未預期的國內 DNS 節點
- 未經 Proxy 或 VPN 路由的 DNS 查詢結果

---

## 建議設定總覽

| 設定項目 | 建議值 | 目的 |
|---|---|---|
| 使用安全 DNS（Secure DNS / DoH） | `Off` | 避免瀏覽器自行繞過系統或 Proxy 進行 DNS 查詢 |
| Experimental QUIC Protocol | `Disabled` | 避免 UDP / QUIC 流量可能繞過 Proxy 規則 |
| Proxy／VPN | 測試前啟用 | 確保流量與 DNS 查詢由預期路徑處理 |

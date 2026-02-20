<div align="center">
    <a href="https://github.com/HPCstan/CloudFlare-ImgBed"><img width="80%" alt="logo" src="static/readme/banner.png"/></a>
    <h1>CloudFlare ImgBed (HPCstan 定製版)</h1>
    <p><em>🗂️ 開源文件托管解決方案，支援 Telegram Bot、Cloudflare R2、S3 等多種存儲渠道。</em></p>
</div>

---

## 🛠️ 重要維護日誌 (Custom Fixes & Updates)

本倉庫已由 Antigravity AI 進行了深度優化與問題修復，解決了原版在 Cloudflare Pages 部署中的關鍵 Bug。

### 📅 更新日期：2026-02-20
**1. 修復圖片 404 無法顯示問題**
- **現象**：上傳生成的連結缺少 `/file/` 路徑，導致直接訪問域名時出現 404。
- **修復方案**：修正了 `functions/upload/index.js`，確保返回連結始終包含正確的 `/file/` 前綴，並支援 `urlPrefix` 設置。

**2. 實現自動路徑重定向 (Auto-Redirection)**
- **功能**：新增全域中間件 `functions/_middleware.js`。若用戶誤訪問不帶 `/file/` 的舊圖片連結，伺服器將自動執行 301 重定向，確保所有歷史圖片都能正常顯示。

**3. 修復 API 跨域上傳 (CORS) 問題**
- **功能**：在 `/upload` 端點增加了 `OPTIONS` 預檢請求處理。現在允許從外部應用程式（如本地網頁或自動化腳本）使用 **API Token** 直接上傳，不會再觸發「Failed to fetch」錯誤。

**4. 新增本地上傳測試工具 & API 指南**
- **工具**：[test-upload.html](file:///test-upload.html) - 支援拖放上傳、資料夾選取與批量上傳的現代化介面。
- **指南**：[API_UPLOAD_GUIDE.md](file:///API_UPLOAD_GUIDE.md) - 詳細記錄了如何調用 API、使用 Token 的開發者手冊。

---

# 1. Introduction

免費文件托管解決方案，具有**上傳**、**管理**、**讀取**、**刪除**等全鏈路功能，覆蓋文件全生命週期，支援**鑑權**、**目錄**、**圖片審查**、**隨機圖**等各項特性。

## 2. [官方文件 (原版)](https://cfbed.sanyue.de)

提供詳細的部屬文件、功能文件、常見問題解答等（註：定製版已包含上述 Bug 修復，部屬步驟與原版一致）。

## 3. 重要提示

- **前端開源**：參見 [MarSeventh/Sanyue-ImgHub](https://github.com/MarSeventh/Sanyue-ImgHub) 項目。
- **環境變數**：若使用 Telegram 渠道，請務必設置 `TG_BOT_TOKEN` 與 `TG_CHAT_ID`。
- **KV 數據庫**：KV 數據庫在 V2.0 之後為必須配置。

---

# 4. Star History

**如果覺得項目不錯希望您能給個免費的 star ✨✨✨，非常感謝！**

[![Star History Chart](https://api.star-history.com/svg?repos=HPCstan/CloudFlare-ImgBed&type=Date)](https://star-history.com/#HPCstan/CloudFlare-ImgBed&Date)

---
*Based on [MarSeventh/CloudFlare-ImgBed](https://github.com/MarSeventh/CloudFlare-ImgBed). Custom fixes applied by HPCstan.*

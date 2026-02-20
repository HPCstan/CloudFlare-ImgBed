# CloudFlare-ImgBed API 上傳與 CORS 修復指南

本文件記錄了如何解決圖片 404 問題、實現自動重定向以及修復 API 跨域 (CORS) 上傳的技術細節。

## 1. 解決方案概覽

### 核心問題
1. **圖片 404**：前端生成的連結缺少 `/file/` 路徑，導致 Cloudflare Functions 無法攔截。
2. **CORS 錯誤**：從本地 `localhost` 調用 API 時，瀏覽器的 `OPTIONS` 預檢請求被伺服器拒絕。

### 修復項目
- **[index.js](file:///d:/ag/20260104/CloudFlare-ImgBed/functions/upload/index.js)**: 
    - 強制上傳後返回的連結包含 `/file/`。
    - 加入 `OPTIONS` 方法處理，支援 CORS `Authorization` 標頭。
- **[_middleware.js](file:///d:/ag/20260104/CloudFlare-ImgBed/functions/_middleware.js)**: 
    - 實現全域中間件，將不帶前綴的舊圖片請求自動 301 重定向到正確的 `/file/` 路徑。

---

## 2. API 使用方式

### 基本資訊
- **端點 (Endpoint)**: `https://imgbed.ajwkptc.uk/upload`
- **方法 (Method)**: `POST`
- **驗證 (Auth)**: 
    - Header: `Authorization: Bearer YOUR_API_TOKEN`
    - 或 Query: `?authCode=YOUR_AUTH_CODE`

### 測試網頁 (test-upload.html)
我們建立了一個現代化的測試頁面 [test-upload.html](file:///d:/ag/20260104/CloudFlare-ImgBed/test-upload.html)，支援：
- 拖放上傳、資料夾選取。
- 多檔案批量上傳。
- 即時生成 HTML 連結與 Markdown 代碼。

---

## 3. 如何在 AI 協作中使用

如果你希望 AI（如 Antigravity / Opencode）幫你上傳圖片，你可以提供以下指令格式：

> **指令範例：**
> 「請幫我將 `d:\path\to\image.jpg` 上傳到我的圖床。
> 網址是 `https://imgbed.ajwkptc.uk`。
> API Token 是 `[你的 Token]`。」

### 自動化腳本範例 (Python)
```python
import requests

def upload_to_imgbed(file_path, token):
    url = "https://imgbed.ajwkptc.uk/upload"
    headers = {"Authorization": f"Bearer {token}"}
    files = {"file": open(file_path, "rb")}
    
    response = requests.post(url, headers=headers, files=files)
    if response.status_code == 200:
        return f"https://imgbed.ajwkptc.uk{response.json()[0]['src']}"
    return None
```

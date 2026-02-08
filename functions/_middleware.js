export async function onRequest(context) {
    const { request, next } = context;
    const url = new URL(request.url);
    const path = url.pathname;

    // 1. 排除 API, 管理端, 首頁, 以及已經帶有 /file/ 的請求
    const excludes = [
        '/api/',
        '/admin',
        '/assets/',
        '/file/',
        '/logo.png',
        '/favicon.ico'
    ];

    if (path === '/' || excludes.some(prefix => path.startsWith(prefix))) {
        return await next();
    }

    // 2. 檢測是否為典型的圖片 ID 格式 (時間戳_文件名.擴展名)
    // 格式範例: /1770567847405_LINE_NOTE_260116_2.jpg
    const imgIdPattern = /^\/\d+_.*\.(png|jpg|jpeg|gif|webp|mp4|mp3|pdf|zip|rar)$/i;

    if (imgIdPattern.test(path)) {
        // 3. 自動執行 301 重定向到 /file/ 路徑
        const newUrl = new URL(request.url);
        newUrl.pathname = `/file${path}`;

        return Response.redirect(newUrl.toString(), 301);
    }

    return await next();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "FETCH_MOPS") {
        // 🎯 改成動態網址：優先使用前端傳過來的 url，若無則預設舊網址
        const targetUrl = message.url || "https://mops.twse.com.tw/mops/api/t163sb01";
        console.log(`背景腳本收到請求，準備直連 MOPS API 網址: [${targetUrl}]`, message.payload);

        fetch(targetUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 動態產生 Referer，如果傳入明細表網址，就帶明細表的雜湊 Hash
                "Referer": targetUrl.replace("/api/", "/#/web/") 
            },
            body: JSON.stringify(message.payload)
        })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP 錯誤! 狀態碼: ${res.status}`);
            return res.json();
        })
        .then(data => sendResponse({ success: true, data: data }))
        .catch(err => sendResponse({ success: false, error: err.message }));

        return true; // 保持異步通道開啟
    }
});
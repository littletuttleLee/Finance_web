chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "FETCH_MOPS") {
        console.log("背景腳本收到請求，準備直連 MOPS...", message.payload);

        fetch("https://mops.twse.com.tw/mops/api/t163sb01", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Referer": "https://mops.twse.com.tw/mops/#/web/t163sb01"
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
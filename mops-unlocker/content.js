// 監聽來自網頁 window.postMessage 的出價
window.addEventListener("message", (event) => {
    // 確保只接收來自我們自己網頁的請求
    if (event.data && event.data.type === "REQ_FROM_PAGE") {
        
        // 轉發給背景腳本
        chrome.runtime.sendMessage({
            action: "FETCH_MOPS",
            payload: event.data.payload
        }, (response) => {
            // 把背景抓到的結果，再丟回給網頁 window
            window.postMessage({
                type: "RESP_TO_PAGE",
                requestId: event.data.requestId,
                result: response
            }, "*");
        });
    }
});
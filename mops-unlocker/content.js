//  這是修正後的 content.js
window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "REQ_FROM_PAGE") {
        
        // 🎯 關鍵修正：確保 event.data.url 有被一起帶往 background.js
        chrome.runtime.sendMessage({
            action: "FETCH_MOPS",
            payload: event.data.payload,
            url: event.data.url // 👈 補上這行
        }, (response) => {
            window.postMessage({
                type: "RESP_TO_PAGE",
                requestId: event.data.requestId,
                result: response
            }, "*");
        });
    }
});
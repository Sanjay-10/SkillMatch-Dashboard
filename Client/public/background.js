chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((message) => {
      if (message.action === "retrieveData" && message.uniqueId) {
        chrome.storage.local.get([message.uniqueId], (result) => {
          if (result && result[message.uniqueId]) {
            port.postMessage({ success: true, data: result[message.uniqueId] });
          } else {
            port.postMessage({ success: false, message: "Data not found or expired" });
          }
        });
      }
    });
    return true;
  });
  
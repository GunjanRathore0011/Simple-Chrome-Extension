document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab || !tab.id) {
      console.log("No active tab found");
      return;
    }

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: () => document.title
      },
      (results) => {
        if (!results || !results[0] || results[0].result == null) {
          console.log("Could not get data from page.");
          return;
        }

        document.getElementById("activeTabTitle").innerText = results[0].result;
      }
    );
  });
});

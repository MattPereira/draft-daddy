// Load JSON file
fetch(chrome.runtime.getURL("/data.json"))
  .then((response) => response.json())
  .then((json) => {
    // Save it for later use
    chrome.storage.local.set({ data: json }, () => console.log("Data saved"));
  });

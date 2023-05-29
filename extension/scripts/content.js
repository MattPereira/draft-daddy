console.log("Draft Caddy Initiated!");

// fetch data from server
async function getOverlayData() {
  const response = await fetch("https://draft-caddy.up.railway.app/");
  const data = await response.json();
  return data;
}

// Function to manipulate DOM adding overlay
function addOverlay(playerDiv, data) {
  const playerId = playerDiv.getAttribute("data-id");

  console.log("id", data?.data[playerId]);
  const {
    ["Player Name"]: playerName,
    ["Week 16"]: week16,
    ["Week 17"]: week17,
    ["Total Exposure"]: totalExposure,
  } = data?.data[playerId];

  const overlayTarget = playerDiv.children[0].lastChild;
  // If targeted element alread has overlay, exit function
  if (overlayTarget.classList.contains("overlayed")) {
    return;
  }

  const overlayDiv = document.createElement("div");
  overlayDiv.setAttribute("class", "overlay");
  overlayDiv.style.display = "flex";

  const overlayItems = [
    { text: week16, color: "green" },
    { text: week17, color: "red" },
    { text: totalExposure, color: "yellow" },
  ];

  overlayItems.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item.text;
    div.style.color = item.color;
    div.style.paddingLeft = "10px";
    overlayDiv.appendChild(div);
  });

  // Makes overlay div the first child of .styles__rightSide div
  overlayTarget.prepend(overlayDiv);
  // Mark that the parent div has childed added so we dont dupe overlay
  overlayTarget.classList.add("overlayed");

  console.log("Added an overlay!");
}

function startObserver(data) {
  console.log("observer started!");
  console.log("data", data);

  // Create a new observer instance
  const observer = new MutationObserver((mutations) => {
    // Disconnect the observer to avoid detecting changes we are about to make
    observer.disconnect();

    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Make sure the added node is an Element
          if (node.matches(".styles__playerCellWrapper__lTn52")) {
            console.log("if statement fires");
            addOverlay(node, data);
          } else {
            console.log("else statement fires");
            node
              .querySelectorAll(".styles__playerCellWrapper__lTn52")
              .forEach((element) => {
                addOverlay(element, data);
              });
          }
        }
      });
    });

    // Reconnect the observer
    observer.observe(document, { childList: true, subtree: true });
  });

  // Start observing the entire document with configuration specifying to observe all child nodes and subtree nodes
  observer.observe(document, { childList: true, subtree: true });
}

getOverlayData().then((data) => startObserver(data));

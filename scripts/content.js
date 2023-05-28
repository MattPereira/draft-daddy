console.log("I am the draft caddy!");

// Create a new observer instance
const observer = new MutationObserver((mutations) => {
  // Disconnect the observer to avoid detecting changes we are about to make
  observer.disconnect();

  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Make sure the added node is an Element
        if (node.matches(".styles__playerInfo__CyzKu")) {
          addOverlay(node);
        } else {
          node
            .querySelectorAll(".styles__playerInfo__CyzKu")
            .forEach(addOverlay);
        }
      }
    });
  });

  // Reconnect the observer
  observer.observe(document, { childList: true, subtree: true });
});

// Function to add overlay to a player name div
function addOverlay(playerNameDiv) {
  const overlayTarget = playerNameDiv.nextElementSibling;
  // If the next element is already overlayed, skip this function
  if (overlayTarget.classList.contains("overlayed")) {
    return;
  }

  const overlayDiv = document.createElement("div");
  overlayDiv.setAttribute("class", "overlay");
  overlayDiv.textContent = "No Fun League";
  overlayDiv.style.color = "yellow";
  overlayDiv.style.paddingLeft = "1rem";

  // Makes overlay div the first child of .styles__rightSide div
  overlayTarget.prepend(overlayDiv);
  // Mark that the parent div has childed added so we dont dupe overlay
  overlayTarget.classList.add("overlayed");

  console.log("added new overlay!");
}

// Start observing the entire document with configuration specifying to observe all child nodes and subtree nodes
observer.observe(document, { childList: true, subtree: true });

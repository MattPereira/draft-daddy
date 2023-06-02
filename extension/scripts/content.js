console.log("Draft Caddy Initiated!");

// Global variables
let teamsToStack = [];
let overlayData;

// fetch data from server
async function getOverlayData() {
  const response = await fetch("https://draft-caddy.up.railway.app/");
  const resAsJson = await response.json();
  console.log("resAsJson", resAsJson);
  overlayData = resAsJson.data;
}

// Function to manipulate DOM adding overlay
function addOverlay(playerDiv) {
  // Get player id from data-id attribute on underdog draft page
  const playerId = playerDiv.getAttribute("data-id");

  // Targets the div that we are about to append overlay finding the team abreviation
  const playerTeamDiv = playerDiv.getElementsByClassName(
    "styles__playerPosition__ziprS"
  );
  const playerTeam = playerTeamDiv[0].lastChild.innerText;

  // change color of player team from available player to red if team is in teamsToStack
  if (teamsToStack.includes(playerTeam)) {
    playerTeamDiv[0].style.color = "#39FF14";
  }

  // Destructure data from API call to use for overlay
  const {
    ["Week 16"]: week16,
    ["Week 17"]: week17,
    ["Total Exposure"]: totalExposure,
  } = overlayData[playerId];

  // Select the div to play overlay text
  const overlayTarget = playerDiv.children[0].lastChild;
  // If targeted element alread has overlay, exit function
  if (overlayTarget.classList.contains("overlayed")) {
    return;
  }

  // Create and add the overlay divs to the DOM
  const overlayDiv = document.createElement("div");
  overlayDiv.setAttribute("class", "overlay");
  overlayDiv.style.display = "flex";

  const overlayItems = [
    { text: week16, color: "#00FFFF" },
    { text: week17, color: "#FF6EC7" },
    { text: totalExposure, color: "yellow" },
  ];

  overlayItems.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item.text;
    div.style.color = item.color;
    div.style.width = "50px";
    div.style.textAlign = "center";
    overlayDiv.appendChild(div);
  });

  // Makes overlay div the first child of .styles__rightSide div
  overlayTarget.prepend(overlayDiv);
  // Mark that the parent div has childed added so we dont dupe overlay
  overlayTarget.classList.add("overlayed");

  // console.log("Added an overlay!");
}

function startObservers() {
  // Create a new observer instance
  const observer = new MutationObserver((mutations) => {
    // Disconnect the observer to avoid detecting changes we are about to make
    observer.disconnect();

    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        // console.log("node", node);
        // Make sure the added node is an Element
        if (node.nodeType === Node.ELEMENT_NODE) {
          node
            .querySelectorAll(".styles__playerCellWrapper__lTn52")
            .forEach((element) => {
              addOverlay(element);
            });
        }
      });
    });

    const availablePlayersContainer = document.querySelector(
      ".styles__autoSizer__puLtf"
    );

    // Target the divs that contain team abreviations for drafted players
    const teamsDraftedArr = Array.from(
      document.querySelectorAll(".styles__teamLineupRow__SrJ53")
    );

    // Update globally accessible array of teams drafted
    teamsToStack = teamsDraftedArr.map((team) => {
      return team.innerText;
    });

    console.log("teamsToStack", teamsToStack);

    // Reconnect the observer
    observer.observe(availablePlayersContainer, {
      childList: true,
      subtree: true,
    });
  });

  console.log("Starting observers on document...");

  // Start observing the entire document with configuration specifying to observe all child nodes and subtree nodes
  // this observer only starts one time
  observer.observe(document, {
    childList: true,
    subtree: true,
  });
}

getOverlayData().then(() => startObservers());

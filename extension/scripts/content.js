console.log("Draft Caddy Initiated!!!!!");

// Global variables
let teamsToStack = new Set();
let overlayData;

// fetch data from server
async function getOverlayData() {
  try {
    const response = await fetch("https://draft-caddy.up.railway.app/");
    const resAsJson = await response.json();
    console.log("resAsJson", resAsJson);
    overlayData = resAsJson.data;
  } catch (e) {
    console.log("Error fetching overlay data", e);
  }
}

// Function to manipulate DOM adding overlay
function addOverlay(playerDiv) {
  console.log("Adding an overlay...");

  // Get player id from data-id attribute on underdog draft page
  const playerId = playerDiv.getAttribute("data-id");

  // Targets the div that we are about to append overlay finding the team abreviation
  const playerTeamDiv = playerDiv.getElementsByClassName(
    "styles__playerPosition__ziprS"
  );
  const playerTeam = playerTeamDiv[0].lastChild.innerText;

  // change color of player team from available player to red if team is in teamsToStack
  if (teamsToStack.has(playerTeam)) {
    playerTeamDiv[0].style.color = "#39FF14";
    playerTeamDiv[0].previousElementSibling.style.color = "#39FF14";
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
  overlayDiv.style.gap = "5px";

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
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";

    // box week 16 and 17 if team is in teamsToStack
    if (teamsToStack.has(item.text.replace(/@/g, ""))) {
      console.log("bolding", item.text);
      div.style.border = "1px solid white";
    }

    overlayDiv.appendChild(div);
  });

  // Makes overlay div the first child of .styles__rightSide div
  overlayTarget.prepend(overlayDiv);
  // Mark that the parent div has childed added so we dont dupe overlay
  overlayTarget.classList.add("overlayed");
}

function startObserver() {
  // Create a new observer instance
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        // Make sure the added node is an Element
        if (node.nodeType === Node.ELEMENT_NODE) {
          // if statement handles react rendering quirk
          if (node.matches(".styles__playerCellWrapper__lTn52")) {
            addOverlay(node);
          } else {
            // else statement handles all new player divs added after initial render
            node
              .querySelectorAll(".styles__playerCellWrapper__lTn52")
              .forEach((element) => {
                addOverlay(element);
              });
          }
        }
      });
    });

    // Target the divs that contain team abreviations for drafted players
    const teamsDraftedArr = Array.from(
      document.querySelectorAll(".styles__teamLineupRow__SrJ53")
    );

    // Update globally accessible array of teams drafted
    teamsDraftedArr.forEach((team) => {
      teamsToStack.add(team.innerText);
    });
  });

  console.log("Starting observer on document...");

  // Start observing the entire document with configuration specifying to observe all child nodes and subtree nodes
  // this observer only starts one time
  observer.observe(document, {
    childList: true,
    subtree: true,
  });
}

getOverlayData().then(() => startObserver());

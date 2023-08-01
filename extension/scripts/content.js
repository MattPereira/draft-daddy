/*** Underdog changed player-id's at least once so now we match by player name instead ***/

console.log("Draft Caddy Initiated!");

let TEAMS_TO_STACK = new Set();
let OVERLAY_OBJ;

/***** Grab overlay data from local json file using background.js *****/
// function getOverlayObj() {
//   return new Promise((resolve, reject) => {
//     // Request the data from the background script
//     chrome.storage.local.get(["data"], function (result) {
//       OVERLAY_OBJ = JSON.parse(JSON.stringify(result.data)).data;

//       console.log("OVERLAY_OBJ", OVERLAY_OBJ);
//       resolve();
//     });
//   });
// }

/***** Fetch data from external api ****/
async function getOverlayObj() {
  try {
    const response = await fetch("https://draft-daddy.vercel.app/api/overlay");
    const resAsJson = await response.json();
    OVERLAY_OBJ = resAsJson.data;
  } catch (e) {
    console.log("Error fetching overlay data", e);
  }
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

  const playerName = playerTeamDiv[0].previousElementSibling.innerText;

  // change color of player team from available player to green if team is in TEAMS_TO_STACK
  if (TEAMS_TO_STACK.has(playerTeam)) {
    // console.log(playerName, "from team", playerTeam, "is in", TEAMS_TO_STACK);
    playerTeamDiv[0].style.color = "#39FF14";
    playerTeamDiv[0].previousElementSibling.style.color = "#39FF14";
    playerTeamDiv[0].previousElementSibling.style.fontWeight = "bold";
  }

  console.log(
    "OVERLAY_OBJ",
    OVERLAY_OBJ["e982859b-4fd9-410c-aad0-5deb58f40f65"]
  );

  if (!OVERLAY_OBJ[playerId]) {
    console.log(`No overlay data for ${playerName}, playerId: ${playerId}`);
    return;
  }

  // Destructure data from API call to use for overlay
  const {
    ["Week 16"]: week16,
    ["Week 17"]: week17,
    ["Matt Total Exposure"]: mattExposure,
    ["Brad Total Exposure"]: bradExposure,
  } = OVERLAY_OBJ[playerId];

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
    { text: mattExposure, color: "yellow" },
  ];

  overlayItems.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item.text;
    div.style.color = item.color;
    div.style.width = "50px";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";

    // box week 16 and 17 if team is in TEAMS_TO_STACK ignoring @ symbol
    if (TEAMS_TO_STACK.has(item.text.replace(/@/g, ""))) {
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
      TEAMS_TO_STACK.add(team.innerText);
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

getOverlayObj()
  .then(() => startObserver())
  .catch((e) => console.log("oh no an error!", e));

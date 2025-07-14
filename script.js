const startBtn = document.getElementById("start-btn");
const grid = document.getElementById("game-grid");
const symbols = ["🍎", "🍌", "🍇", "🍒", "🍊", "🍉", "🍍", "🥭"];
const allSymbols = [...symbols, ...symbols].sort(() => 0.5 - Math.random());
let firstTile = null; //firstTile: stores the first clicked tile
let secondTile = null; //secondTile: stores the second clicked tile
let lockBoard = false; //lockBoard: prevents player from clicking a 3rd tile while checking
let gameMode = null;
let currentPlayer = 1;
let scores = {1: 0, 2: 0};

const modeStatus = document.getElementById("game-status");


function generateTiles() {
    grid.innerHTML = ""; // Clear previous tiles
    for (let i = 0; i < 16; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");

        const symbol = allSymbols[i];

        tile.dataset.symbol = symbol;

        tile.textContent = "?"; // Placeholder text

        tile.addEventListener("click", () => {
            if (lockBoard || tile.textContent !== "?") return;

            tile.textContent = tile.dataset.symbol;

            if(!firstTile) {
                firstTile = tile;
            } else {
                secondTile = tile;
                lockBoard = true;
                
                if(firstTile.dataset.symbol === secondTile.dataset.symbol) {
                    // Match! leave them open

                    firstTile = null;
                    secondTile = null;
                    lockBoard = false;

                    checkWin();
                } else {
                    // Not a match -- flip back after 1 second
                    setTimeout(() => {
                        firstTile.textContent = "?";
                        secondTile.textContent = "?";
                        firstTile = null;
                        secondTile = null;
                        lockBoard = false;
                    }, 1000);
                }
            }
        });

        grid.appendChild(tile);
            
    }
}

document.getElementById("turn-mode-btn").addEventListener("click", () => {
    gameMode = "turn";
    currentPlayer = 1;
    scores = {1: 0, 2: 0};
    modeStatus.textContent = "🎮 Turn-Based Mode | Player 1's Turn";
})

document.getElementById("speedrun-mode-btn").addEventListener("click", () => {
  gameMode = "speedrun";
  currentPlayer = null;
  scores = { 1: 0, 2: 0 };
  modeStatus.textContent = "⚡ Speedrun Mode | Press 1 or 2 to switch player";
});


startBtn.addEventListener("click", () => {
  if (!gameMode) {
    alert("Please select a game mode first!");
    return;
  }
  generateTiles();
});


function checkWin() {
    const tiles = document.querySelectorAll(".tile");
    const allMatched = Array.from(tiles).every(tile => tile.textContent !== "?");

    if (allMatched) {
        const status  = document.getElementById("game-status");
        status.textContent = "🎉 You Win!";
        status.style.color = "green";
    }
}

const restartBtn = document.getElementById("restart-btn");
restartBtn.addEventListener("click", () => {
  firstTile = null;
  secondTile = null;
  lockBoard = false;
  document.getElementById("game-status").textContent = "Memory Duel";
  generateTiles();
});

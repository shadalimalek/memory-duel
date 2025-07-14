const startBtn = document.getElementById("start-btn");
const grid = document.getElementById("game-grid");
const symbols = ["🍎", "🍌", "🍇", "🍒", "🍊", "🍉", "🍍", "🥭"];
const allSysmbols = [...symbols, ...symbols].sort(() => 0.5 - Math.random());
let firstTile = null; //firstTile: stores the first clicked tile
let secondTile = null; //secondTile: stores the second clicked tile
let lockBoard = false; //lockBoard: prevents player from clicking a 3rd tile while checking

function generateTiles() {
    grid.innerHTML = ""; // Clear previous tiles
    for (let i = 0; i < 16; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");

        const symbol = allSysmbols[i];

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

startBtn.addEventListener("click", () =>  {
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
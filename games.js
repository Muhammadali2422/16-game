const puzzle = document.getElementById("puzzle");
let tiles = [];

function createTiles() {
    let numbers = [...Array(15).keys()].map(n => n + 1).concat(null);
    puzzle.innerHTML = "";
    numbers.forEach(num => {
        const tile = document.createElement("div");
        tile.className = num ? "tile" : "tile empty";
        tile.textContent = num || "";
        tile.addEventListener("click", () => moveTile(tile));
        tiles.push(tile);
        puzzle.appendChild(tile);
    });
}

function shuffleTiles() {
    let numbers = [...Array(15).keys()].map(n => n + 1).concat(null);

    do { 
        numbers.sort(() => Math.random() - 0.5); 
    } while (!isSolvable(numbers));

    tiles.forEach((tile, i) => {
        tile.textContent = numbers[i] || "";
        tile.className = numbers[i] ? "tile" : "tile empty";
    });
}

function moveTile(tile) {
    let emptyTile = document.querySelector(".empty");
    let tileIndex = tiles.indexOf(tile);
    let emptyIndex = tiles.indexOf(emptyTile);
    let validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 4, emptyIndex + 4];
    
    if (validMoves.includes(tileIndex)) {
        let tileRect = tile.getBoundingClientRect();
        let emptyRect = emptyTile.getBoundingClientRect();

        tile.style.transition = "transform 0.3s ease";
        tile.style.transform = `translate(${emptyRect.left - tileRect.left}px, ${emptyRect.top - tileRect.top}px)`;

        setTimeout(() => {
            tile.style.transition = "none";
            tile.style.transform = "";
            [tile.textContent, emptyTile.textContent] = [emptyTile.textContent, tile.textContent];
            [tile.className, emptyTile.className] = [emptyTile.className, tile.className];
            checkWin();
        }, 300);
    }
}

function checkWin() {
    let winState = [...Array(15).keys()].map(n => (n + 1).toString()).concat("");
    if (tiles.map(tile => tile.textContent).join() === winState.join()) {
        setTimeout(() => alert("Tabriklaymiz! Siz yutdingiz!"), 100);
    }
}

function isSolvable(numbers) {
    let inversions = numbers.filter(n => n).map((n, i, arr) => arr.slice(i + 1).filter(m => m && m < n).length).reduce((a, b) => a + b, 0);
    return inversions % 2 === 0;
}

createTiles();
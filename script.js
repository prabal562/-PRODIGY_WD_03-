const board = document.getElementById("board");
const status = document.getElementById("status");

let cells = [];
let currentPlayer = "X";
let gameActive = true;

function createBoard() {
  board.innerHTML = "";
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    cells.push(cell);
    board.appendChild(cell);
  }
  status.textContent = "Player X's turn";
}

function handleClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (!gameActive || cell.textContent !== "") return;

  cell.textContent = currentPlayer;

  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diags
  ];

  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    );
  });
}

function isDraw() {
  return cells.every(cell => cell.textContent !== "");
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  createBoard();
}

createBoard();

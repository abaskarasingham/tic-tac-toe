const GameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => board;
    const reset = () => board = ['', '', '', '', '', '', '', '', ''];

    const setCell = (index, marker) => {
        if (board[index] === '') {
            board[index] = marker;
            return true;
        }

        return false;
    };

    return { getBoard, setCell, reset };
})();

function createPlayer(name, marker) {
    let m_name = name;
    let m_marker = marker;
    let m_score = 0;

    const getName = () => m_name;
    const setName = (name) => m_name = name;

    const getMarker = () => m_marker;
    const setMarker = (marker) => m_marker = marker;

    const getScore = () => m_score;
    const setScore = (score) => m_score = score;
    const giveScore = () => ++m_score;

    return { getName, setName, getMarker, setMarker, getScore, setScore, giveScore };
};

const DisplayController = (() => {
  const cells = Array.from(document.querySelectorAll(".cell"));
  const message = document.querySelector(".message");
  const p1score = document.querySelector(".p1score");
  const p2score = document.querySelector(".p2score");
  const gameForm = document.querySelector("#game-dialog form");
  const resetBtn = document.querySelector(".resetBtn");

  gameForm.addEventListener("submit", function(e) {
    const player1 = document.querySelector("#player1");
    const player2 = document.querySelector("#player2");
    resetBtn.disabled = false;
    GameController.startGame(player1.value, player2.value);
    resetBtn.click();

    player1.value = "";
    player2.value = "";
  });

  resetBtn.disabled = true;
  resetBtn.addEventListener("click", function (e) {
    GameBoard.reset();
    GameController.reset();
    render();
  });

  const render = () => {
    const board = GameBoard.getBoard();
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };

  const displayTurn = (player) => {
    message.textContent = `It's ${player.getName()}'s Turn!`;
  };

  const displayWinner = (player) => {
    message.textContent = `${player.getName()} Wins!`;
  };

  const displayTie = () => {
    message.textContent = "It's a Tie!";
  };

  const displayScore = (player1, player2) => {
    p1score.textContent = `${player1.getName()}: ${player1.getScore()}`;
    p2score.textContent = `${player2.getName()}: ${player2.getScore()}`;
  };

  cells.forEach((cell, index) => {
    cell.addEventListener("click", function(e) {
      GameController.playRound(index);
      render();
    });
  });

  return { displayWinner, displayTurn, displayTie, displayScore };
})();

const GameController = (() => {
  const player1 = createPlayer("Player 1", 'X');
  const player2 = createPlayer("Player 2", 'O');
  let currentPlayer = player1;
  let gameOver = true;

  const startGame = (p1Name, p2Name) => {
    player1.setName(p1Name);
    player1.setScore(0);
    player2.setName(p2Name);
    player2.setScore(0);
    reset();
  };

  const playRound = (index) => {
    if (gameOver) return;

    if (!GameBoard.setCell(index, currentPlayer.getMarker())) return;

    if (checkWin()) {
      console.log(`${currentPlayer.getName()} Wins!`);
      DisplayController.displayWinner(currentPlayer);
      currentPlayer.giveScore();
      gameOver = true;
      DisplayController.displayScore(player1, player2);
      return;
    }

    if (checkTie()) {
      console.log("It's a Tie!");
      DisplayController.displayTie();
      gameOver = true;
      return;
    }

    switchPlayer();
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    DisplayController.displayTurn(currentPlayer);
  };

  const checkWin = () => {
    const board = GameBoard.getBoard();
    const wins = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    return wins.some(combo => combo.every(i => board[i] === currentPlayer.getMarker()));
  };

  const checkTie = () => {
    return GameBoard.getBoard().every(cell => cell !== "");
  };

  const reset = () => {
    currentPlayer = player1;
    gameOver = false;
    DisplayController.displayTurn(currentPlayer);
    DisplayController.displayScore(player1, player2);
  }

  return { startGame, playRound, reset };
})();
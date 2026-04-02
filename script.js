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
    const giveScore = () => ++m_score;

    return { getName, setName, getMarker, setMarker, getScore, giveScore };
};

const GameController = (() => {
    const player1 = createPlayer("Player1", 'X');
    const player2 = createPlayer("Player2", 'O');
    let currentPlayer = player1;
    let gameOver = false;

    const playRound = (index) => {
        if (gameOver) return;

        if (!GameBoard.setCell(index, currentPlayer.getMarker())) return;

        if (checkWin()) {
            console.log(`${currentPlayer.getName()} Wins!`);
            DisplayController.displayWinner(currentPlayer);
            currentPlayer.giveScore();
            gameOver = true;
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
    }

    return { playRound, reset };
})();

const DisplayController = (() => {
  const cells = Array.from(document.querySelectorAll(".cell"));
  const message = document.querySelector(".message");
  const resetBtn = document.querySelector(".resetBtn");
    resetBtn.addEventListener("click", function(e) {
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
  }

  const displayWinner = (player) => {
    message.textContent = `${player.getName()} Wins!`;
  }

  const displayTie = () => {
    message.textContent = "It's a Tie!";
  }

  cells.forEach((cell, index) => {
    cell.addEventListener("click", function(e) {
      GameController.playRound(index);
      render();
    });
  });

  return { render, displayWinner, displayTurn, displayTie };
})();



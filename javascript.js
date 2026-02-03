//Pulls in buttons from UI
const btnReset = document.querySelector("#reset");
const btnEditNames = document.querySelector("#editNames");
const btnCancelNameModal = document.querySelector("#btnCancelNameModal");
const dialogChangeNames = document.querySelector("#dialogEditNames");
const displayCurrentPlayer = document.querySelector("#currentPlayer");
const displayPlayerOneName = document.querySelector("#playerOne");
const displayPlayerTwoName = document.querySelector("#playerTwo");

//Created gameboard as a IIFE function, so only this one exists
const gameboard = (function () {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  //Lets us get the current status of the board
  const getBoard = () => board;
  //Place a token into the 2D array using a value, x position and y position;
  function placeToken(tokenValue, xPos, yPos) {
    board[yPos][xPos] = tokenValue;
  }
  //Console logs the board
  const printBoard = () => console.log(board);

  function resetBoard() {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    displayControl.printScreen();
  }

  //allowing us to access the following functions
  return { getBoard, placeToken, printBoard, resetBoard };
})();

function gameControl(playerOneName, playerTwoName) {
  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  let currentPlayer = players[0];

  const getCurrentPlayer = () => currentPlayer;
  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  function playTurn(xPos, yPos) {
    //check if it is a valid location, or if it is already played on
    if (validLocation(xPos, yPos)) {
      console.log("Valid token location");
      //place a token
      gameboard.placeToken(`${getCurrentPlayer().token}`, xPos, yPos);
    } else {
      console.log("Invalid token location");
      return;
    }
    //check if that place creates a winner
    function checkForWin() {
      let isWinner = false;
      let board = gameboard.getBoard();
      function checkColumn(index) {
        // let board = gameboard.getBoard();
        if (
          board[0][index] == board[1][index] &&
          board[0][index] == board[2][index] &&
          (board[0][index] == players[0].token ||
            board[0][index] == players[1].token)
        ) {
          console.log("Winner in column " + index);
          isWinner = true;
        } else {
          //console.log("No winner");
        }
      }
      function checkRow(index) {
        // let board = gameboard.getBoard();
        if (
          board[index][0] == board[index][1] &&
          board[index][0] == board[index][2] &&
          (board[index][0] == players[0].token ||
            board[index][0] == players[1].token)
        ) {
          console.log("Winner in row " + index);
          isWinner = true;
        } else {
          //console.log("No winner");
        }
      }
      function checkDiagonals() {
        if (
          ((board[0][0] == board[1][1] && board[0][0] == board[2][2]) ||
            (board[0][2] == board[1][1] && board[0][2] == board[2][0])) &&
          (board[1][1] == players[0].token || board[1][1] == players[1].token)
        ) {
          console.log("Winner is diagonal");
          isWinner = true;
        } else {
          // console.log("No winner;");
        }
      }

      for (i = 0; i < 3; i++) {
        checkColumn(i);
        checkRow(i);
      }
      checkDiagonals();
      return isWinner;
    }
    function checkForTie() {
      let isTie = false;
      let board = gameboard.getBoard();
      let flatBoard = board.flat();

      if (flatBoard.includes("")) {
        isTie = false;
      } else {
        isTie = true;
      }
      return isTie;
    }
    //check for win
    if (checkForWin()) {
      console.log(
        `Congrats, ${gameController.getCurrentPlayer().name} has won!`
      );
      // return `Congrats, ${gameController.getCurrentPlayer().name} has won!`;
    } else if (checkForTie()) {
      console.log("It's a tie!");
      // return "It's a tie!";
    }
    //Print console board
    console.log(gameboard.printBoard());
    //switch turns
    switchPlayerTurn();
    //Print UI board
    displayControl.printScreen();
  }

  //If the x position and y position are === to a empty space, it is a valid location, if not returns false
  function validLocation(xPos, yPos) {
    console.log(gameboard.getBoard()[yPos][xPos]);
    if (gameboard.getBoard()[yPos][xPos] === "") {
      return true;
    } else {
      return false;
    }
  }

  return { players, getCurrentPlayer, playTurn, validLocation };
}

//Controls the UI based off of the game control
const displayControl = (function () {
  //listens for input, and returns index of click on grid
  function inputListener() {
    //Pulls current gameboard, flattens it into a 1D array, and select the grid in DOM
    const board = gameboard.getBoard();
    const flatBoard = board.flat();
    const gameGrid = document.querySelector("#gameWrapper");
    let index = null;
    let twoDIndex = [];

    gameGrid.addEventListener("click", (event) => {
      const target = event.target;
      //creates an array of targets parent elements children, then finds the index of the target and stores it in index
      index = [...target.parentElement.children].indexOf(target);
      console.log(index);
      twoDIndex = convertTo2D(index);
      console.log(twoDIndex);
      gameController.playTurn(twoDIndex[0], twoDIndex[1]);
    });

    btnReset.addEventListener("click", (event) => {
      gameboard.resetBoard();
    });
    btnEditNames.addEventListener("click", (event) => {
      dialogChangeNames.showModal();
    });
    btnCancelNameModal.addEventListener("click", (event) => {
      event.preventDefault();
      dialogChangeNames.close();
    });
    return { index };
  }

  function convertTo2D(index) {
    let gridPlacement = [0, 0];
    switch (index) {
      case 0:
        gridPlacement[0] = 0;
        gridPlacement[1] = 0;
        break;
      case 1:
        gridPlacement = [1, 0];
        break;
      case 2:
        gridPlacement = [2, 0];
        break;
      case 3:
        gridPlacement = [0, 1];
        break;
      case 4:
        gridPlacement = [1, 1];
        break;
      case 5:
        gridPlacement = [2, 1];
        break;
      case 6:
        gridPlacement = [0, 2];
        break;
      case 7:
        gridPlacement = [1, 2];
        break;
      case 8:
        gridPlacement = [2, 2];
        break;
    }
    // console.log(gridPlacement[0]);
    // console.log(gridPlacement[1]);

    return gridPlacement;
  }

  function printScreen() {
    //Shows current player name
    currentPlayer.textContent = gameController.getCurrentPlayer().name;
    //Pulls current gameboard, flattens it into a 1D array, and select the grid in DOM
    const board = gameboard.getBoard();
    const flatBoard = board.flat();
    const gameGrid = document.querySelector("#gameWrapper");
    //Clears screen before printing new one
    gameGrid.innerHTML = "";

    //Runs through each board item and displays the token in the correct location on the grid
    flatBoard.forEach((item) => {
      let button = document.createElement("button");
      button.classList.add("placeholderCell");
      button.textContent = item;
      gameGrid.appendChild(button);
    });
  }

  return { printScreen, inputListener };
})();

const gameController = gameControl("Jackson", "Darcy");
//Prints screen
displayControl.printScreen();
displayControl.inputListener();

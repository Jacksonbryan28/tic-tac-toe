//Created gameboard as a IIFE function, so only this one exists
const gameboard = (function () {
  const board = [
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

  //allowing us to access the following functions
  return { getBoard, placeToken, printBoard };
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
          console.log("No winner;");
        }
      }

      for (i = 0; i < 3; i++) {
        checkColumn(i);
        checkRow(i);
      }
      checkDiagonals();
      return isWinner;
    }
    //check for win
    if (checkForWin()) {
      console.log(
        `Congrats, ${gameController.getCurrentPlayer().name} has won!`
      );
    }
    //switch turns
    switchPlayerTurn();
  }

  //I am pretty sure this works, check again though
  function validLocation(xPos, yPos) {
    console.log(gameboard.getBoard()[yPos][xPos]);
    if (gameboard.getBoard()[yPos][xPos] === "") {
      return true;
    } else {
      return false;
    }
  }

  return { players, getCurrentPlayer, playTurn };
}

// const gameControl = (function (playerOneName, playerTwoName) {
//   const players = [
//     {
//       name: playerOneName,
//       token: "X",
//     },
//     {
//       name: playerTwoName,
//       token: "O",
//     },
//   ];
//   return { players };
// })("Jackson", "Darcy");

const gameController = gameControl("Jackson", "Darcy");
// console.log(gameController.players[0].name);
// // console.log(gameControl.players[0].name);
// console.log(gameboard.getBoard());
// gameboard.placeToken("X", 0, 0);
// gameboard.placeToken("0", 2, 1);
// gameboard.placeToken("X", 0, 1);
// console.log(gameController.getCurrentPlayer());
// gameController.switchPlayerTurn();
// console.log(gameController.getCurrentPlayer());
// gameController.switchPlayerTurn();
// console.log(gameController.getCurrentPlayer());

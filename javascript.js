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

  //Testing using gameboard within gameControl function
  // gameboard.placeToken("y", 2, 2);
  // console.log("Board printed inside game control ");
  // gameboard.printBoard();
  // console.log("------");

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

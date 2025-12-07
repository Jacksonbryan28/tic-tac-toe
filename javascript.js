//Created gameboard as a IIFE function, so only this one exists
const Gameboard = (function () {
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

  //allowing us to access the following fuctions
  return { getBoard, placeToken, printBoard };
})();

console.log(Gameboard.getBoard());
Gameboard.placeToken("X", 0, 0);
Gameboard.placeToken("0", 2, 1);
Gameboard.placeToken("X", 0, 1);

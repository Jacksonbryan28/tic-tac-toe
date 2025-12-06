// const count = document.querySelector("#count");
// const countBtn = document.querySelector("#countBtn");
// let clickCount = 0;

// countBtn.addEventListener("click", () => {
//   clickCount = clickCount + 1;
//   count.textContent = clickCount;
// });

//Created gameboard as a IIFE function, so only this one exists
const Gameboard = (function () {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  //Lets us get the currrent status of the board
  const getBoard = () => board;

  function placeToken(tokenValue, xPos, yPos) {
    board[yPos][xPos] = tokenValue;
  }

  //allowing us to access the following fuctions
  return { getBoard, placeToken };
})();

console.log(Gameboard.getBoard());
Gameboard.placeToken("X", 0, 0);
Gameboard.placeToken("0", 1, 1);

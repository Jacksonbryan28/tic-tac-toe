const count = document.querySelector("#count");
const countBtn = document.querySelector("#countBtn");
let clickCount = 0;

countBtn.addEventListener("click", () => {
  clickCount = clickCount + 1;
  count.textContent = clickCount;
});

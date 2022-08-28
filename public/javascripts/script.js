const searchbutton = document.querySelector("#search-button");
const input = document.querySelector(".form-control");

// 防止沒輸入值的情況按下搜尋
searchbutton.addEventListener("click", function (event) {
  const target = event.target;
  const inputValue = input.value.trim();
  if (inputValue.length == 0) {
    event.preventDefault();
  }
});
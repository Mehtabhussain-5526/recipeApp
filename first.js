// Get from Local Storage;
let dataToShow = localStorage.getItem("recipe");
let displayData = JSON.parse(dataToShow);
const inputBox = document.getElementById("search-recipe");
const searchInput = document.getElementById("search-recipe").value;
let lengthofArr;
if(displayData){
  lengthofArr = displayData.length;
}
function elRemover() {
  const pDiv = document.getElementById("recipe-array");
  while (pDiv.firstChild) {
    pDiv.removeChild(pDiv.firstChild);
  }
}
function renderer() {
  elRemover();
  let pDiv = document.getElementById("recipe-array");
  for (i = 0; i < lengthofArr; i++) {
    const incomingData = displayData[i];
    const tToShow = incomingData.title;
    const sToShow = incomingData.status;
    let div = document.createElement("div");
    // a.href = "page2.html";
    pDiv.append(div);
    const dItem = pDiv.lastElementChild;
    dItem.innerHTML = `<p>${tToShow}</p><p>${sToShow}
    </p>`;
  }}
renderer();
// Searching
function searching() {
  elRemover();
  const inputValue = document.getElementById("search-recipe").value;
  const searchedItems = displayData.filter((x) =>
    x.title.toLowerCase().includes(inputValue.toLowerCase())
  );
  searchedItems.map((item, index) => {
    let pDiv = document.getElementById("recipe-array");
    let div = document.createElement("div");
    pDiv.append(div);
    const dItem = pDiv.lastElementChild;
    dItem.innerHTML = `
  <p>${item.title}</p>
  <p>${item.status}</p>`;
  });
}
// URL && Query Selector;
const dTags = document.querySelectorAll("#recipe-array > div");
dTags.forEach((dTags) => {
  dTags.addEventListener("click", (e) => {
    const mainDiv = e.target;
    const clickedRecipe = mainDiv.querySelector("p:first-child").textContent;
    const knownRes = displayData.filter((x) => x.title.includes(clickedRecipe));
    const toSendIndex = displayData.findIndex((x) =>
      x.title.includes(clickedRecipe)
    );
    const knownResTitle = knownRes[0].title;
    parsingVar = knownResTitle;
    let url = new URL("http://127.0.0.1:5500/page2.html");
    let params = new URLSearchParams(window.location.search);
    params.set("current", parsingVar);
    params.set("id", toSendIndex);
    url.search = params.toString();
    location.href = url.href;
  });
});

//Searching Trigger
inputBox.addEventListener("input", (event) => {
  searching();
});

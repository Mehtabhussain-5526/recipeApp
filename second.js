let dataToShow = localStorage.getItem("recipe");
let displayData = JSON.parse(dataToShow);
const params = new URLSearchParams(document.location.search);
const titleValue = document.getElementById("recipe-title");
const stepsValue = document.getElementById("recipe-steps");
let ingridientArray = [];
let latestStatus;

//DOM that will be used to show elements;
function addingel() {
  let rand = new Uint8Array(3);
  crypto.getRandomValues(rand);
  let idgen = rand[1];
  let ingridients = document.getElementById("add-ingridient").value;
  let removerID = Date.now();
  let parentEl = document.querySelector("#ordered-list");
  // DECLARETION OF ELEMENTS TO BE PUSHED IN INGREDIANTS LIST
  let newli = document.createElement("li");
  newli.className = "addedli";
  let check = document.createElement("input");
  check.id = `${idgen}`;
  check.type = "checkbox";
  let span = document.createElement("span");
  span.textContent = ingridients;
  let btnrmv = document.createElement("button");
  btnrmv.className = "remove-li-items";
  btnrmv.id = `${removerID}`;
  btnrmv.type = "button";
  btnrmv.innerHTML = "Remove";
  parentEl.appendChild(newli).append(check, span, btnrmv);
  let rindex = 0;
  rindex++;
  // REMOVE BUTTON LISTENER
  document.getElementById(`${removerID}`).addEventListener("click", (event) => {
    event.target.parentNode.remove();
    ingridientArray.splice(rindex, 1);
  });
  ingridientArray.push({ name: ingridients, check: false });

  // checked value
  const checkBtn = document.getElementById(`${idgen}`);
  checkBtn.addEventListener("change", (e) => {
    let textIs = checkBtn.nextSibling.textContent;
    let checkIndex = ingridientArray.findIndex((x) => x.name === textIs);
    if (e.target.checked) {
      console.log(ingridientArray[checkIndex].check);
      ingridientArray[checkIndex].check = true;
      console.log(ingridientArray[checkIndex].check);
    } else {
      ingridientArray[checkIndex].check = false;
    }
  });
}

// ingrediants Listener
document.getElementById("ing-submit-btn").addEventListener("click", (event) => {
  event.preventDefault();
  addingel();
});

// DELETE BTN
const deleteBtn = document.getElementById("btn-2");
deleteBtn.addEventListener("click", () => {
  const toDelete = displayData.findIndex((x) => x.title === titleValue.value);
  if (toDelete >= 0 && toDelete < displayData.length) {
    displayData.splice(toDelete, 1);
    dataToShow = JSON.stringify(displayData);
    localStorage.setItem("recipe", dataToShow);
  }
  location.href = `index.html`;
});

// set to localStorage
document.getElementById("home-btn").addEventListener("click", (e) => {
  // Status Updater
  let chARR = [];
  for (i = 0; i < ingridientArray.length; i++) {
    local = ingridientArray[i].check;
    chARR.push(local);
  }
  const statusChecker = chARR.filter((x) => x === true);
  if (statusChecker.length === 0) {
    latestStatus = "You have no ingridients";
  } else if (statusChecker.length < chARR.length && statusChecker.length > 0) {
    latestStatus = "You have some ingridients";
  } else if (statusChecker.length === chARR.length) {
    latestStatus = "You have all ingridients";
  }
  // Saving
  let incomingRName = params.get("current");
  if (incomingIND && incomingRName) {
    const data1 = {
      id: Math.random(),
      title: titleValue.value,
      steps: stepsValue.value,
      ingridientsNames: ingridientArray,
      status: latestStatus,
    };
    displayData.splice(incomingIND, 1, data1);
    localStorage.setItem("recipe", JSON.stringify(displayData));
  } else {
    const data = {
      id: Math.random(),
      title: titleValue.value,
      steps: stepsValue.value,
      ingridientsNames: ingridientArray,
      status: latestStatus,
    };
    const initData = [];
    const storedData = JSON.parse(localStorage.getItem("recipe")) || initData;
    storedData.push(data);
    localStorage.setItem("recipe", JSON.stringify(storedData));
  }
});

// Updation declarations
let incomingIND = params.get("id");
if (incomingIND) {
  const upArray = displayData[incomingIND].ingridientsNames;
  for (i = 0; i < upArray.lenght; i++) {
    ingridientArray.push(upArray[i]);
  }
}

// for Editing and updating
const forCompairing = params.get("current");
const editIndex = displayData.findIndex((x) => x.title === forCompairing);
if (editIndex >= 0 && forCompairing) {
  let parentEl = document.querySelector("#ordered-list");
  let editData = displayData[editIndex];
  document.getElementById("recipe-title").value = editData.title;
  document.getElementById("recipe-steps").value = editData.steps;
  ingridientArray = editData.ingridientsNames;
  for (i = 0; i < ingridientArray.length; i++) {
    let checking = ingridientArray[i].check;
    let rand = new Uint8Array(3);
    crypto.getRandomValues(rand);
    let idgen = rand[1];
    let ingsToShow = ingridientArray[i];
    let ingsName = ingsToShow.name;
    let newli = document.createElement("li");
    newli.className = "addedli";
    let check = document.createElement("input");
    check.id = `${i}`;
    check.type = "checkbox";
    check.checked = checking;
    let span = document.createElement("span");
    span.textContent = `${ingsName}`;
    let btnrmv = document.createElement("button");
    btnrmv.id = `${idgen}`;
    btnrmv.innerHTML = "Remove";
    parentEl.append(newli);
    newli.appendChild(check);
    newli.appendChild(span);
    newli.appendChild(btnrmv);
    document.getElementById(`${idgen}`).addEventListener("click", (Event) => {
      let saveHere = Event.target.previousSibling.textContent;
      let index = ingridientArray.findIndex((x) => x.name === saveHere);
      if (index >= 0) {
        ingridientArray.splice(index, 1);
      }
      Event.target.parentNode.remove();
    });
    // checked value
    const checkBtn = document.getElementById(`${i}`);
    checkBtn.addEventListener("change", (e) => {
      let textIs = checkBtn.nextSibling.textContent;
      let checkIndex = ingridientArray.findIndex((x) => x.name === textIs);
      if (e.target.checked) {
        console.log(ingridientArray[checkIndex].check);
        ingridientArray[checkIndex].check = true;
        console.log(ingridientArray[checkIndex].check);
      } else {
        ingridientArray[checkIndex].check = false;
      }
    });
  }
}


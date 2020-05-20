//Un campo que indique si ya fue realizada o no
//y un boton que calcule el total de tiempo de todas las tareas por realizar y lo despliegue en d h m s
const addItemElement = document.getElementById("add-modal");
const addItemBtn = document.getElementById("add-item-button");
const confirmAddBtn = addItemElement.querySelector(".btn--success");
const cancelAddBtn = addItemElement.querySelector(".btn--passive");
const backdropElement = document.getElementById("backdrop");
const inputElements = document.getElementsByTagName("input");
const listItems = [];
const list = document.getElementById("items-list");

const showItemModal = () => {
  addItemElement.classList.add("visible");
};

const closeItemModal = () => {
  addItemElement.classList.remove("visible");
};

const clearItemsModal = () => {
  for (const inputElement of inputElements) {
    inputElement.value = "";
  }
};

const cancelItemHandler = () => {
  closeItemModal();
  clearItemsModal();
};

const renderItem = (title, description, time) => {
  const newItem = document.createElement("li");
  newItem.className = "to-do-item";

  newItem.innerHTML = `
  <div class="to-do-item__info">
    <h2>${title}</h2>
    <p>${description}</p> <br><br>
    <p>${time} hours</p>
  </div>

  <label class="switch">
  <input type="checkbox">
  <span class="slider round"></span>
  </label>
  `;

  const entryText = document.getElementById("entry-text");
  if (listItems.length === 1) {
    entryText.remove();
  }

  list.append(newItem);
  sumHours();
  
};

const isFloat = (n) => {
  return Number(n) === n && n % 1 !== 0;
}

const sumHours = () => {
  let sum = 0;
  for (const listItem of listItems){
    sum += parseFloat(listItem.time);
  }

  let mins = 0; //23,5
  let rawNum = sum/24; //0,98
  const days = Math.floor(rawNum); //0
  let remainer = rawNum % 1;  //0,98
  rawNum = remainer * 24; // 23,5
  const hours = Math.floor(rawNum); //23
  if (isFloat(rawNum)){
    remainer = rawNum % 1; //23,5
    rawNum = remainer * 60;
    mins = Math.floor(rawNum);
  }

  if(listItems.length > 1) {
    document.getElementById('date-element').children[0].remove();  
  }

  const newDate = document.createElement('p');
  newDate.className = 'date-format';
  newDate.innerHTML = `${days} days : ${hours} hours : ${mins} minutes `;
  document.getElementById('date-element').appendChild(newDate); 
};

const addItemHandler = () => {
  const title = inputElements[0].value;
  const description = inputElements[1].value;
  const time = inputElements[2].value;
  if (title.trim() === "" || description === "" || time.trim() === "") {
    alert("Please enter valid values");
    return;
  }
  const newItem = {
    title,
    description,
    time,
  };

  listItems.push(newItem);
  clearItemsModal();
  closeItemModal();
  renderItem(newItem.title, newItem.description, newItem.time);
};

addItemBtn.addEventListener("click", showItemModal);
cancelAddBtn.addEventListener("click", cancelItemHandler);
confirmAddBtn.addEventListener("click", addItemHandler);

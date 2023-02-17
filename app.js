const groceryForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const amountInput = document.querySelector("#amount-input");
const warning = document.querySelector(".warning");
const itemList = document.querySelector("#item-list");
const clearList = document.querySelector("#clear-list");
const filter = document.querySelector(".filter");

const formData = (e) => {
  //stop form default behaviour-auto submitting the file
  e.preventDefault();
  const newItem = itemInput.value;
  const newAmount = amountInput.value;
  //validation
  if (newItem === "" || newAmount === "") {
    warning.style.display = "block";
    return; //because we dont want any further action
  }
  addGroceryItemToDOM(newItem, newAmount);
  addGroceryItemToLocalS(newItem);
  //check function defined below
  checkUiState();
  itemInput.value = "";
  amountInput.value = "";
};

const createBtn = (classes) => {
  const button = document.createElement("button");
  button.className = classes;
  return button;
};
const createIcon = (classes) => {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
};
//adding groceryItem from the formdata to DOM
const addGroceryItemToDOM = (item, amount) => {
  //creating list item
  const li = document.createElement("li");
  const p = document.createElement("p");
  li.appendChild(document.createTextNode(item));
  p.appendChild(document.createTextNode(amount));
  li.appendChild(p);
  const btn = createBtn("remove-item btn-link text-red");
  const iconBtn = createIcon("fa-solid fa-xmark");
  const checkInput = document.createElement("input");
  checkInput.type = "checkbox";
  checkInput.className = "checkItem";
  li.appendChild(checkInput);
  btn.appendChild(iconBtn);
  li.append(btn);
  //add the list to the dom
  itemList.appendChild(li);
};
// cross out the
// checkInput.addEventListener("change", (e) => {
//   li.style.textDecoration = checkInput.checked ? "line-through" : "none";
//   li.style.color = checkInput.checked ? "#333" : "none";
// });
const filterAllItems = (e) => {
  const typingText = e.target.value.toLowerCase();
  const groceryItems = document.querySelectorAll("li"); //this is a node list, so we can use forEach
  groceryItems.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(typingText) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
};

function ischecked(e) {
  const checkbox = e.target;
  const listItem = checkbox.parentElement;
  if (checkbox.checked) {
    listItem.style.textDecoration = "line-through";
    listItem.style.fontWeight = "400";
  } else {
    listItem.style = "none";
  }
}

//remaove single item
const removeItem = (e) => {
  //check to confirm we are targeting the right icon
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure you want to delete this item")) {
      e.target.parentElement.parentElement.remove();
      checkUiState();
    }
  }
};

function checkUiState() {
  //dynamic display
  if (document.querySelectorAll("li").length === 0) {
    clearList.style.display = "none";
    filter.style.display = "none";
  } else {
    clearList.style.display = "block";
    filter.style.display = "block";
  }
}
const clearAllItems = () => {
  if (
    confirm(
      "You are about to remove all your items 👁! are you sure you have gotten everything?"
    )
  ) {
    //itemList.style.display = "none";
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
    checkUiState();
  }
};

//localstorage
const addGroceryItemToLocalS = (item) => {
  let groceryItemFromStorage = getGroceryItemToLocalS();

  //now add new item to the array
  groceryItemFromStorage.push(item);

  //back to string and store in localstorage
  localStorage.setItem("items", JSON.stringify(groceryItemFromStorage));
};
//this function gets grocery items in the localstorage
const getGroceryItemToLocalS = () => {
  let groceryItemFromStorage;
  //first check to see if there are items in the storage or not
  if (localStorage.getItem("items") === null) {
    groceryItemFromStorage = [];
  } else {
    groceryItemFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return groceryItemFromStorage;
};

const displayGroceryItems = () => {
  const groceryItemsFromStorage = getGroceryItemToLocalS();
  groceryItemsFromStorage.forEach((item) =>
    addGroceryItemToDOM(item, "current")
  );
  checkUiState();
};
//what happens if i add the same item multiple times? next task

checkUiState();
groceryForm.addEventListener("submit", formData);
itemList.addEventListener("click", ischecked);
itemList.addEventListener("click", removeItem);
filter.addEventListener("input", filterAllItems);
document.addEventListener("DOMContentLoaded", displayGroceryItems);
//clear the whole list
clearList.addEventListener("click", clearAllItems);

const groceryForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const amountInput = document.querySelector("#amount-input");
const warning = document.querySelector(".warning");
const itemList = document.querySelector("#item-list");
const clearList = document.querySelector("#clear-list");

let li;
let checkInput;

groceryForm.addEventListener("submit", (e) => {
  //stop form default behaviour-auto submitting the file
  e.preventDefault();
  const newItem = itemInput.value;
  const newAmount = amountInput.value;
  //validation
  if (newItem === "" || newAmount === "") {
    warning.style.display = "block";
    return; //because we dont want any further action
  }
  //creating list item
  checkInput = document.createElement("input");
  checkInput.type = "checkbox";
  checkInput.className = "checkItem";
  li = document.createElement("li");
  const p = document.createElement("p");
  li.appendChild(document.createTextNode(newItem));
  p.appendChild(document.createTextNode(newAmount));
  const btn = createBtn("remove-item btn-link text-red");
  const iconBtn = createIcon("fa-solid fa-xmark");
  btn.appendChild(iconBtn);
  li.appendChild(p, btn);
  li.prepend(checkInput);
  //add the list to the dom
  itemList.appendChild(li);
  itemInput.value = "";
  amountInput.value = "";
  console.log(itemList);
});

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
// cross out the
// checkInput.addEventListener("change", () => {
//   li.style.textDecoration = checkInput.checked ? "line-through" : "none";
//   li.style.color = checkInput.checked ? "#333" : "none";
// });
//remaove single item
// icon.addEventListener("click", () => (itemList.style.display = "none"));
//clear the whole list
clearList.addEventListener("click", () => (itemList.style.display = "none"));

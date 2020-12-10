var toDoListItemValues = {};
var idIncrement;
setUpPage();

//Populates to-do list and sets up saves
function setUpPage() {  
  document.querySelector('form').addEventListener('submit', addItem);
  idIncrement = localStorage.getItem('idIncrement') || 0;

  if (localStorage.getItem('toDoListItemValues')) {
    toDoListItemValues = JSON.parse(localStorage.getItem('toDoListItemValues'));
    for (key in toDoListItemValues) {
      showItem(key, toDoListItemValues[key]);
    }
  }
}

//Add array item
function addItem(e) {
  e.preventDefault();

  var newItem = document.getElementById('item-entry');
  if (newItem.value == "") {
    return;
  }
  
  idIncrement++;
  showItem(idIncrement, newItem.value);

  //Save locally
  toDoListItemValues[idIncrement] = newItem.value;
  localStorage.setItem('toDoListItemValues', JSON.stringify(toDoListItemValues));
  localStorage.setItem('idIncrement', idIncrement);
  
  //Clear the input text
  newItem.value = "";
}

//Add a to-do element to the display list
function showItem(itemId, itemText) {
  var toDoElement = document.createElement('div');
  toDoElement.className = "media text-muted pt-3"
  toDoElement.id = itemId;
  toDoElement.innerHTML = `
    <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
      ${itemText}
      <button type="button" class="close" id="remove">&times;</span></button>
    </p>`;
  
  document.getElementById('todo-items').appendChild(toDoElement);
  
  //Add a removeItem event to the X button
  toDoElement.querySelector('button').addEventListener('click', removeItem);
}

//Remove a to-do item
function removeItem(e) {
  var itemContainer = e.target.parentElement.parentElement;
  delete toDoListItemValues[itemContainer.id];
  localStorage.setItem('toDoListItemValues', JSON.stringify(toDoListItemValues));
  itemContainer.remove();
}
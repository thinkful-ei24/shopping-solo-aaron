'use strict';

const store = {
  items: [{ name: 'apples', checked: false },
  { name: 'oranges', checked: false },
  { name: 'milk', checked: true },
  { name: 'bread', checked: false }],
  hideChecked: false,
  searched: '',
};


function generateItemElement(item, itemIndex) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
        <form id="edit-text">
        <input type="text" name="editbar" placeholder="Edit your entry here">
        <button class="shopping-item-edit js-item-edit">
            <span class="button-label">edit</span>
        </button>
        </form>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join('');
}


function renderShoppingList() {

  let displayedItems = store.hideChecked ? store.items.filter(item => !item.checked) : store.items;
  displayedItems = store.searched !== '' ? displayedItems.filter(item => item.name === store.searched) : displayedItems;



  const shoppingListItemsString = generateShoppingItemsString(displayedItems);
  $('.js-shopping-list').html(shoppingListItemsString);
}





function addItemToShoppingList(itemName) {
  store.items.push({ name: itemName, checked: false });
}




function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function (event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}




function toggleCheckedForListItem(itemIndex) {
  store.items[itemIndex].checked = !store.items[itemIndex].checked;
}




function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}


function deleteListItem(itemIndex) {
  store.items.splice(itemIndex, 1);
}


function handleDeleteItemClicked() {

  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteListItem(itemIndex);
    renderShoppingList();
  });
}





function handleHideCompletedClicked() {
  let checkBox = $('input[name = "checkbox"]');

  checkBox.change(function () {
    store.hideChecked = $(this).prop('checked');
    renderShoppingList();
  });
}


function searchForItems() {
  $('#search-bar').submit(function (e) {
    e.preventDefault();

    const searchEntry = $('input[name = "search"]').val();
    $('input[name = "search"]').val('');

    store.searched = searchEntry;

    renderShoppingList();
  });
}






function editListItem() {
  $('#edit-text').submit(function (e) {

    e.preventDefault();

    let itemIndex = getItemIndexFromElement(event.currentTarget);
 
    const editEntry = $('input[name = "editbar"]').val();
    $('input[name = "editbar"]').val('');

    store.items[itemIndex].name = editEntry;

    renderShoppingList();
  });
}






function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleHideCompletedClicked();
  searchForItems();
  editListItem();
}


$(handleShoppingList);
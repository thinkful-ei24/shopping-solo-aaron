'use strict';

const store = {
  items: [{ name: 'apples', checked: false, edited: false },
  { name: 'oranges', checked: false, edited: false },
  { name: 'milk', checked: true, edited: false },
  { name: 'bread', checked: false, edited: false }],
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
        <button class="shopping-item-edit js-item-edit">
            <span class="button-label">edit</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join('');
}


function renderShoppingList() {
  store.items.edited ? console.log('hello'): store.items.edited;
  let displayedItems = store.hideChecked ? store.items.filter(item => !item.checked) : store.items;
  displayedItems = store.searched !== '' ? displayedItems.filter(item => item.name === store.searched): displayedItems;
  
  // const searchedDisplayedItems = $('displayedItems'):contains($('input[name = "search"]').val()); 

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


function addEditText(itemIndex) {
  return `
  <li class="js-item-index-element" data-item-index="${itemIndex}">
    <span class="shopping-item js-shopping-item ${itemIndex.checked ? 'shopping-item__checked' : ''}">${itemIndex.name}</span>
    <input type="text" name="edit" placeholder="New Text Here">
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
      </button>
      <button class="shopping-item-edit js-item-edit">
          <span class="button-label">edit</span>
      </button>
    </div>
  </li>`;
}




function editListItem() {
  $('.js-shopping-list').on('click', '.js-item-edit', event => {

    const itemIndex = getItemIndexFromElement(event.currentTarget);
    itemIndex.html(addEditText(itemIndex));
    
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
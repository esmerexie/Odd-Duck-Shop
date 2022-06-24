/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
let cart;
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
cart = new Cart(cartItems);

// On screen load, we call this method to put all of the product options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
  let optionSpace = document.getElementById('items');

  //TODO DONE: Add an <option> tag inside the form's select for each product
  for (let i in Product.allProducts) {
    let optionEl = document.createElement('option');
    optionEl.text = Product.allProducts[i].name;
    optionSpace.appendChild(optionEl);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO DONE: Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

let selectBox = document.getElementById('items');
let formElement = document.getElementById('catalog');

// TODO DONE: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO DONE: suss out the item picked from the select list
  // TODO DONE: get the quantity
  let itemName = selectBox.options[selectBox.selectedIndex].text;
  let itemCount = parseInt(document.querySelector('label > input').value);

  console.log(typeof itemName);
  let state = true;
  
  for(let i = 0; i < cart.items.length; i++){
    if(itemName === cart.items[i].product){
      console.log(cart.items[i].quantity);
      console.log(itemCount);
      cart.items[i].quantity += itemCount;
      console.log(cart.items[i].quantity);
      state = false;
      console.log(cart.items);
      break;
    }
  }

  if(state){
    cart.addItem(itemName, itemCount);
  }

  // TODO DONE: using those, add one item to the Cart
}

// TODO DONE: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() { 
  let span = document.getElementById('itemCount');
  
  span.textContent = ": " + cart.items.length;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO DONE: Get the item and quantity from the form
  let quantity = cart.items[cart.items.length-1].quantity;
  let product = cart.items[cart.items.length-1].product;
  // TODO DONE: Add a new element to the cartContents div with that information
    let cartPreview = document.getElementById('cartContents');
    let list = document.createElement('ul');
    cartPreview.appendChild(list);
    let listEl = document.createElement('li');
    list.appendChild(listEl);
    listEl.textContent = "Added " + quantity + " of "+ product;

}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
formElement.addEventListener('submit', handleSubmit);

const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();

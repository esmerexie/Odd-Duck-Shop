/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO DONE: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let bodyEl = document.querySelector('tbody');
  if(document.querySelector('tbody > tr')){
    for(let i = 0; i < cart.items.length; i++){
      let rowEl = document.querySelector('tbody > tr');
      bodyEl.removeChild(rowEl);
    }
  }
}

// TODO DONE: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO DONE: Find the table body
  let tbody = document.querySelector('tbody');
  
  // TODO DONE: Iterate over the items in the cart
  for (let i = 0; i < cart.items.length; i++){
    // TODO DONE: Create a TR
    let row = document.createElement('tr');
    tbody.appendChild(row);
    // TODO DONE: Create a TD for the delete link, quantity,  and the item
    let tdButton = document.createElement('td');
    let button = document.createElement('button');
    button.textContent = "Delete";
    row.appendChild(tdButton);
    tdButton.appendChild(button);
    button.setAttribute('id', cart.items[i].product);
    let tdQuant = document.createElement('td');
    tdQuant.textContent = cart.items[i].quantity;
    row.appendChild(tdQuant);
    let tdProduct = document.createElement('td');
    tdProduct.textContent = cart.items[i].product;
    row.appendChild(tdProduct);
    // TODO DONE: Add the TR to the TBODY and each of the TD's to the TR
  }

}

function removeItemFromCart(event) {

  event.preventDefault();
  // TODO DONE: When a delete link is clicked, use cart.removeItem to remove the correct item
  let name = event.target.id;
  
  cart.removeItem(name);
  // TODO DONE: Save the cart back to local storage
  localStorage.setItem("cart", JSON.stringify(cart.items));
  // TODO DONE: Re-draw the cart table
  for(let i = 0; i < cart.items.length + 1; i++){
    let trEl = document.querySelector('tbody tr');
    let table = document.querySelector('tbody');
    table.removeChild(trEl);
  }

  showCart();

}

// This will initialize the page and draw the cart on screen
renderCart();

for(let i = 0; i < cart.items.length; i++){
  let buttonElement = document.getElementById(cart.items[i].product);
  buttonElement.addEventListener('onclick', removeItemFromCart);
}

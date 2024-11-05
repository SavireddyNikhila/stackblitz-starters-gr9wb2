const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let cors = require('cors');
app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

function addItemToCart(cart, productId, name, price, quantity) {
  let item = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };
  cart.push(item);
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addItemToCart(cart, productId, name, price, quantity);
  res.json({ cartItems: result });
});

function updateItemQuantityByProductId(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = updateItemQuantityByProductId(cart, productId, quantity);
  res.json({ cartItems: result });
});

function deleteItemByProductId(cartItem, productId) {
  return !(cartItem.productId === productId);
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter((cartItem) =>
    deleteItemByProductId(cartItem, productId)
  );
  cart = result;
  res.json({ cartItems: result });
});

app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

function calculateTotalQuantity(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].quantity;
  }
  return total;
}

app.get('/cart/total-quantity', (req, res) => {
  let result = calculateTotalQuantity(cart);
  res.json({ totalQuantity: result });
});

function calculateTotalPrice(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }
  return total;
}

app.get('/cart/total-price', (req, res) => {
  let result = calculateTotalPrice(cart);
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

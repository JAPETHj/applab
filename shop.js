let currentUser = null;
let cart = [];

const products = [
  { id: 1, name: "Shoes", price: 49 },
  { id: 2, name: "Bag", price: 29 },
  { id: 3, name: "Shirt", price: 19 },
];

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '{}');
}

function setUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function getOrders() {
  return JSON.parse(localStorage.getItem('orders') || '{}');
}

function setOrders(orders) {
  localStorage.setItem('orders', JSON.stringify(orders));
}

function signup() {
  const user = document.getElementById('signup-username').value;
  const pass = document.getElementById('signup-password').value;

  if (!user || !pass) return;

  const users = getUsers();
  if (users[user]) return alert("User exists");

  users[user] = { password: pass };
  setUsers(users);
  alert("Signup successful!");
}

function login() {
  const user = document.getElementById('login-username').value;
  const pass = document.getElementById('login-password').value;
  const users = getUsers();

  if (users[user] && users[user].password === pass) {
    currentUser = user;
    cart = [];
    document.getElementById('auth').classList.add('hidden');
    document.getElementById('shop').classList.remove('hidden');
    document.getElementById('user-name').textContent = currentUser;
    renderProducts();
    renderCart();
    renderOrders();
  } else {
    document.getElementById('auth-msg').textContent = "Invalid credentials";
  }
}

function logout() {
  currentUser = null;
  document.getElementById('auth').classList.remove('hidden');
  document.getElementById('shop').classList.add('hidden');
}

function renderProducts() {
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      ${p.name} - $${p.price}
      <button onclick="addToCart(${p.id})">Add to cart</button>
    `;
    list.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - $${item.price}
      <button onclick="removeFromCart(${index})">Remove</button>`;
    cartList.appendChild(li);
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function checkout() {
  if (cart.length === 0) return alert("Cart is empty!");

  const orders = getOrders();
  if (!orders[currentUser]) orders[currentUser] = [];
  orders[currentUser].push([...cart]); // save copy
  setOrders(orders);
  cart = [];
  renderCart();
  renderOrders();
  alert("Order placed!");
}

function renderOrders() {
  const history = document.getElementById('order-history');
  history.innerHTML = '';
  const orders = getOrders()[currentUser] || [];
  orders.forEach((order, i) => {
    const li = document.createElement('li');
    const names = order.map(item => item.name).join(', ');
    li.textContent = `Order ${i + 1}: ${names}`;
    history.appendChild(li);
  });
}

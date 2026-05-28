// Cart item shape: { id, name, price, qty }
function addToCart(cart, item) {
  const existing = cart.find((i) => i.id === item.id);
  if (existing) {
    existing.qty += item.qty ?? 1;
  } else {
    cart.push({ ...item, qty: item.qty ?? 1 });
  }
  return cart;
}

function updateCartItem(cart, itemId, updates) {
  const idx = cart.findIndex((i) => i.id === itemId);
  if (idx === -1) return cart;
  cart[idx] = { ...cart[idx], ...updates };
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  return cart;
}

function removeFromCart(cart, itemId) {
  const idx = cart.findIndex((i) => i.id === itemId);
  if (idx !== -1) cart.splice(idx, 1);
  return cart;
}

function calculateTotal(cart) {
  return cart.reduce(
    (sum, it) => sum + (Number(it.price) || 0) * (Number(it.qty) || 0),
    0,
  );
}

// Optional: localStorage helpers
const CART_KEY = "my_cart_v1";
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

// Example usage
let cart = [];
cart = addToCart(cart, { id: 1, name: "Áo", price: 200000, qty: 2 });
cart = addToCart(cart, { id: 2, name: "Quần", price: 300000 });
cart = updateCartItem(cart, 2, { qty: 3 });
cart = removeFromCart(cart, 1);
console.log("Cart:", cart);
console.log("Tổng tiền:", calculateTotal(cart)); // số

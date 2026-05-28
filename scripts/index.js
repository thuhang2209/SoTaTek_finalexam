(function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cartCount");
  const checkoutItems = document.getElementById("checkoutItems");
  const checkoutTotal = document.getElementById("checkoutTotal");
  const checkoutForm = document.getElementById("checkoutForm");
  const checkoutMessage = document.getElementById("checkoutMessage");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const currencyFormat = new Intl.NumberFormat("vi-VN");

  function formatPrice(value) {
    return currencyFormat.format(value) + "đ";
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function calculateCartTotal() {
    return cart.reduce(function (sum, item) {
      return sum + item.price * item.quantity;
    }, 0);
  }

  function saveOrderHistory(totalValue, totalQuantity) {
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    orderHistory.push({
      orderId: "OD-" + Date.now(),
      totalValue: totalValue,
      totalQuantity: totalQuantity,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
  }

  function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  }

  function renderCart() {
    const totalQuantity = cart.reduce(function (sum, item) { return sum + item.quantity; }, 0);
    const totalPrice = calculateCartTotal();

    cartCount.textContent = String(totalQuantity);
    checkoutTotal.textContent = formatPrice(totalPrice);

    if (cart.length === 0) {
      checkoutItems.innerHTML = '<li class="muted">Chưa có sản phẩm trong giỏ.</li>';
      return;
    }

    checkoutItems.innerHTML = cart.map(function (item, index) {
      return "<li><span>" + item.name + " x" + item.quantity + "</span><div class=\"checkout-item-right\"><strong>" + formatPrice(item.price * item.quantity) + "</strong><button type=\"button\" class=\"remove-item\" data-index=\"" + index + "\">Xóa</button></div></li>";
    }).join("");

    document.querySelectorAll(".remove-item").forEach(function (button) {
      button.addEventListener("click", function () {
        const index = Number(button.dataset.index);
        if (!Number.isNaN(index)) {
          removeItem(index);
        }
      });
    });
  }

  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = button.dataset.id;
      const name = button.dataset.name;
      const price = Number(button.dataset.price);

      if (!id || !name || Number.isNaN(price)) {
        return;
      }

      const found = cart.find(function (item) { return item.id === id; });
      if (found) {
        found.quantity += 1;
      } else {
        cart.push({ id: id, name: name, price: price, quantity: 1 });
      }
      saveCart();
      checkoutMessage.textContent = "";
      renderCart();
    });
  });

  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (cart.length === 0) {
      checkoutMessage.textContent = "Vui lòng thêm sản phẩm trước khi checkout.";
      return;
    }

    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!fullName || !phone || !address) {
      checkoutMessage.textContent = "Vui lòng nhập đầy đủ thông tin nhận hàng.";
      return;
    }

    const totalQuantity = cart.reduce(function (sum, item) { return sum + item.quantity; }, 0);
    const totalValue = calculateCartTotal();
    saveOrderHistory(totalValue, totalQuantity);
    checkoutMessage.textContent = "Đặt hàng thành công. Cảm ơn bạn đã mua sắm tại SoTaShop!";
    cart.splice(0, cart.length);
    localStorage.removeItem("cart");
    checkoutForm.reset();
    renderCart();
  });

  renderCart();
})();

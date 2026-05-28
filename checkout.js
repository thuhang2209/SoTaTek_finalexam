let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

let cartItems =
    document.getElementById("cart-items");

let totalPrice =
    document.getElementById("total-price");

function displayCart(){

    cartItems.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        cartItems.innerHTML =
            "<h3>Cart is Empty</h3>";

        totalPrice.innerText = "Total: $0";

        return;
    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    <h3>${item.name}</h3>

                    <p>Price: $${item.price}</p>

                    <p>Quantity: ${item.quantity}</p>

                </div>

                <button onclick="removeItem(${index})">
                    Delete
                </button>

            </div>

        `;
    });

    totalPrice.innerText =
        "Total: $" + total;
}

displayCart();

function removeItem(index){

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}

function placeOrder(){

    let name =
        document.getElementById("name").value;

    let address =
        document.getElementById("address").value;

    if(name === "" || address === ""){

        alert("Please enter full information");

        return;
    }

    alert("Order Success!");

    localStorage.removeItem("cart");

    window.location.href = "index.html";
}

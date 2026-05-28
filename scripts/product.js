function addToCart(name, price){

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let product = {

        name: name,
        price: price,
        quantity: 1
    };

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Added to cart");
}

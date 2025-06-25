import menuArray from "./data.js";

// define variables
const menu = document.getElementById("menu");
const cart = [];
const cartContainer = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const placeOrderButton = document.getElementById("place-order-button");
const checkoutModal = document.getElementById("checkout-modal");

// Function to render each menu item
function renderItem(item) {
    const ingredients = item.ingredients.join(", ");

    return `
        <div class="item" data-id="${item.id}">
            <img src="./public/images/${item.picture}" alt="${item.name} image">
            <div class="info">
                <h2 class="name">${item.name}</h2>
                <p class="description">${ingredients}</p>
                <p class="price">$${item.price}</p>
            </div>
            <button type="button" class="add-btn">&#43;</button>
        </div>
    `;
}

// Render all items in the menu
menuArray.forEach((item) =>
    menu.insertAdjacentHTML("beforeend", renderItem(item))
);

// Function to render the cart
function renderCart(cart) {
    // Check if the cart is empty
    if (cart.length === 0) {
        cartContainer.classList.add("hidden");
        return;
    }
    cartContainer.classList.remove("hidden");

    // Clear the cart items container
    if (cartItems) {
        cartItems.innerHTML = "";
    }

    // map through the cart and render each item
    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("item");
        cartItem.dataset.id = item.id;
        cartItem.innerHTML = `
            <div class="left">
                <p>${item.name}</p>
                <button type="button" class="remove-btn">remove</button>
            </div>
            <div class="right">
                $${item.price}
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    // Calculate the total price
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    totalPriceElement.innerHTML = `
        <p>Total Price: </p>
        <span>$${totalPrice}</span>
    `;
}

// Event listener for adding items to the cart
menu.addEventListener("click", (event) => {
    // Check if the clicked element is an add button
    if (event.target.classList.contains("add-btn")) {
        const itemId = parseInt(event.target.parentElement.dataset.id);
        // Find the item in the menu array
        const item = menuArray.find((item) => item.id === itemId);
        // Add the item to the cart
        cart.push(item);
        // Render the updated cart
        renderCart(cart);
    }

    // Event listener for removing items from the cart
    cartItems.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-btn")) {
            const itemId = parseInt(event.target.parentElement.parentElement.dataset.id);
            // Find the item in the cart
            const itemIndex = cart.findIndex((item) => item.id === itemId);
            // If the item is not found, do nothing
            if (itemIndex === -1) {
                return;
            }
            // Remove the item from the cart
            cart.splice(itemIndex, 1);
            // Render the updated cart
            renderCart(cart);
        }
    });
});

// Event listener for placing the order
placeOrderButton.addEventListener("click", () => {
    console.log("Order placed!");

    checkoutModal.classList.remove("hidden");

});

// Initialize cart
renderCart(cart);

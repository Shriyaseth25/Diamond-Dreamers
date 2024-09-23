const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if(bar)
{
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}


if(close)
    {
        close.addEventListener('click', () => {
            nav.classList.remove('active');
        })
    }


// Initialize cart array from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update the cart count
function updateCartCount() {
    let cartCountElement = document.getElementById('cart-count');
    let cartCount = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity
    cartCountElement.innerText = cartCount;
}

// Function to add item to cart
function addToCart(brand, name, price, img) {
    const product = { brand, name, price, img, quantity: 1 };
    const existingProductIndex = cart.findIndex(item => item.name === name);

    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();  // Update cart count after adding an item
}

// Update cart count on page load
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();  // Make sure the cart count reflects current cart items
    if (document.getElementById("cart-items")) {
        displayCartItems();
    }
});


function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    cartItemsContainer.innerHTML = "";
    let cartTotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        cartTotal += itemTotal;

        cartItemsContainer.innerHTML += `
            <tr>
                <td>
                    <img src="${item.img}" alt="${item.name}">
                    <div>
                        <p>${item.brand}</p>
                        <h5>${item.name}</h5>
                    </div>
                </td>
                <td>Rs. ${item.price}</td>
                <td class="quantity">
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)" 
    style="width: 100px; 
           padding: 8px; 
           border-radius: 8px; 
           border: 1px solid #ccc; 
           background-color: #cdb2ba; 
           font-size: 16px; 
           text-align: center; 
           box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); 
           transition: all 0.3s ease;"
>

                </td>
                <td>Rs. ${itemTotal}</td>
                <td><button onclick="removeFromCart(${index})" class="remove-btn">Remove</button></td>
            </tr>
        `;
    });

    cartTotalElement.textContent = `Rs. ${cartTotal}`;
}


function updateQuantity(index, newQuantity) {
    cart[index].quantity = parseInt(newQuantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("cart-items")) {
        displayCartItems();
    }
});

// Checkout button event listener
document.getElementById("checkout-btn").addEventListener("click", () => {
    const cartTotalElement = document.getElementById("cart-total").textContent; // Get the cart total

    if (parseFloat(cartTotalElement.replace("Rs. ", "")) > 0) {
        // Show modal with order placed message
        const modal = document.getElementById("order-confirmation-modal");
        const confirmationMessage = document.getElementById("confirmation-message");

        // Set the message inside the modal
        confirmationMessage.textContent = `Your order is placed! Total Amount: ${cartTotalElement}`;

        // Display the modal
        modal.style.display = "block";

        // Clear the cart
        cart = [];  // Empty the cart array
        localStorage.setItem("cart", JSON.stringify(cart));  // Update localStorage
        displayCartItems();  // Refresh the cart display
        updateCartCount();  // Update the cart count to zero
        
    } else {
        // If the cart is empty, show a message
        const modal = document.getElementById("order-confirmation-modal");
        const confirmationMessage = document.getElementById("confirmation-message");

        // Set the message inside the modal
        confirmationMessage.textContent = "Your cart is empty! Please add items to your cart.";

        // Display the modal
        modal.style.display = "block";
    }
});

// Close modal when clicking on (X) or close button
document.querySelector(".close-btn").addEventListener("click", () => {
    document.getElementById("order-confirmation-modal").style.display = "none";
});

document.getElementById("close-modal-btn").addEventListener("click", () => {
    document.getElementById("order-confirmation-modal").style.display = "none";
});

// Optional: Close the modal when clicking anywhere outside the modal
window.onclick = function(event) {
    const modal = document.getElementById("order-confirmation-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}


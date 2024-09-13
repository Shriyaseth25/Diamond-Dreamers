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


// Initialize cart array in local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    let cartCountElement = document.getElementById('cart-count');
    let cartCount = parseInt(cartCountElement.innerText) || 0;
    cartCountElement.innerText = cartCount + 1;
}

function addToCart(brand, name, price, img) {
    const product = { brand, name, price, img, quantity: 1 };
    const existingProductIndex = cart.findIndex(item => item.name === name);

    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    // alert(${name} added to cart!);
}

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
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
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

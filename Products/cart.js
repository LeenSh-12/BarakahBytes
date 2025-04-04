// Utility
const CART_KEY = 'cart-items';

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product) {
    let cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
    renderCart();
    openCartDrawer();
}

// Drawer Open/Close
function openCartDrawer() {
    document.getElementById("cartDrawer").classList.add("open");
    document.getElementById("cartOverlay").classList.add("show");
}

function closeCartDrawer() {
    document.getElementById("cartDrawer").classList.remove("open");
    document.getElementById("cartOverlay").classList.remove("show");
}

// Render Cart
function renderCart() {
    const cartItems = getCart();
    const container = document.getElementById("cartItems");
    const total = document.getElementById("cartTotal");
    container.innerHTML = "";
    let totalPrice = 0;

    cartItems.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.price}</p>
        <input type="number" min="1" value="${item.quantity}" data-id="${item.id}">
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;

        container.appendChild(itemDiv);

        const priceNum = parseFloat(item.price.replace('$', '')) || 0;
        totalPrice += priceNum * item.quantity;
    });

    total.textContent = `$${totalPrice.toFixed(2)}`;

    // Quantity update
    document.querySelectorAll('.cart-item-info input').forEach(input => {
        input.addEventListener("change", (e) => {
            const id = e.target.dataset.id;
            const newQty = parseInt(e.target.value);
            let cart = getCart();
            const item = cart.find(p => p.id === id);
            if (item) {
                item.quantity = newQty > 0 ? newQty : 1;
                saveCart(cart);
                renderCart();
            }
        });
    });

    // Remove item
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            let cart = getCart().filter(p => p.id !== id);
            saveCart(cart);
            renderCart();
        });
    });
}

// Listen for cart icon + overlay close
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cart-btn").addEventListener("click", openCartDrawer);
    document.getElementById("closeCart").addEventListener("click", closeCartDrawer);
    document.getElementById("cartOverlay").addEventListener("click", closeCartDrawer);
    renderCart(); // initialize on load
});

function goToCheckout() {
    window.location.href = "checkout.html";
}

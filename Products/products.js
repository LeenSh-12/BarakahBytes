document.addEventListener("DOMContentLoaded", function () {
   
    const searchBox = document.querySelector("#search-box");
    const products = document.querySelectorAll(".product");

    if (searchBox && products) {
        searchBox.addEventListener("input", () => {
            const searchTerm = searchBox.value.toLowerCase();
            products.forEach((product) => {
                const productName = product.querySelector("h3").textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-list");
    const searchInput = document.getElementById("search-box");
    const filterSelect = document.getElementById("category-filter");
    const sortSelect = document.getElementById("sort-products");
    const cartItems = document.getElementById("cart-items");
    let cart = [];
    let productsData = [];

    // Fetch and render products
    fetch("products.json")
        .then(response => response.json())
        .then(products => {
            productsData = products;
            renderProducts(productsData);
        })
        .catch(error => console.error("Error loading products:", error));

    function renderProducts(products) {
        productContainer.innerHTML = ""; // Clear before rendering
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product");
            productCard.setAttribute("data-category", product.category);
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
            `;
            productContainer.appendChild(productCard);
        });

        // Attach event listeners to new buttons
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", addToCart);
        });
    }

    function addToCart(event) {
        const name = event.target.dataset.name;
        const price = event.target.dataset.price;

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
    }

    function updateCart() {
        cartItems.innerHTML = "";
        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <p>${item.name} - ${item.price} x ${item.quantity}</p>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    // Live Search Functionality
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = productsData.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });

    // Filtering by Category
    filterSelect.addEventListener("change", () => {
        const category = filterSelect.value;
        const filteredProducts = category === "all" 
            ? productsData 
            : productsData.filter(product => product.category === category);
        renderProducts(filteredProducts);
    });

    // Sorting
    sortSelect.addEventListener("change", () => {
        const sortType = sortSelect.value;
        let sortedProducts = [...productsData];

        if (sortType === "name") {
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortType === "price-low") {
            sortedProducts.sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
        } else if (sortType === "price-high") {
            sortedProducts.sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)));
        }
        renderProducts(sortedProducts);
    });
});

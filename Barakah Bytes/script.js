document.addEventListener("DOMContentLoaded", function () {
    // Toggle search bar
    const searchBtn = document.querySelector("#search-btn");
    const searchForm = document.querySelector(".search-form");

    if (searchBtn && searchForm) {
        searchBtn.addEventListener("click", () => {
            searchForm.classList.toggle("active");
        });
    }

    // Carousel functionality
    const carousel = document.querySelector(".carousel");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    if (carousel && prevBtn && nextBtn) {
        const scrollAmount = 300; // Adjust scroll amount as needed

        nextBtn.addEventListener("click", () => {
            carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });

        prevBtn.addEventListener("click", () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });
    } else {
        console.error("Carousel or buttons not found!");
    }

    // Login/Signup popup
    const loginBtn = document.querySelector("#login-btn");
    const loginPopup = document.querySelector("#login-popup");
    const closeLoginBtn = document.querySelector("#login-popup .close-btn");

    if (loginBtn && loginPopup && closeLoginBtn) {
        loginBtn.addEventListener("click", () => {
            loginPopup.classList.add("active");
        });

        closeLoginBtn.addEventListener("click", () => {
            loginPopup.classList.remove("active");
        });
    }

    // Subscription popup
    const subscriptionPopup = document.querySelector("#subscription-popup");
    const closeSubscriptionBtn = document.querySelector("#subscription-popup .close-btn");
    const subscriptionForm = document.querySelector("#subscription-form");

    if (subscriptionPopup && closeSubscriptionBtn && subscriptionForm) {
        // Open subscription popup
        const joinNowBtn = document.querySelector("#join-now-btn");
        if (joinNowBtn) {
            joinNowBtn.addEventListener("click", () => {
                subscriptionPopup.classList.add("active");
            });
        }

        // Close subscription popup
        closeSubscriptionBtn.addEventListener("click", () => {
            subscriptionPopup.classList.remove("active");
        });

        // Payment method selection
        const paymentMethods = document.querySelectorAll(".payment-method");
        const paymentMethodInput = document.querySelector("#payment-method");

        paymentMethods.forEach((method) => {
            method.addEventListener("click", () => {
                // Remove selected class from all methods
                paymentMethods.forEach((m) => m.classList.remove("selected"));
                // Add selected class to the clicked method
                method.classList.add("selected");
                // Set the selected payment method value
                paymentMethodInput.value = method.dataset.method;
            });
        });

        // Handle form submission
        subscriptionForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Get form data
            const name = document.querySelector("#name").value;
            const email = document.querySelector("#sub-email").value;
            const paymentMethod = paymentMethodInput.value;
            const cardNumber = document.querySelector("#card-number").value;
            const expiryDate = document.querySelector("#expiry-date").value;
            const cvv = document.querySelector("#cvv").value;
            const address = document.querySelector("#address").value;
            const city = document.querySelector("#city").value;
            const state = document.querySelector("#state").value;
            const zip = document.querySelector("#zip").value;

            // Validate form data
            if (!name || !email || !paymentMethod || !cardNumber || !expiryDate || !cvv || !address || !city || !state || !zip) {
                alert("Please fill in all fields and select a payment method.");
                return;
            }

            // Simulate subscription success
            alert(`Subscription successful! Thank you for joining Barakah Bytes. Payment method: ${paymentMethod.toUpperCase()}`);
            subscriptionPopup.classList.remove("active");
            subscriptionForm.reset();

            // Reset payment method selection
            paymentMethods.forEach((m) => m.classList.remove("selected"));
            paymentMethodInput.value = "";
        });
    }

    // Search functionality
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
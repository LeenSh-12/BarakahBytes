document.addEventListener('DOMContentLoaded', function() {
    // tajweed.js

    // DOM Elements
    const tajweedClubLink = document.querySelector('.nav-link:last-child');
    const closeBtn = document.querySelector('.close-btn');
    const cardLinks = document.querySelectorAll('.card-link');
    const loginBtn = document.getElementById('login-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const selectBtns = document.querySelectorAll('.select-btn');

    // Check if user is logged in and is a member from localStorage
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    let isLoggedIn = currentUser !== null;
    let isMember = currentUser ? currentUser.isMember : false;

    // Login dropdown functionality
    if (loginBtn && dropdownMenu) {
        loginBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        // Close dropdown when clicking anywhere else
        window.addEventListener('click', function() {
            dropdownMenu.classList.remove('show');
        });

        // Prevent dropdown from closing when clicking inside it
        dropdownMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Update the dropdown menu based on login status
    function updateAuthUI() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const dropdownMenu = document.getElementById('dropdown-menu');
        
        if (!dropdownMenu) return;

        // Clear existing menu items
        dropdownMenu.innerHTML = '';

        if (currentUser) {
            // User is logged in - show Logout, Change User, and My Orders
            dropdownMenu.innerHTML = `
                <a href="#" class="dropdown-item change-user-item">Change User</a>
                <a href="#" class="dropdown-item logout-item">Logout</a>
                <a href="/Products/orders.html" class="dropdown-item orders-item">My Orders</a>
            `;
            
            // Add logout functionality
            document.querySelector('.logout-item').addEventListener('click', function(e) {
                e.preventDefault();
                const confirmLogout = confirm('Are you sure you want to logout?');
                if (confirmLogout) {
                    localStorage.removeItem('currentUser');
                    updateAuthUI();
                    alert('You have been logged out successfully');
                    location.reload();
                }
            });
            
            // Add change user functionality
            document.querySelector('.change-user-item').addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = "/login.html";
            });
        } else {
            // User is logged out - show Login only
            dropdownMenu.innerHTML = `
                <a href="/login.html" class="dropdown-item login-item">Login</a>
            `;
        }
    }

    // Initialize UI on page load
    updateAuthUI();

    // The rest of your existing code remains unchanged below this point
    // Logout functionality (you can keep this or remove it since it's now handled in updateAuthUI)
    const logoutBtn = document.querySelector('.dropdown-menu .dropdown-item:nth-child(2)');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if user is actually logged in
            if (!currentUser) {
                alert('No user is currently logged in');
                return;
            }

            // Confirmation dialog
            const confirmLogout = confirm('Are you sure you want to logout?');
            if (confirmLogout) {
                // Remove user data from localStorage
                localStorage.removeItem('currentUser');
                currentUser = null;
                isLoggedIn = false;
                isMember = false;
                
                // Close the dropdown
                dropdownMenu.classList.remove('show');
                
                // Update UI and show alert
                updateAuthUI();
                alert('You have been logged out successfully');
                location.reload(); // Refresh the page
            }
        });
    }
});
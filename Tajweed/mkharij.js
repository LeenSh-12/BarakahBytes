document.addEventListener('DOMContentLoaded', function(){

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

// Logout functionality
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


})
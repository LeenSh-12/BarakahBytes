// Login/Signup section
const conta = document.querySelector('.cont');
const registerBTN = document.querySelector('.register-BTN');
const loginBTN = document.querySelector('.login-BTN');
const loginIcon = document.getElementById('login-btn');
const closeBtn = document.querySelectorAll('.close-btn');
const loginForm = document.querySelector('.form-box.login');
const registerForm = document.querySelector('.form-box.register');



// Close button functionality
closeBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        conta.style.display = 'none';
    });
});
// Toggle between login and register forms
registerBTN.addEventListener('click', () => {
    conta.classList.add('active');
});

loginBTN.addEventListener('click', () => {
    conta.classList.remove('active');
});

// User data from localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

// Login form validation and submission
const loginUsername = loginForm.querySelector('input[type="text"]');
const loginPassword = loginForm.querySelector('input[type="password"]');
const loginSubmitBtn = loginForm.querySelector('.BTN');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!loginUsername.value || !loginPassword.value) {
        alert('Please fill in all fields');
        return;
    }
// Check if user exists
const user = users.find(u => u.username === loginUsername.value && u.password === loginPassword.value);
    
if (user) {
    alert('Login successful!');
    // Store current user in session
    localStorage.setItem('currentUser', JSON.stringify(user));
    conta.style.display = 'none';
    // Reset form
    loginForm.reset();
} else {
    alert('Invalid username or password');
}
});

// Register form elements
const regUsername = registerForm.querySelector('input[type="text"]');
const regEmail = registerForm.querySelector('input[type="email"]');
const regPassword = registerForm.querySelector('input[type="password"]');
const regSubmitBtn = registerForm.querySelector('.BTN');

// Email validation function
function isValidEmail(email) {
const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return re.test(email);
}

// Register form validation and submission
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!regUsername.value || !regEmail.value || !regPassword.value) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(regEmail.value)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Check if username or email already exists
    const userExists = users.some(u => u.username === regUsername.value || u.email === regEmail.value);
    
    if (userExists) {
        alert('Username or email already exists');
        return;
    }
// Create new user
const newUser = {
    username: regUsername.value,
    email: regEmail.value,
    password: regPassword.value
};

users.push(newUser);
localStorage.setItem('users', JSON.stringify(users));

alert('Registration successful! You can now login.');
conta.classList.remove('active');
registerForm.reset();
});

// Check if user is already logged in on page load
window.addEventListener('DOMContentLoaded', () => {
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
    // User is logged in, you could update UI here
    console.log('User is logged in:', currentUser.username);
}


});
// Disable register button if form is invalid
function validateRegisterForm() {
    const isEmailValid = isValidEmail(regEmail.value);
    const allFieldsFilled = regUsername.value && regEmail.value && regPassword.value;
    
    regSubmitBtn.disabled = !(isEmailValid && allFieldsFilled);
}

// Add event listeners for real-time validation
regUsername.addEventListener('input', validateRegisterForm);
regEmail.addEventListener('input', validateRegisterForm);
regPassword.addEventListener('input', validateRegisterForm);

// Initial validation
validateRegisterForm();

 // Login dropdown functionality
 const loginBtn = document.getElementById('login-btn');
 const dropdownMenu = document.getElementById('dropdown-menu');

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
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert('No user is currently logged in');
            return;
        }

        // Confirmation dialog
        const confirmLogout = confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            // Remove user data from localStorage
            localStorage.removeItem('currentUser');
            
            // Optional: Remove other user-related data if needed
            // localStorage.removeItem('userCart');
            // localStorage.removeItem('userPreferences');
            
            // Close the dropdown
            dropdownMenu.classList.remove('show');
            
            // Optional: Refresh the page or update UI
            alert('You have been logged out successfully');
            location.reload(); // Remove this line if you don't want page refresh
        }
    });
}

// Update UI based on login status
function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginItem = document.querySelector('.dropdown-menu .dropdown-item:nth-child(1)');
    const logoutItem = document.querySelector('.dropdown-menu .dropdown-item:nth-child(2)');

    if (currentUser) {
        // User is logged in
        if (loginItem) loginItem.style.display = 'none';
        if (logoutItem) logoutItem.style.display = 'block';
    } else {
        // User is logged out
        if (loginItem) loginItem.style.display = 'block';
        if (logoutItem) logoutItem.style.display = 'none';
    }
}

// Initialize UI on page load
document.addEventListener('DOMContentLoaded', updateAuthUI);

 
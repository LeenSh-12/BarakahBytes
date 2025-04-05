// Global variable to hold selected package
let selectedPackage = null;


function toggleHajjUmrah(pilgrimageType) {
    const monthSelect = document.getElementById("month");
    const monthField = document.getElementById("monthField");
    const locationField = document.getElementById("locationField");
    const nightsField = document.getElementById("nightsField");

    if (pilgrimageType === "hajj") {
        // Set Dhul Hijjah month
        monthSelect.value = "Dhul Hijjah";
        monthSelect.disabled = true;
        monthField.style.display = "none"; // Hide month dropdown

        // Hide location and nights selection for Hajj
        locationField.style.display = "none";
        nightsField.style.display = "none";
    } else {
        // Enable month selection for Umrah
        monthSelect.disabled = false;
        monthField.style.display = "block"; // Show month dropdown

        // Show location and nights selection for Umrah
        locationField.style.display = "block";
        nightsField.style.display = "block";
    }
}

// Populate year dropdown
function populateYear() {
    const yearSelect = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i <= currentYear + 2; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
}

// Populate month dropdown for Umrah
function populateMonth() {
    const monthSelect = document.getElementById('month');
    const months = [
        'Muharram', 'Safar', 'Rabi’ al-Awwal', 'Rabi’ al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani',
        'Rajab', 'Sha’ban', 'Ramadan', 'Shawwal', 'Dhul-Qi’dah', 'Dhul-Hijjah'
    ];
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month;
        monthSelect.appendChild(option);
    });
}

// Update nights options based on location selection
function updateNights() {
    const location = document.getElementById('location').value;
    const nightsSelect = document.getElementById('nights');
    nightsSelect.innerHTML = ''; // Clear existing options

    let nightsRange = [];
    if (location === 'makkah') {
        nightsRange = Array.from({ length: 30 }, (_, i) => i + 1);
    } else if (location === 'madinah') {
        nightsRange = Array.from({ length: 30 }, (_, i) => i + 1);
    } else if (location === 'both') {
        nightsRange = Array.from({ length: 29 }, (_, i) => i + 2); // 2 to 30 nights
    }

    nightsRange.forEach((night) => {
        const option = document.createElement('option');
        option.value = night;
        option.textContent = location === 'both' 
            ? `${night} Nights (${Math.ceil(night / 2)} Makkah & ${Math.floor(night / 2)} Madinah)`
            : `${night} Nights (${location})`;
        nightsSelect.appendChild(option);
    });
}

// Select a package and visually highlight the selected package
function selectPackage(packageType) {
    selectedPackage = packageType;
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => card.classList.remove('selected'));

    document.getElementById(packageType + 'Card').classList.add('selected');
}

// Book now functionality
function bookNow() {
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const location = document.getElementById('location').value;
    const nights = document.getElementById('nights').value;
    
    if (!year || !month || !location || !nights || !selectedPackage) {
        alert('Please fill in all the details.');
        return;
    }
    
    alert(`Booking confirmed for ${month} ${year} in ${location} for ${nights} nights with the ${selectedPackage} package.`);
}

// Initialize dropdowns
document.addEventListener("DOMContentLoaded", () => {
    populateYear();
    populateMonth();
    updateNights(); // Initialize nights options
});

// Event listener for location change to update nights
document.getElementById('location').addEventListener('change', updateNights);

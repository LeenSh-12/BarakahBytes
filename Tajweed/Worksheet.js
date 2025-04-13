document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('worksheetsContainer');
    
    // Show loading state
    container.innerHTML = '<div class="loading-spinner"><i class="fas fa-circle-notch fa-spin"></i> Loading worksheets...</div>';
    
    // Fetch data from external JSON file
    fetch('worksheet.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Clear loading state
            container.innerHTML = '';
            
            // Create cards for each worksheet
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'worksheet-card';
                
                card.innerHTML = `
                    <div class="card-image">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${item.title}</h3>
                        <p class="card-description">${item.description}</p>
                        <span class="card-price">${item.price}</span>
                        <button class="card-button" data-id="${item.id || item.title.toLowerCase().replace(/ /g, '-')}">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                `;
                
                container.appendChild(card);
            });
            
            // Add event listeners to all buttons
            document.querySelectorAll('.card-button').forEach(button => {
                button.addEventListener('click', function() {
                    addToCart(this.dataset.id);
                });
            });
        })
        .catch(error => {
            console.error('Error loading worksheets:', error);
            container.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Failed to load worksheets. Please try again later.</p>
                    <button onclick="window.location.reload()">Retry</button>
                </div>
            `;
        });

    // Cart functionality
    function addToCart(itemId) {
        console.log(`Added item ${itemId} to cart`);
        // Add your cart logic here
        // Example: 
        // const cart = JSON.parse(localStorage.getItem('cart')) || [];
        // cart.push(itemId);
        // localStorage.setItem('cart', JSON.stringify(cart));
        
        // Show feedback
        const feedback = document.createElement('div');
        feedback.className = 'cart-feedback';
        feedback.innerHTML = `<i class="fas fa-check"></i> Added to cart!`;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }
});
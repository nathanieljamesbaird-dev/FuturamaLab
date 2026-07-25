window.addEventListener('DOMContentLoaded', () => {

    // 1. Maintain an array array to store items added to the cart dynamically
    let cart = [];

    // 2. Select Core DOM Elements
    const cartDisplay = document.getElementById('cartNumber');
    const cartBadge = document.querySelector('.cart-count');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotalPriceElement = document.getElementById('cartTotalPrice');

    // 3. Find ALL purchase buttons using their common class name
    const buyButtons = document.querySelectorAll('.card-button');

    // 4. Set up individual event loops for all buttons found
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            // Go up the DOM tree to find the specific '.card' parent wrapper for this button
            const productCard = button.closest('.card');
            
            if (productCard) {
                // Read the distinct data properties from that card's HTML
                const product = {
                    id: productCard.getAttribute('data-id'),
                    name: productCard.getAttribute('data-name'),
                    price: parseFloat(productCard.getAttribute('data-price')),
                    qty: 1
                };

                // Check if this item is already sitting inside our cart array
                const existingItem = cart.find(item => item.id === product.id);
                if (existingItem) {
                    existingItem.qty++;
                } else {
                    cart.push(product);
                }

                // Refresh UI views elements
                updateCartUI();

                // Trigger micorinteraction animation triggers
                cartBadge.style.display = 'flex';
                cartBadge.classList.add('badge-responsiveness');
            }
        });
    });

    // Clean up animation lifecycle
    if (cartBadge) {
        cartBadge.addEventListener('animationend', () => {
            cartBadge.classList.remove('badge-responsiveness');
        });
    }

    // 5. Core Function: Re-renders the contents inside the Sidepanel Drawer
    function updateCartUI() {
        const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
        const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

        // Update navigation node counter
        if (cartDisplay) cartDisplay.textContent = totalCount;

        // Clear previous state layout nodes safely
        if (cartItemsList) {
            cartItemsList.innerHTML = '';

            if (cart.length === 0) {
                cartItemsList.innerHTML = `<p class="empty-msg">Your cart is currently empty.</p>`;
            } else {
                // Map over active elements and format output strings directly
                cart.forEach(item => {
                    const itemRow = document.createElement('div');
                    itemRow.className = 'cart-item-row';
                    itemRow.innerHTML = `
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p>${item.qty}x - $${item.price.toFixed(2)}</p>
                        </div>
                        <div class="item-price-total">
                            $${(item.price * item.qty).toFixed(2)}
                        </div>
                    `;
                    cartItemsList.appendChild(itemRow);
                });
            }
        }

        // Apply updated price calculation variables
        if (cartTotalPriceElement) {
            cartTotalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
        }
    }
});

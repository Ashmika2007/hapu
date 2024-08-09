// Retrieve existing order from localStorage or initialize an empty array
let order = JSON.parse(localStorage.getItem('currentOrder')) || [];

// Function to add an item to the order
function addItem(itemName, inputId, price) {
    const quantity = parseFloat(document.getElementById(inputId).value);

    if (quantity > 0) {
        // Check if the item already exists in the order
        const existingItem = order.find(item => item.name === itemName);
        if (existingItem) {
            existingItem.quantity += quantity;  // Update the quantity if item exists
        } else {
            order.push({ name: itemName, quantity: quantity, price: price });
        }

        // Save the updated order to localStorage
        localStorage.setItem('currentOrder', JSON.stringify(order));

        // Update the order summary table
        updateOrderSummary();
    }
}

// Function to update the order summary table
function updateOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    orderItemsContainer.innerHTML = '';

    let totalPrice = 0;

    // Loop through the order array and populate the table
    order.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        orderItemsContainer.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
}

// Load the order summary when the page loads
document.addEventListener('DOMContentLoaded', updateOrderSummary);

// Function to save the current order as a favourite
function saveFavourite() {
    localStorage.setItem('favouriteOrder', JSON.stringify(order));
    alert('Order saved as favourite!');
}

// Function to apply the favourite order
function applyFavourite() {
    const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));
    if (favouriteOrder) {
        order = favouriteOrder;
        localStorage.setItem('currentOrder', JSON.stringify(order));
        updateOrderSummary();
    } else {
        alert('No favourite order saved!');
    }
}

// Function to navigate to the checkout page
function goToOrderConfirmation() {
    // Save order details in localStorage (if needed)
    localStorage.setItem('currentOrder', JSON.stringify(order));

    // Navigate to checkout page
    window.location.href = 'checkout.html';
}







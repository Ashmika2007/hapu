document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the order data from localStorage
    const order = JSON.parse(localStorage.getItem('currentOrder')) || [];

    // Populate the checkout table
    const checkoutOrderItems = document.getElementById('checkout-order-items');
    const checkoutTotalPrice = document.getElementById('checkout-total-price');
    
    let totalPrice = 0;

    order.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        checkoutOrderItems.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    checkoutTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
});

// Function to handle form submission
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const cardholderName = document.getElementById('cardholder-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    // Validate and process payment here
    if (!name || !email || !address || !cardholderName || !cardNumber || !expiryDate || !cvv) {
        alert('Please fill out all fields.');
        return;
    }

    // Simulate payment processing
    // Here you might send the payment info to a server or payment gateway

    // Show thank you message
    document.getElementById('thank-you-modal').style.display = 'block';

    // Clear the order data from localStorage
    localStorage.removeItem('currentOrder');

    // Clear checkout page content
    clearCheckoutPage();
});

// Function to clear checkout page content
function clearCheckoutPage() {
    const checkoutOrderItems = document.getElementById('checkout-order-items');
    const checkoutTotalPrice = document.getElementById('checkout-total-price');

    checkoutOrderItems.innerHTML = '';
    checkoutTotalPrice.textContent = '$0.00';
}

// Function to close the thank you message
function closeThankYouMessage() {
    document.getElementById('thank-you-modal').style.display = 'none';

    // Optionally redirect or refresh the page
    // window.location.href = 'index.html'; // Uncomment this if you want to redirect
}

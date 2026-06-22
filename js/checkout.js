document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        window.location.href = "products.html";
        return;
    }

    let total = 0;
    cart.forEach(item => total += (item.price * item.quantity));
    document.getElementById('checkout-total').innerText = total;

    document.getElementById('checkout-form').addEventListener('submit', placeOrder);
});

function autoPickLocation() {
    alert("Fetching current location...");
    setTimeout(() => {
        document.getElementById('address').value = "12-34, Tech Park Road, Hitech City, Hyderabad, 500081";
    }, 1000);
}

function placeOrder(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    cart.forEach(item => total += (item.price * item.quantity));

    const newOrder = {
        id: 'ORD' + Math.floor(Math.random() * 1000000),
        date: new Date().toLocaleString(),
        customer: name,
        phone: phone,
        address: address,
        items: cart,
        total: total,
        status: 'Pending'
    };

    // Save order
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem('cart');
    
    alert(`Order placed successfully! Your Order ID is ${newOrder.id}`);
    window.location.href = "index.html";
}

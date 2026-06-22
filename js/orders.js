document.addEventListener('DOMContentLoaded', () => {
    loadUserOrders();
});

function loadUserOrders() {
    const container = document.getElementById('user-orders-container');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    if (orders.length === 0) {
        container.innerHTML = '<div class="empty-cart-msg">You have no past orders. <br><br> <a href="./products.html" style="color: #38BDF8; text-decoration: none;">Shop Now</a></div>';
        return;
    }
    
    let html = `
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    orders.reverse().forEach(order => {
        let statusColor = order.status === 'Delivered' ? 'green' : 'orange';
        html += `
            <tr>
                <td><strong>${order.id}</strong></td>
                <td>${order.date}</td>
                <td>₹${order.total}</td>
                <td style="color: ${statusColor}; font-weight: bold;">${order.status}</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
}

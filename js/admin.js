document.addEventListener('DOMContentLoaded', () => {
    loadDashboardData();
});

function loadDashboardData() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Stats
    document.getElementById('stat-orders').innerText = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('stat-revenue').innerText = '₹' + totalRevenue;

    // Table
    const tbody = document.getElementById('orders-tbody');
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No orders yet.</td></tr>';
        return;
    }

    let html = '';
    orders.reverse().forEach((order, index) => {
        // Since we reversed, the actual index in the original array is length - 1 - index
        const actualIndex = orders.length - 1 - index;
        
        let statusClass = order.status === 'Delivered' ? 'delivered' : 'pending';
        let actionBtn = order.status === 'Pending' 
            ? `<button class="action-btn" onclick="markDelivered(${actualIndex})">Mark Delivered</button>`
            : `<span>Done</span>`;

        html += `
            <tr>
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.date}</td>
                <td>₹${order.total}</td>
                <td><span class="status ${statusClass}">${order.status}</span></td>
                <td>${actionBtn}</td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

function markDelivered(index) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (orders[index]) {
        orders[index].status = 'Delivered';
        localStorage.setItem('orders', JSON.stringify(orders));
        loadDashboardData();
    }
}

// Wholesaler Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize authentication
    auth.init();

    // Load user data
    loadUserData();
    
    // Load orders
    loadActiveOrders();
    loadOrderHistory();

    // Setup event listeners
    setupEventListeners();
});

function loadUserData() {
    const user = auth.getCurrentUser();
    if (user) {
        document.getElementById('user-name').textContent = user.name;
    }
}

function loadActiveOrders() {
    // This would typically fetch from an API
    const activeOrders = [
        {
            id: 'WHS-2024-001',
            product: 'Cotton Yarn',
            quantity: '5000 kg',
            status: 'Processing',
            expectedDelivery: '2024-03-15',
            actions: '<button class="btn btn-sm btn-outline-primary">Track</button>'
        },
        {
            id: 'WHS-2024-002',
            product: 'Wool Yarn',
            quantity: '3000 kg',
            status: 'Shipped',
            expectedDelivery: '2024-03-10',
            actions: '<button class="btn btn-sm btn-outline-primary">Track</button>'
        }
    ];

    const tbody = document.getElementById('active-orders-table');
    tbody.innerHTML = activeOrders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.product}</td>
            <td>${order.quantity}</td>
            <td><span class="badge bg-${getStatusColor(order.status)}">${order.status}</span></td>
            <td>${order.expectedDelivery}</td>
            <td>${order.actions}</td>
        </tr>
    `).join('');
}

function loadOrderHistory() {
    // This would typically fetch from an API
    const orderHistory = [
        {
            id: 'WHS-2024-001',
            product: 'Cotton Yarn',
            quantity: '5000 kg',
            totalAmount: '$12,500',
            date: '2024-02-15',
            status: 'Completed'
        },
        {
            id: 'WHS-2024-002',
            product: 'Wool Yarn',
            quantity: '3000 kg',
            totalAmount: '$9,000',
            date: '2024-02-10',
            status: 'Completed'
        }
    ];

    const tbody = document.getElementById('order-history-table');
    tbody.innerHTML = orderHistory.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.product}</td>
            <td>${order.quantity}</td>
            <td>${order.totalAmount}</td>
            <td>${order.date}</td>
            <td><span class="badge bg-${getStatusColor(order.status)}">${order.status}</span></td>
        </tr>
    `).join('');
}

function getStatusColor(status) {
    const statusColors = {
        'Processing': 'warning',
        'Shipped': 'info',
        'Completed': 'success',
        'Cancelled': 'danger'
    };
    return statusColors[status] || 'secondary';
}

function setupEventListeners() {
    // New Order Form Submission
    document.getElementById('submitOrder').addEventListener('click', function() {
        const product = document.getElementById('product').value;
        const description = document.getElementById('description').value;
        const quantity = document.getElementById('quantity').value;
        const price = document.getElementById('price').value;

        if (!product || !quantity || !price) {
            alert('Please fill in all required fields');
            return;
        }

        // Here you would typically send the order to your backend
        console.log('New order:', { product, description, quantity, price });

        // Close modal and refresh orders
        bootstrap.Modal.getInstance(document.getElementById('newOrderModal')).hide();
        loadActiveOrders();
    });

    // Update statistics
    updateStatistics();
}

function updateStatistics() {
    // This would typically fetch from an API
    const stats = {
        totalOrders: 12,
        totalSpent: '$21,500',
        pendingOrders: 2
    };

    document.getElementById('total-orders').textContent = stats.totalOrders;
    document.getElementById('total-spent').textContent = stats.totalSpent;
    document.getElementById('pending-orders').textContent = stats.pendingOrders;
} 
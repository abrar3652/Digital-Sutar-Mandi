// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mock data for demonstration
    const mockData = {
        user: {
            name: 'Muhammad Ali',
            role: 'Supplier',
            activeDeals: 12,
            pendingOrders: 5,
            completedOrders: 28,
            unreadMessages: 8
        },
        deals: [
            {
                id: 1,
                name: 'Premium Cotton Yarn 30/1',
                quantity: 50,
                price: 12500,
                location: 'Lahore',
                status: 'Active'
            },
            // Add more mock deals as needed
        ],
        orders: [
            {
                id: 'ORD-001',
                product: 'Premium Cotton Yarn 30/1',
                quantity: 10,
                price: 125000,
                status: 'Pending'
            },
            // Add more mock orders as needed
        ]
    };

    // Initialize dashboard with mock data
    function initializeDashboard() {
        // Update welcome section
        document.querySelector('.welcome-section h1').textContent = `Welcome, ${mockData.user.name}!`;
        
        // Update stats
        document.querySelectorAll('.stat-number')[0].textContent = mockData.user.activeDeals;
        document.querySelectorAll('.stat-number')[1].textContent = mockData.user.pendingOrders;
        document.querySelectorAll('.stat-number')[2].textContent = mockData.user.completedOrders;
        document.querySelectorAll('.stat-number')[3].textContent = mockData.user.unreadMessages;
    }

    // Handle form submission
    const postDealForm = document.getElementById('postDealForm');
    if (postDealForm) {
        postDealForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const dealData = {
                name: formData.get('name'),
                type: formData.get('type'),
                quantity: formData.get('quantity'),
                price: formData.get('price'),
                location: formData.get('location'),
                description: formData.get('description')
            };
            
            // Here you would typically send the data to a backend
            console.log('New deal posted:', dealData);
            
            // Show success message
            const toast = new bootstrap.Toast(document.getElementById('successToast'));
            toast.show();
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('postDealModal'));
            modal.hide();
            
            // Reset form
            this.reset();
        });
    }

    // Handle order actions
    const orderButtons = document.querySelectorAll('.order-actions button');
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.closest('tr').querySelector('td:first-child').textContent;
            const action = this.textContent.trim();
            
            // Here you would typically send the action to a backend
            console.log(`Action "${action}" performed on order ${orderId}`);
            
            // Show success message
            const toast = new bootstrap.Toast(document.getElementById('successToast'));
            toast.show();
        });
    });

    // Handle deal card actions
    const dealButtons = document.querySelectorAll('.deal-footer button');
    dealButtons.forEach(button => {
        button.addEventListener('click', function() {
            const dealCard = this.closest('.deal-card');
            const dealName = dealCard.querySelector('.deal-header h3').textContent;
            const action = this.textContent.trim();
            
            if (action === 'View Details') {
                // Here you would typically navigate to the deal details page
                console.log(`Viewing details for deal: ${dealName}`);
            } else if (action === 'Edit') {
                // Here you would typically open an edit modal
                console.log(`Editing deal: ${dealName}`);
            }
        });
    });

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize dashboard
    initializeDashboard();
}); 
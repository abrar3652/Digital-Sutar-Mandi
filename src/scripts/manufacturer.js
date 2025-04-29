// Manufacturer dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mock data for demonstration
    const mockData = {
        user: {
            name: 'Textile Mills Ltd',
            role: 'Manufacturer',
            activeListings: 8,
            inProduction: 3,
            completedOrders: 15,
            unreadMessages: 5
        },
        inventory: [
            {
                id: 1,
                name: 'Premium Cotton Cloth',
                quantity: 5000,
                price: 250,
                specifications: '40s Count, Plain Weave',
                status: 'In Stock'
            },
            // Add more mock inventory items as needed
        ],
        production: [
            {
                id: 'ORD-002',
                product: 'Premium Cotton Cloth',
                quantity: 10000,
                status: 'In Production',
                progress: 60
            },
            // Add more mock production items as needed
        ]
    };

    // Initialize dashboard with mock data
    function initializeDashboard() {
        // Update welcome section
        document.querySelector('.welcome-section h1').textContent = `Welcome, ${mockData.user.name}!`;
        
        // Update stats
        document.querySelectorAll('.stat-number')[0].textContent = mockData.user.activeListings;
        document.querySelectorAll('.stat-number')[1].textContent = mockData.user.inProduction;
        document.querySelectorAll('.stat-number')[2].textContent = mockData.user.completedOrders;
        document.querySelectorAll('.stat-number')[3].textContent = mockData.user.unreadMessages;
    }

    // Handle form submission
    const postListingForm = document.getElementById('postListingForm');
    if (postListingForm) {
        postListingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const listingData = {
                name: formData.get('name'),
                type: formData.get('type'),
                quantity: formData.get('quantity'),
                price: formData.get('price'),
                specifications: formData.get('specifications')
            };
            
            // Here you would typically send the data to a backend
            console.log('New listing posted:', listingData);
            
            // Show success message
            const toast = new bootstrap.Toast(document.getElementById('successToast'));
            toast.show();
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('postListingModal'));
            modal.hide();
            
            // Reset form
            this.reset();
        });
    }

    // Handle inventory card actions
    const inventoryButtons = document.querySelectorAll('.inventory-footer button');
    inventoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const inventoryCard = this.closest('.inventory-card');
            const productName = inventoryCard.querySelector('.inventory-header h3').textContent;
            const action = this.textContent.trim();
            
            if (action === 'View Details') {
                // Here you would typically navigate to the product details page
                console.log(`Viewing details for product: ${productName}`);
            } else if (action === 'Edit') {
                // Here you would typically open an edit modal
                console.log(`Editing product: ${productName}`);
            }
        });
    });

    // Handle production tracking updates
    const updateButtons = document.querySelectorAll('.tracking-section .btn-primary');
    updateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const orderId = row.querySelector('td:first-child').textContent;
            
            // Here you would typically open an update modal
            console.log(`Updating production for order: ${orderId}`);
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
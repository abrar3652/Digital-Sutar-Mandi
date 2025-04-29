// Marketplace functionality
document.addEventListener('DOMContentLoaded', function() {
    // View toggle functionality
    const viewToggle = document.getElementById('viewToggle');
    const marketplaceGrid = document.getElementById('marketplaceGrid');
    
    if (viewToggle && marketplaceGrid) {
        viewToggle.addEventListener('click', function() {
            marketplaceGrid.classList.toggle('bazaar-view');
            const icon = viewToggle.querySelector('i');
            if (marketplaceGrid.classList.contains('bazaar-view')) {
                icon.classList.remove('fa-th');
                icon.classList.add('fa-list');
            } else {
                icon.classList.remove('fa-list');
                icon.classList.add('fa-th');
            }
        });
    }

    // Language toggle functionality
    const langToggle = document.getElementById('langToggle');
    const body = document.body;
    
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            body.classList.toggle('urdu-view');
            const icon = langToggle.querySelector('i');
            if (body.classList.contains('urdu-view')) {
                icon.classList.remove('fa-globe');
                icon.classList.add('fa-language');
            } else {
                icon.classList.remove('fa-language');
                icon.classList.add('fa-globe');
            }
        });
    }

    // Quick view modal functionality
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    const quickViewModal = new bootstrap.Modal(document.getElementById('quickViewModal'));
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.marketplace-card');
            const title = card.querySelector('.card-title').textContent;
            const price = card.querySelector('.price').textContent;
            const description = card.querySelector('.card-text').textContent;
            const image = card.querySelector('img').src;
            
            document.getElementById('modalProductTitle').textContent = title;
            document.getElementById('modalProductPrice').textContent = price;
            document.getElementById('modalProductDescription').textContent = description;
            document.getElementById('modalProductImage').src = image;
            
            quickViewModal.show();
        });
    });

    // Filter functionality
    const filterForm = document.getElementById('filterForm');
    const applyFiltersBtn = document.getElementById('applyFilters');
    
    if (filterForm && applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            const yarnType = document.getElementById('yarnType').value;
            const deliveryTime = document.getElementById('deliveryTime').value;
            const searchQuery = document.getElementById('searchInput').value.toLowerCase();
            
            const cards = document.querySelectorAll('.marketplace-card');
            
            cards.forEach(card => {
                const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
                const cardType = card.getAttribute('data-type');
                const cardDelivery = card.getAttribute('data-delivery');
                
                const matchesType = yarnType === 'all' || cardType === yarnType;
                const matchesDelivery = deliveryTime === 'all' || cardDelivery === deliveryTime;
                const matchesSearch = cardTitle.includes(searchQuery);
                
                if (matchesType && matchesDelivery && matchesSearch) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Add to cart functionality
    const addToCartBtn = document.getElementById('addToCart');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productTitle = document.getElementById('modalProductTitle').textContent;
            const productPrice = document.getElementById('modalProductPrice').textContent;
            
            // Here you would typically add the item to a cart array or send to a backend
            console.log('Added to cart:', { title: productTitle, price: productPrice });
            
            // Show success message
            const toast = new bootstrap.Toast(document.getElementById('successToast'));
            toast.show();
            
            // Close modal
            quickViewModal.hide();
        });
    }

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}); 
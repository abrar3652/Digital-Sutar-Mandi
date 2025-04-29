// Mock data for broker dashboard
const brokerData = {
    stats: {
        activeDeals: 12,
        totalCommissions: 45000,
        successRate: 85
    },
    activeDeals: [
        {
            id: 1,
            manufacturer: "ABC Textiles",
            buyer: "XYZ Fabrics",
            product: "Cotton Yarn",
            quantity: 5000,
            price: 150,
            status: "In Progress",
            lastUpdated: "2 hours ago"
        },
        {
            id: 2,
            manufacturer: "PQR Mills",
            buyer: "LMN Textiles",
            product: "Polyester Yarn",
            quantity: 3000,
            price: 120,
            status: "Negotiating",
            lastUpdated: "1 day ago"
        }
    ],
    recentCommissions: [
        {
            id: 1,
            dealId: "D-2024-001",
            amount: 7500,
            date: "2024-03-15",
            status: "Paid"
        },
        {
            id: 2,
            dealId: "D-2024-002",
            amount: 5000,
            date: "2024-03-14",
            status: "Pending"
        }
    ]
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    renderActiveDeals();
    renderCommissions();
    setupEventListeners();
    setupLanguageToggle();
});

// Update stats section
function updateStats() {
    document.getElementById('activeDealsCount').textContent = brokerData.stats.activeDeals;
    document.getElementById('totalCommissions').textContent = `Rs. ${brokerData.stats.totalCommissions.toLocaleString()}`;
    document.getElementById('successRate').textContent = `${brokerData.stats.successRate}%`;
}

// Render active deals
function renderActiveDeals() {
    const dealsContainer = document.getElementById('activeDeals');
    dealsContainer.innerHTML = '';

    brokerData.activeDeals.forEach(deal => {
        const dealCard = document.createElement('div');
        dealCard.className = 'col-md-6 mb-4';
        dealCard.innerHTML = `
            <div class="deal-card">
                <div class="deal-header">
                    <h3>Deal #${deal.id}</h3>
                    <span class="badge bg-${getStatusColor(deal.status)}">${deal.status}</span>
                </div>
                <div class="deal-body">
                    <h4><i class="fas fa-industry"></i> ${deal.manufacturer}</h4>
                    <h4><i class="fas fa-store"></i> ${deal.buyer}</h4>
                    <p><i class="fas fa-box"></i> ${deal.product}</p>
                    <p><i class="fas fa-balance-scale"></i> ${deal.quantity} kg</p>
                    <p><i class="fas fa-tag"></i> Rs. ${deal.price}/kg</p>
                    <div class="deal-details">
                        <p class="mb-0"><i class="fas fa-clock"></i> Last updated: ${deal.lastUpdated}</p>
                    </div>
                </div>
                <div class="deal-footer">
                    <button class="btn btn-sm btn-primary" onclick="openChat(${deal.id})">
                        <i class="fas fa-comments"></i> Chat
                    </button>
                    <button class="btn btn-sm btn-outline-primary" onclick="viewDealDetails(${deal.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                </div>
            </div>
        `;
        dealsContainer.appendChild(dealCard);
    });
}

// Render commissions table
function renderCommissions() {
    const commissionsBody = document.getElementById('commissionsBody');
    commissionsBody.innerHTML = '';

    brokerData.recentCommissions.forEach(commission => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${commission.dealId}</td>
            <td>Rs. ${commission.amount.toLocaleString()}</td>
            <td>${commission.date}</td>
            <td><span class="badge bg-${getStatusColor(commission.status)}">${commission.status}</span></td>
        `;
        commissionsBody.appendChild(row);
    });
}

// Setup event listeners
function setupEventListeners() {
    // New match form submission
    document.getElementById('newMatchForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const newDeal = {
            id: brokerData.activeDeals.length + 1,
            manufacturer: formData.get('manufacturer'),
            buyer: formData.get('buyer'),
            product: formData.get('product'),
            quantity: formData.get('quantity'),
            price: formData.get('price'),
            status: "In Progress",
            lastUpdated: "Just now"
        };
        
        brokerData.activeDeals.push(newDeal);
        brokerData.stats.activeDeals++;
        updateStats();
        renderActiveDeals();
        
        alert('New match created successfully!');
        this.reset();
        $('#newMatchModal').modal('hide');
    });

    // Chat form submission
    document.getElementById('chatForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const messageInput = document.getElementById('messageInput');
        if (messageInput.value.trim()) {
            sendMessage(messageInput.value);
            messageInput.value = '';
        }
    });
}

// Setup language toggle
function setupLanguageToggle() {
    const languageToggle = document.getElementById('languageToggle');
    let isUrdu = false;

    languageToggle.addEventListener('click', function() {
        isUrdu = !isUrdu;
        this.innerHTML = isUrdu ? 
            '<i class="fas fa-language"></i> English' : 
            '<i class="fas fa-language"></i> اردو';
        
        // Toggle RTL/LTR
        document.body.style.direction = isUrdu ? 'rtl' : 'ltr';
        document.body.style.fontFamily = isUrdu ? 
            "'Noto Nastaliq Urdu', serif" : 
            "'Poppins', sans-serif";
    });
}

// Helper functions
function getStatusColor(status) {
    switch(status.toLowerCase()) {
        case 'paid':
            return 'success';
        case 'pending':
            return 'warning';
        case 'in progress':
            return 'primary';
        case 'negotiating':
            return 'info';
        default:
            return 'secondary';
    }
}

function openChat(dealId) {
    $('#chatModal').modal('show');
    loadChatHistory(dealId);
}

function loadChatHistory(dealId) {
    const chatMessages = document.getElementById('chatMessages');
    const deal = brokerData.activeDeals.find(d => d.id === dealId);
    
    if (deal) {
        chatMessages.innerHTML = `
            <div class="message received">
                <p>Hello, I'm interested in the ${deal.product} deal.</p>
                <small class="message-time">10:30 AM</small>
            </div>
            <div class="message sent">
                <p>Great! I can help you with that. What quantity are you looking for?</p>
                <small class="message-time">10:32 AM</small>
            </div>
        `;
    }
}

function sendMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message sent';
    messageElement.innerHTML = `
        <p>${message}</p>
        <small class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small>
    `;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function viewDealDetails(dealId) {
    const deal = brokerData.activeDeals.find(d => d.id === dealId);
    if (deal) {
        const details = `
            Deal ID: ${deal.id}
            Manufacturer: ${deal.manufacturer}
            Buyer: ${deal.buyer}
            Product: ${deal.product}
            Quantity: ${deal.quantity} kg
            Price: Rs. ${deal.price}/kg
            Status: ${deal.status}
            Last Updated: ${deal.lastUpdated}
        `;
        alert(details);
    }
} 
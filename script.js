// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animations
gsap.from('.hero-section h1', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.5
});

gsap.from('.hero-section p', {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.8
});

gsap.from('.hero-section .btn', {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power3.out',
    delay: 1.1
});

// Feature Cards Animation
gsap.utils.toArray('.feature-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        delay: index * 0.2
    });
});

// Timeline Animation
gsap.utils.toArray('.timeline-item').forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        x: index % 2 === 0 ? -50 : 50,
        opacity: 0,
        delay: index * 0.3
    });
});

// Testimonial Carousel
const testimonialCarousel = new bootstrap.Carousel(document.getElementById('testimonialCarousel'), {
    interval: 5000,
    wrap: true
});

// Gallery Hover Effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('.gallery-overlay').style.opacity = '1';
    });
    
    item.addEventListener('mouseleave', function() {
        this.querySelector('.gallery-overlay').style.opacity = '0';
    });
});

// Authentication Functionality
document.addEventListener('DOMContentLoaded', function() {
    const authModal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const forgotPasswordForm = document.querySelector('#forgotPasswordModal form');

    // Toggle between login and signup forms
    const toggleForms = () => {
        loginForm.classList.toggle('d-none');
        signupForm.classList.toggle('d-none');
    };

    // Add toggle button to switch between login and signup
    const authToggleBtn = document.createElement('button');
    authToggleBtn.className = 'btn btn-link mt-3';
    authToggleBtn.textContent = 'Need an account? Sign up';
    loginForm.appendChild(authToggleBtn);

    const signupToggleBtn = document.createElement('button');
    signupToggleBtn.className = 'btn btn-link mt-3';
    signupToggleBtn.textContent = 'Already have an account? Sign in';
    signupForm.appendChild(signupToggleBtn);

    authToggleBtn.addEventListener('click', toggleForms);
    signupToggleBtn.addEventListener('click', toggleForms);

    // Form Validation and Submission
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const validatePassword = (password) => {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        return String(password)
            .match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
    };

    const showError = (input, message) => {
        const formGroup = input.closest('.mb-3');
        const errorDiv = formGroup.querySelector('.invalid-feedback') || document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        input.classList.add('is-invalid');
        if (!formGroup.querySelector('.invalid-feedback')) {
            formGroup.appendChild(errorDiv);
        }
    };

    const clearErrors = (form) => {
        form.querySelectorAll('.is-invalid').forEach(input => input.classList.remove('is-invalid'));
        form.querySelectorAll('.invalid-feedback').forEach(feedback => feedback.remove());
    };

    const showSuccess = (form, message) => {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success mt-3';
        alert.textContent = message;
        form.appendChild(alert);
        setTimeout(() => alert.remove(), 3000);
    };

    // Handle Login Form Submission
    loginForm.querySelector('form').addEventListener('submit', async function(e) {
        e.preventDefault();
        clearErrors(this);

        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        let isValid = true;

        if (!validateEmail(email)) {
            showError(this.querySelector('input[type="email"]'), 'Please enter a valid email address');
            isValid = false;
        }

        if (!password) {
            showError(this.querySelector('input[type="password"]'), 'Password is required');
            isValid = false;
        }

        if (isValid) {
            try {
                // Here you would typically make an API call to your backend
                // For demo purposes, we'll simulate a successful login
                const response = await simulateApiCall({ email, password }, 'login');
                if (response.success) {
                    showSuccess(this, 'Login successful! Redirecting...');
                    localStorage.setItem('user', JSON.stringify({ email }));
                    setTimeout(() => {
                        window.location.href = '/dashboard.html'; // Redirect to dashboard
                    }, 1500);
                }
            } catch (error) {
                showError(this.querySelector('input[type="email"]'), error.message);
            }
        }
    });

    // Handle Signup Form Submission
    signupForm.querySelector('form').addEventListener('submit', async function(e) {
        e.preventDefault();
        clearErrors(this);

        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
        const terms = this.querySelector('#terms').checked;
        let isValid = true;

        if (!name.trim()) {
            showError(this.querySelector('input[type="text"]'), 'Name is required');
            isValid = false;
        }

        if (!validateEmail(email)) {
            showError(this.querySelector('input[type="email"]'), 'Please enter a valid email address');
            isValid = false;
        }

        if (!validatePassword(password)) {
            showError(this.querySelector('input[type="password"]'), 'Password must be at least 8 characters long and contain uppercase, lowercase, and numbers');
            isValid = false;
        }

        if (password !== confirmPassword) {
            showError(this.querySelectorAll('input[type="password"]')[1], 'Passwords do not match');
            isValid = false;
        }

        if (!terms) {
            showError(this.querySelector('#terms'), 'You must agree to the Terms & Conditions');
            isValid = false;
        }

        if (isValid) {
            try {
                // Here you would typically make an API call to your backend
                const response = await simulateApiCall({ name, email, password }, 'signup');
                if (response.success) {
                    showSuccess(this, 'Account created successfully! Please check your email for verification.');
                    setTimeout(() => {
                        toggleForms(); // Switch back to login form
                    }, 2000);
                }
            } catch (error) {
                showError(this.querySelector('input[type="email"]'), error.message);
            }
        }
    });

    // Handle Forgot Password Form Submission
    forgotPasswordForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        clearErrors(this);

        const email = this.querySelector('input[type="email"]').value;
        let isValid = true;

        if (!validateEmail(email)) {
            showError(this.querySelector('input[type="email"]'), 'Please enter a valid email address');
            isValid = false;
        }

        if (isValid) {
            try {
                const response = await simulateApiCall({ email }, 'forgot-password');
                if (response.success) {
                    showSuccess(this, 'Password reset instructions have been sent to your email.');
                    setTimeout(() => {
                        const forgotPasswordModal = bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal'));
                        forgotPasswordModal.hide();
                    }, 2000);
                }
            } catch (error) {
                showError(this.querySelector('input[type="email"]'), error.message);
            }
        }
    });
});

// Simulate API Calls (Replace with actual API calls)
async function simulateApiCall(data, endpoint) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate API responses
    switch (endpoint) {
        case 'login':
            if (data.email === 'demo@example.com' && data.password === 'Demo123!') {
                return { success: true };
            }
            throw new Error('Invalid email or password');

        case 'signup':
            if (data.email === 'demo@example.com') {
                throw new Error('Email already exists');
            }
            return { success: true };

        case 'forgot-password':
            return { success: true };

        default:
            throw new Error('Invalid endpoint');
    }
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Price Ticker Animation
const tickerContent = document.querySelector('.ticker-content');
if (tickerContent) {
    const items = tickerContent.querySelectorAll('.ticker-item');
    items.forEach(item => {
        tickerContent.appendChild(item.cloneNode(true));
    });
}

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-fadeInUp');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Password visibility toggle
function togglePasswordVisibility(button) {
    const input = button.parentElement.querySelector('input');
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    }
} 
// Authentication Functionality
document.addEventListener('DOMContentLoaded', function() {
    const authModal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const forgotPasswordForm = document.querySelector('#forgotPasswordModal form');
    const authModalTitle = document.getElementById('authModalLabel');

    // Store registered users in localStorage
    const getRegisteredUsers = () => {
        return JSON.parse(localStorage.getItem('registeredUsers')) || [];
    };

    const addRegisteredUser = (user) => {
        const users = getRegisteredUsers();
        users.push(user);
        localStorage.setItem('registeredUsers', JSON.stringify(users));
    };

    // Clear forms when modal is opened
    authModal.addEventListener('show.bs.modal', function() {
        loginForm.querySelector('form').reset();
        signupForm.querySelector('form').reset();
        clearErrors(loginForm.querySelector('form'));
        clearErrors(signupForm.querySelector('form'));
    });

    // Toggle between login and signup forms
    const toggleForms = () => {
        loginForm.classList.toggle('d-none');
        signupForm.classList.toggle('d-none');
        authModalTitle.textContent = loginForm.classList.contains('d-none') ? 'Sign Up' : 'Sign In';
    };

    // Add toggle buttons
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
        // Updated password validation to include special characters
        return String(password)
            .match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    };

    const showError = (input, message) => {
        const formGroup = input.closest('.mb-3');
        const errorDiv = formGroup.querySelector('.invalid-feedback') || document.createElement('div');
        errorDiv.className = 'invalid-feedback d-block';
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

    const setLoading = (button, isLoading) => {
        const spinner = button.querySelector('.spinner-border');
        if (isLoading) {
            button.disabled = true;
            spinner.classList.remove('d-none');
        } else {
            button.disabled = false;
            spinner.classList.add('d-none');
        }
    };

    // Handle Login Form Submission
    loginForm.querySelector('form').addEventListener('submit', async function(e) {
        e.preventDefault();
        clearErrors(this);

        const submitBtn = this.querySelector('button[type="submit"]');
        const email = this.querySelector('#loginEmail').value;
        const password = this.querySelector('#loginPassword').value;
        const rememberMe = this.querySelector('#rememberMe').checked;
        let isValid = true;

        if (!validateEmail(email)) {
            showError(this.querySelector('#loginEmail'), 'Please enter a valid email address');
            isValid = false;
        }

        if (!password) {
            showError(this.querySelector('#loginPassword'), 'Password is required');
            isValid = false;
        }

        if (isValid) {
            setLoading(submitBtn, true);

            try {
                const users = getRegisteredUsers();
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    showSuccess(this, 'Login successful! Redirecting...');
                    if (rememberMe) {
                        localStorage.setItem('currentUser', JSON.stringify({ email: user.email, name: user.name }));
                    }
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1500);
                } else {
                    showError(this.querySelector('#loginEmail'), 'Invalid email or password');
                }
            } catch (error) {
                showError(this.querySelector('#loginEmail'), error.message);
            } finally {
                setLoading(submitBtn, false);
            }
        }
    });

    // Handle Signup Form Submission
    signupForm.querySelector('form').addEventListener('submit', async function(e) {
        e.preventDefault();
        clearErrors(this);

        const submitBtn = this.querySelector('button[type="submit"]');
        const name = this.querySelector('#signupName').value;
        const email = this.querySelector('#signupEmail').value;
        const password = this.querySelector('#signupPassword').value;
        const confirmPassword = this.querySelector('#confirmPassword').value;
        const terms = this.querySelector('#terms').checked;
        let isValid = true;

        if (!name.trim()) {
            showError(this.querySelector('#signupName'), 'Name is required');
            isValid = false;
        }

        if (!validateEmail(email)) {
            showError(this.querySelector('#signupEmail'), 'Please enter a valid email address');
            isValid = false;
        }

        if (!validatePassword(password)) {
            showError(this.querySelector('#signupPassword'), 'Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters');
            isValid = false;
        }

        if (password !== confirmPassword) {
            showError(this.querySelector('#confirmPassword'), 'Passwords do not match');
            isValid = false;
        }

        if (!terms) {
            showError(this.querySelector('#terms'), 'You must agree to the Terms & Conditions');
            isValid = false;
        }

        if (isValid) {
            setLoading(submitBtn, true);

            try {
                const users = getRegisteredUsers();
                if (users.some(user => user.email === email)) {
                    showError(this.querySelector('#signupEmail'), 'Email already exists');
                } else {
                    addRegisteredUser({ name, email, password });
                    showSuccess(this, 'Account created successfully! Please sign in.');
                    setTimeout(() => {
                        toggleForms();
                        this.reset();
                    }, 2000);
                }
            } catch (error) {
                showError(this.querySelector('#signupEmail'), error.message);
            } finally {
                setLoading(submitBtn, false);
            }
        }
    });

    // Handle Forgot Password Form Submission
    forgotPasswordForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        clearErrors(this);

        const submitBtn = this.querySelector('button[type="submit"]');
        const email = this.querySelector('#resetEmail').value;
        let isValid = true;

        if (!validateEmail(email)) {
            showError(this.querySelector('#resetEmail'), 'Please enter a valid email address');
            isValid = false;
        }

        if (isValid) {
            setLoading(submitBtn, true);

            try {
                const users = getRegisteredUsers();
                const user = users.find(u => u.email === email);

                if (user) {
                    // Generate reset token
                    const resetToken = generateResetToken();
                    const resetExpires = new Date(Date.now() + 3600000); // 1 hour from now
                    
                    // Store reset token in localStorage (in a real app, this would be in a database)
                    localStorage.setItem(`reset_${email}`, JSON.stringify({
                        token: resetToken,
                        expires: resetExpires
                    }));

                    // Send reset email (simulated)
                    await sendResetEmail(email, resetToken);
                    
                    showSuccess(this, 'Password reset instructions have been sent to your email.');
                    setTimeout(() => {
                        const forgotPasswordModal = bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal'));
                        forgotPasswordModal.hide();
                        this.reset();
                    }, 2000);
                } else {
                    showError(this.querySelector('#resetEmail'), 'No account found with this email address');
                }
            } catch (error) {
                showError(this.querySelector('#resetEmail'), error.message);
            } finally {
                setLoading(submitBtn, false);
            }
        }
    });
});

// Generate a random reset token
function generateResetToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Simulate sending reset email
async function sendResetEmail(email, token) {
    // Store the email with the token for verification
    localStorage.setItem(`reset_${token}`, JSON.stringify({
        email: email,
        expires: new Date(Date.now() + 3600000) // 1 hour from now
    }));
    
    // Open reset password page in new tab
    const resetLink = `reset-password.html?token=${token}`;
    window.open(resetLink, '_blank');
} 
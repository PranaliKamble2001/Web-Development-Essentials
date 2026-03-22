const registrationForm = document.querySelector('#registrationForm');
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
const strengthBar = document.querySelector('#strengthBar');
const strengthText = document.querySelector('#strengthText');

// 1. Existing Toggle Logic (Enhanced)
togglePassword.addEventListener('click', function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.textContent = type === 'password' ? 'Show' : 'Hide';
});

// 2. Real-time Password Strength Logic
password.addEventListener('input', () => {
    const val = password.value;
    let score = 0;

    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const colors = [
        { width: '25%', color: '#ef4444', text: 'Weak (Add numbers/symbols)' },
        { width: '50%', color: '#f59e0b', text: 'Medium (Try uppercase)' },
        { width: '75%', color: '#6366f1', text: 'Strong password' },
        { width: '100%', color: '#10b981', text: 'Enterprise Secure' }
    ];

    if (val.length > 0) {
        const result = colors[score - 1] || colors[0];
        strengthBar.style.width = result.width;
        strengthBar.style.backgroundColor = result.color;
        strengthText.innerText = result.text;
        strengthText.style.color = result.color;
    } else {
        strengthBar.style.width = '0%';
        strengthText.innerText = 'Enter a secure password';
        strengthText.style.color = '#94a3b8';
    }
});

// 3. Professional Submission Simulation
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.querySelector('#submitBtn');
    
    // UI Loading State
    btn.textContent = 'Verifying...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    setTimeout(() => {
        btn.textContent = 'Account Created ✓';
        btn.style.background = '#10b981';
        alert('Registration Successful! Redirecting to Secure Dashboard...');
    }, 1500);
});

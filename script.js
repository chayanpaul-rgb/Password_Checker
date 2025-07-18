const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strengthBar');
const feedback = document.getElementById('feedback');
const strengthLabel = document.getElementById('strengthLabel');
const togglePassword = document.getElementById('togglePassword');

const checkLower = document.getElementById('check-lower');
const checkUpper = document.getElementById('check-upper');
const checkNumber = document.getElementById('check-number');
const checkSymbol = document.getElementById('check-symbol');
const checkLength = document.getElementById('check-length');

if (togglePassword) {
    togglePassword.addEventListener('click', function () {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        togglePassword.textContent = isPassword ? '🙈' : '👁️';
        togglePassword.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });
}

passwordInput.addEventListener('input', function() {
    const password = passwordInput.value;
    const strength = calculateStrength(password);
    updateStrengthBar(strength);
    updateStrengthLabel(strength, password);
    updateFeedback(strength, password);
    updateChecklist(password);
});

function calculateStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
}

function updateStrengthBar(strength) {
    const percent = (strength / 5) * 100;
    strengthBar.style.width = percent + '%';
    if (strength <= 2) {
        strengthBar.style.background = '#ff4d4d'; // Weak - Red
    } else if (strength === 3) {
        strengthBar.style.background = '#ffb84d'; // Medium - Orange
    } else if (strength === 4) {
        strengthBar.style.background = '#ffe44d'; // Good - Yellow
    } else if (strength === 5) {
        strengthBar.style.background = '#4dff88'; // Strong - Green
    }
}

function updateStrengthLabel(strength, password) {
    if (!password) {
        strengthLabel.textContent = '';
        return;
    }
    if (strength <= 2) {
        strengthLabel.textContent = 'Weak password';
        strengthLabel.style.color = '#ff4d4d';
    } else if (strength === 3) {
        strengthLabel.textContent = 'Medium password';
        strengthLabel.style.color = '#ffb84d';
    } else if (strength === 4) {
        strengthLabel.textContent = 'Good password';
        strengthLabel.style.color = '#ffe44d';
    } else if (strength === 5) {
        strengthLabel.textContent = 'Strong password';
        strengthLabel.style.color = '#4dff88';
    }
}

function updateFeedback(strength, password) {
    if (!password) {
        feedback.textContent = '';
        return;
    }
    if (strength <= 2) {
        feedback.textContent = 'Try adding uppercase letters, numbers, and symbols.';
    } else if (strength === 3) {
        feedback.textContent = 'Add more variety (uppercase, numbers, symbols) for a stronger password.';
    } else if (strength === 4) {
        feedback.textContent = 'Consider making it longer or adding more symbols.';
    } else if (strength === 5) {
        feedback.textContent = 'Great job! Your password is strong.';
    }
}

function updateChecklist(password) {
    if (/[a-z]/.test(password)) {
        checkLower.classList.add('checked');
    } else {
        checkLower.classList.remove('checked');
    }
    if (/[A-Z]/.test(password)) {
        checkUpper.classList.add('checked');
    } else {
        checkUpper.classList.remove('checked');
    }
    if (/[0-9]/.test(password)) {
        checkNumber.classList.add('checked');
    } else {
        checkNumber.classList.remove('checked');
    }
    if (/[^A-Za-z0-9]/.test(password)) {
        checkSymbol.classList.add('checked');
    } else {
        checkSymbol.classList.remove('checked');
    }
    if (password.length >= 8) {
        checkLength.classList.add('checked');
    } else {
        checkLength.classList.remove('checked');
    }
} 
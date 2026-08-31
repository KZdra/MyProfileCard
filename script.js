// ===================================================
// THEME CONTROLLER (Light & Dark Mode)
// ===================================================

const htmlEl = document.documentElement;
const themeToggleBtn = document.getElementById('themeToggle');
const copyEmailBtn = document.getElementById('copyEmailBtn');
const toastEl = document.getElementById('toast');

// Check saved theme from localStorage or system preference
function initTheme() {
    const savedTheme = localStorage.getItem('profile_card_theme');
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }
}

function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('profile_card_theme', theme);
}

// Toggle Theme Handler
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Listen to OS theme changes if user hasn't explicitly set one in this session
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('profile_card_theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// ===================================================
// COPY EMAIL INTERACTION
// ===================================================

let toastTimeout = null;

function showToast(message) {
    if (toastEl) {
        toastEl.textContent = message;
        toastEl.classList.add('show');

        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        toastTimeout = setTimeout(() => {
            toastEl.classList.remove('show');
        }, 3000);
    }
}

if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
        const email = copyEmailBtn.getAttribute('data-email') || 'indra.hardika@example.com';
        
        try {
            await navigator.clipboard.writeText(email);
            showToast('Email berhasil disalin ke clipboard!');
        } catch (err) {
            // Fallback for clipboard
            const textarea = document.createElement('textarea');
            textarea.value = email;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showToast('Email berhasil disalin ke clipboard!');
        }
    });
}

// ===================================================
// INITIALIZE
// ===================================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
});

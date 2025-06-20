// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Fade out loading screen after 5 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1500);
    }, 5000);
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.add(currentTheme + '-mode');
updateToggleButton(currentTheme);

themeToggle.addEventListener('click', () => {
    // Animate theme transition
    body.style.transition = 'background 0.8s cubic-bezier(0.65, 0.05, 0.36, 1), color 0.8s ease';
    
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
    
    updateToggleButton();
    
    // Reset transition after animation completes
    setTimeout(() => {
        body.style.transition = '';
    }, 800);
});

function updateToggleButton() {
    const icon = themeToggle.querySelector('.theme-icon');
    const text = themeToggle.querySelector('span');
    
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        text.textContent = 'Light Mode';
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        text.textContent = 'Dark Mode';
    }
}

// Typewriter Effect
const typewriterText = document.getElementById('typewriter');
const phrases = [
    "Currently listening to my playlist",
    "Favorite song of the week",
    "Music keeps me creative",
    "Create by Nerusen",
    "Thank you:)",
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeWriter() {
    isEnd = false;
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isEnd = true;
        isDeleting = true;
        setTimeout(typeWriter, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeWriter, 500);
    } else {
        const speed = isDeleting ? 100 : 150;
        setTimeout(typeWriter, isEnd ? speed * 2 : speed);
    }
}

// Start typewriter effect
setTimeout(typeWriter, 6000);

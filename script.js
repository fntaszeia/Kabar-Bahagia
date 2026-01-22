// Centralized Website Initialization
// This ensures all initialization happens in correct order, regardless of when scripts load

function initializeWebsite() {
    // 1. Populate content first
    populateContent();

    // 2. Hide loading screen after content is ready
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 100);
    }

    // 3. Initialize scroll animations
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => {
        el.style.willChange = 'opacity, transform';
        observer.observe(el);
    });

    // 4. Initialize greetings
    if (weddingConfig.greetings && weddingConfig.greetings.enabled) {
        loadGreetingsFromAPI();
    }

    // 5. Initialize music
    if (weddingConfig.music && weddingConfig.music.enabled) {
        initializeMusic();
    }

    // 6. Initialize skeleton loaders
    const skeletonImages = document.querySelectorAll('.skeleton-loader img');
    skeletonImages.forEach(img => {
        if (img.complete) {
            img.parentElement.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.parentElement.classList.add('loaded');
            });
            img.addEventListener('error', () => {
                img.parentElement.classList.add('loaded');
                console.warn('Image failed to load:', img.src);
            });
        }
    });
}

// Run initialization when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
    // DOM already loaded (scripts at end of body), run immediately
    initializeWebsite();
}

// SVG Icons for events
const eventSVGIcons = {
    ceremony: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
            <linearGradient id="ceremonyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#2d6a4f;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#1b4332;stop-opacity:1" />
            </linearGradient>
        </defs>
        <!-- Mosque/Church dome -->
        <ellipse cx="50" cy="45" rx="28" ry="20" fill="url(#ceremonyGrad)" opacity="0.9"/>
        <rect x="22" y="45" width="56" height="35" fill="url(#ceremonyGrad)"/>
        <!-- Central tower -->
        <rect x="42" y="20" width="16" height="25" fill="#2d6a4f"/>
        <polygon points="50,10 42,20 58,20" fill="#52796f"/>
        <!-- Windows -->
        <rect x="30" y="55" width="8" height="12" fill="#74c69d" opacity="0.7"/>
        <rect x="46" y="55" width="8" height="12" fill="#74c69d" opacity="0.7"/>
        <rect x="62" y="55" width="8" height="12" fill="#74c69d" opacity="0.7"/>
        <!-- Door -->
        <rect x="43" y="65" width="14" height="15" rx="7" fill="#1b4332"/>
        <!-- Decorative elements -->
        <circle cx="50" cy="45" r="3" fill="#74c69d"/>
    </svg>`,

    reception: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
            <linearGradient id="receptionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#52796f;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#2d6a4f;stop-opacity:1" />
            </linearGradient>
        </defs>
        <!-- Champagne glasses -->
        <g opacity="0.95">
            <!-- Left glass -->
            <path d="M30,35 L35,55 L35,70 L30,70 L30,55 Z" fill="url(#receptionGrad)" stroke="#1b4332" stroke-width="1.5"/>
            <ellipse cx="32.5" cy="35" rx="5" ry="2" fill="none" stroke="#1b4332" stroke-width="1.5"/>
            <rect x="27" y="70" width="11" height="3" rx="1" fill="#2d6a4f"/>
            <!-- Bubbles in left glass -->
            <circle cx="31" cy="45" r="1.5" fill="#74c69d" opacity="0.6"/>
            <circle cx="33" cy="50" r="1.2" fill="#74c69d" opacity="0.6"/>
            <circle cx="32" cy="55" r="1" fill="#74c69d" opacity="0.6"/>

            <!-- Right glass -->
            <path d="M65,35 L70,55 L70,70 L65,70 L65,55 Z" fill="url(#receptionGrad)" stroke="#1b4332" stroke-width="1.5"/>
            <ellipse cx="67.5" cy="35" rx="5" ry="2" fill="none" stroke="#1b4332" stroke-width="1.5"/>
            <rect x="62" y="70" width="11" height="3" rx="1" fill="#2d6a4f"/>
            <!-- Bubbles in right glass -->
            <circle cx="66" cy="45" r="1.5" fill="#74c69d" opacity="0.6"/>
            <circle cx="68" cy="50" r="1.2" fill="#74c69d" opacity="0.6"/>
            <circle cx="67" cy="55" r="1" fill="#74c69d" opacity="0.6"/>

            <!-- Clinking sparkles -->
            <circle cx="50" cy="28" r="2" fill="#ffd700" opacity="0.8"/>
            <path d="M50,22 L51,26 L50,30 L49,26 Z" fill="#ffd700" opacity="0.7"/>
            <path d="M45,25 L49,26 L53,25 L49,24 Z" fill="#ffd700" opacity="0.7"/>

            <!-- Confetti -->
            <rect x="40" y="15" width="2" height="4" fill="#74c69d" opacity="0.6" transform="rotate(20 41 17)"/>
            <rect x="58" y="18" width="2" height="4" fill="#52796f" opacity="0.6" transform="rotate(-15 59 20)"/>
            <circle cx="45" cy="12" r="1.5" fill="#2d6a4f" opacity="0.5"/>
            <circle cx="55" cy="14" r="1.5" fill="#74c69d" opacity="0.5"/>
        </g>
    </svg>`
};

// Helper function to update event icon (emoji, image, or SVG)
function updateEventIcon(iconElement, eventConfig) {
    // Check if iconImage is provided and not empty
    if (eventConfig.iconImage && eventConfig.iconImage.trim() !== '') {
        // Use image icon
        iconElement.innerHTML = `<img src="${eventConfig.iconImage}" alt="${eventConfig.name} icon" class="event-icon-image">`;
    } else if (eventConfig.icon === '📍' || eventConfig.icon === '💒') {
        // Use SVG icon for ceremony
        iconElement.innerHTML = eventSVGIcons.ceremony;
    } else if (eventConfig.icon === '🎉') {
        // Use SVG icon for reception
        iconElement.innerHTML = eventSVGIcons.reception;
    } else {
        // Use emoji icon as fallback
        iconElement.textContent = eventConfig.icon;
    }
}

// Populate content from config.js
function populateContent() {
    if (typeof weddingConfig === 'undefined') {
        console.error('Wedding config not loaded!');
        return;
    }

    const config = weddingConfig;

    // Update page title
    const coupleNames = `${config.couple.groomShortName} & ${config.couple.brideShortName}`;
    document.title = `Wedding Invitation - ${coupleNames}`;

    // Update Open Graph meta tags for social media sharing
    updateMetaTags(coupleNames, config.wedding.date);

    // Update hero section
    document.querySelector('.couple-names').textContent =
        `${config.couple.groomShortName} & ${config.couple.brideShortName}`;
    document.querySelector('.wedding-date').textContent = config.wedding.date;

    // Update invitation section
    document.querySelector('.invitation .section-title').textContent = config.text.heroSubtitle;
    document.querySelector('.invitation-text').textContent = config.text.invitationMessage;

    // Update Quran verse section
    if (config.quranVerse && config.quranVerse.enabled) {
        document.querySelector('.verse-arabic').textContent = config.quranVerse.arabic;
        document.querySelector('.verse-translation').textContent = `"${config.quranVerse.translation}"`;
        document.querySelector('.verse-reference').textContent = `${config.quranVerse.surah} : ${config.quranVerse.ayah}`;
    } else {
        // Hide the section if disabled
        const quranSection = document.querySelector('.quran-verse');
        if (quranSection) {
            quranSection.style.display = 'none';
        }
    }

    // Update couple names and parents
    const photoCards = document.querySelectorAll('.photo-card');
    photoCards[0].querySelector('h3').textContent = config.couple.groomName;
    photoCards[0].querySelector('p').textContent = `Putra dari ${config.couple.groomParents}`;
    photoCards[1].querySelector('h3').textContent = config.couple.brideName;
    photoCards[1].querySelector('p').textContent = `Putri dari ${config.couple.brideParents}`;

    // Update event details
    const eventCards = document.querySelectorAll('.event-card');

    // Ceremony
    updateEventIcon(eventCards[0].querySelector('.event-icon'), config.events.ceremony);
    eventCards[0].querySelector('h3').textContent = config.events.ceremony.name;
    eventCards[0].querySelector('.event-time').textContent = config.events.ceremony.time;
    eventCards[0].querySelector('.event-location').textContent = config.events.ceremony.venue;
    eventCards[0].querySelector('.event-address').textContent = config.events.ceremony.address;

    // Reception
    updateEventIcon(eventCards[1].querySelector('.event-icon'), config.events.reception);
    eventCards[1].querySelector('h3').textContent = config.events.reception.name;
    eventCards[1].querySelector('.event-time').textContent = config.events.reception.time;
    eventCards[1].querySelector('.event-location').textContent = config.events.reception.venue;
    eventCards[1].querySelector('.event-address').textContent = config.events.reception.address;

    // Update countdown title
    document.querySelector('.countdown .section-title').textContent = config.text.countdownTitle;

    // Update gallery title
    document.querySelector('.gallery .section-title').textContent = config.text.galleryTitle;

    // Update Greetings title
    if (config.greetings && config.greetings.enabled) {
        document.querySelector('.greetings .section-title').textContent = config.greetings.title;
        document.querySelector('.greeting-form button').textContent = config.greetings.submitButtonText;
    }

    // Update footer
    document.querySelector('.footer-text').textContent =
        `${config.text.footerMessage}, ${config.couple.groomShortName} & ${config.couple.brideShortName}`;
    document.querySelector('.footer-hashtag').textContent = config.couple.hashtag;

    // Apply color theme
    if (config.colors) {
        applyColorTheme(config.colors);
    }

    // Apply font theme
    if (config.fonts) {
        applyFontTheme(config.fonts);
    }

    // Apply custom ornament image if configured
    if (config.ornament && config.ornament.customImage && config.ornament.customImage.trim() !== '') {
        applyCustomOrnament(config.ornament.customImage);
    }
}

// Apply color theme from config
function applyColorTheme(colors) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', colors.primary);
    root.style.setProperty('--secondary-color', colors.secondary);
    root.style.setProperty('--text-dark', colors.textDark);
    root.style.setProperty('--text-light', colors.textLight);
    root.style.setProperty('--bg-light', colors.background);
    root.style.setProperty('--white', colors.white);
    root.style.setProperty('--accent', colors.accent);
}

// Apply font theme from config
function applyFontTheme(fonts) {
    const root = document.documentElement;
    root.style.setProperty('--font-decorative', `'${fonts.decorative}', cursive`);
    root.style.setProperty('--font-serif', `'${fonts.serif}', serif`);
    root.style.setProperty('--font-sans-serif', `'${fonts.sansSerif}', sans-serif`);
    root.style.setProperty('--font-arabic', `'${fonts.arabic}', 'Traditional Arabic', serif`);
}

// Apply custom ornament image
function applyCustomOrnament(imagePath) {
    const ornaments = document.querySelectorAll('.ornament');
    ornaments.forEach(ornament => {
        ornament.style.backgroundImage = `url('${imagePath}')`;
    });
}

// Update social media meta tags
function updateMetaTags(coupleNames, weddingDate) {
    const baseUrl = window.location.origin;
    const title = `Wedding Invitation - ${coupleNames}`;
    const description = `You are cordially invited to celebrate our wedding on ${weddingDate}. Join us on our special day!`;
    const imageUrl = `${baseUrl}/images/hero-bg.jpg`;

    // Update or create meta tags
    setMetaTag('og:title', title);
    setMetaTag('og:description', description);
    setMetaTag('og:image', imageUrl);
    setMetaTag('og:url', baseUrl);
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', imageUrl);
}

// Helper to set meta tag value
function setMetaTag(property, content) {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
        tag = document.querySelector(`meta[name="${property}"]`);
    }
    if (tag) {
        tag.setAttribute('content', content);
    } else {
        // Create new meta tag if it doesn't exist
        const newTag = document.createElement('meta');
        if (property.startsWith('og:') || property === 'twitter:card') {
            newTag.setAttribute('property', property);
        } else {
            newTag.setAttribute('name', property);
        }
        newTag.setAttribute('content', content);
        document.head.appendChild(newTag);
    }
}

// Countdown Timer
function initCountdown() {
    // Get wedding date from config
    const weddingDate = new Date(weddingConfig.wedding.countdownDate).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.getElementById('countdown-timer').innerHTML = '<p style="font-size: 2rem;">Hari Pernikahan Telah Tiba! 🎉</p>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Initialize countdown on page load
initCountdown();

// Optimized Scroll Animation Observer with unobserve
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Unobserve after animating to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Note: Scroll animation initialization moved to initializeWebsite() function

// Greetings System
let greetings = [];

// Load greetings from localStorage on page load
function loadGreetings() {
    const storageKey = weddingConfig.greetings.storageKey || 'wedding_greetings';
    const stored = localStorage.getItem(storageKey);
    if (stored) {
        try {
            greetings = JSON.parse(stored);
            displayGreetings();
        } catch (e) {
            console.error('Error loading greetings:', e);
            greetings = [];
        }
    }
}

// Save greetings to localStorage
function saveGreetings() {
    const storageKey = weddingConfig.greetings.storageKey || 'wedding_greetings';
    localStorage.setItem(storageKey, JSON.stringify(greetings));
}

// Display all greetings from API
function displayGreetings() {
    const greetingsList = document.getElementById('greetings-list');

    if (greetings.length === 0) {
        greetingsList.innerHTML = '<p class="no-greetings">Belum ada ucapan. Jadilah yang pertama! 💝</p>';
        return;
    }

    // Greetings are already sorted from API (newest first)
    greetingsList.innerHTML = greetings.map(greeting => `
        <div class="greeting-card">
            <div class="greeting-header">
                <div class="greeting-avatar">${greeting.name.charAt(0).toUpperCase()}</div>
                <div class="greeting-info">
                    <h4 class="greeting-name">${escapeHtml(greeting.name)}</h4>
                    <span class="greeting-time">${formatTimeAgo(greeting.timestamp)}</span>
                </div>
            </div>
            <p class="greeting-message">${escapeHtml(greeting.message)}</p>
        </div>
    `).join('');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Format timestamp to relative time
function formatTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} hari yang lalu`;
    if (hours > 0) return `${hours} jam yang lalu`;
    if (minutes > 0) return `${minutes} menit yang lalu`;
    return 'Baru saja';
}

// Greeting form submission - Submit to API
document.getElementById('greeting-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('guest-name').value.trim();
    const message = document.getElementById('guest-message').value.trim();
    const submitButton = this.querySelector('button[type="submit"]');

    if (!name || !message) {
        alert('Mohon isi nama dan ucapan Anda');
        return;
    }

    // Disable submit button to prevent double submission
    submitButton.disabled = true;
    submitButton.textContent = 'Mengirim...';

    try {
        // Submit to API
        const response = await fetch(`${API_BASE_URL}/api/greetings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, message })
        });

        const data = await response.json();

        if (data.success) {
            // Reload greetings from API to show the new one
            await loadGreetingsFromAPI();

            // Show success popup
            showGreetingPopup();

            // Reset form
            this.reset();
        } else {
            alert('Gagal mengirim ucapan. Silakan coba lagi.');
            console.error('Error submitting greeting:', data.error);
        }
    } catch (error) {
        console.error('Error submitting greeting:', error);
        alert('Gagal mengirim ucapan. Silakan coba lagi.');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = weddingConfig.greetings.submitButtonText || 'Kirim Ucapan';
    }
});

// Show greeting popup
function showGreetingPopup() {
    const popup = document.getElementById('greeting-popup');
    popup.classList.add('show');
}

// Close greeting popup
function closeGreetingPopup() {
    const popup = document.getElementById('greeting-popup');
    popup.classList.remove('show');
}

// Close popup when clicking outside
document.getElementById('greeting-popup').addEventListener('click', function(e) {
    if (e.target === this) {
        closeGreetingPopup();
    }
});

// API Configuration for Cloudflare Workers
const API_BASE_URL = 'https://kabar-bahagia-api.fntasze.workers.dev';

// Load greetings from API
async function loadGreetingsFromAPI() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/greetings`);
        const data = await response.json();

        if (data.success) {
            greetings = data.greetings || [];
            displayGreetings();
        } else {
            console.error('Failed to load greetings:', data.error);
            // Fallback to localStorage if API fails
            loadGreetingsFromLocalStorage();
        }
    } catch (error) {
        console.error('Error fetching greetings:', error);
        // Fallback to localStorage if API fails
        loadGreetingsFromLocalStorage();
    }
}

// Fallback: Load from localStorage
function loadGreetingsFromLocalStorage() {
    const storageKey = weddingConfig.greetings.storageKey || 'wedding_greetings';
    const stored = localStorage.getItem(storageKey);
    if (stored) {
        try {
            greetings = JSON.parse(stored);
            displayGreetings();
        } catch (e) {
            console.error('Error loading greetings from localStorage:', e);
            greetings = [];
            displayGreetings();
        }
    } else {
        displayGreetings();
    }
}

// Note: Greetings initialization moved to initializeWebsite() function

// Map Function
function openMap() {
    // Open the map URL from config
    window.open(weddingConfig.map.url, '_blank');
}

// Background Music Toggle
let isPlaying = false;
let audio = null;
let audioInitialized = false;

// Note: Music initialization moved to initializeWebsite() function

function initializeMusic() {
    if (audioInitialized) return;
    audioInitialized = true;

    // Create audio element
    audio = new Audio(weddingConfig.music.file);
    audio.loop = true;
    audio.volume = weddingConfig.music.volume;

    // Try autoplay if enabled in config
    if (weddingConfig.music.autoplay) {
        // Attempt to play immediately
        tryAutoplay();
    }

    // Setup interaction listeners for browsers that block autoplay
    setupInteractionListeners();
}

function tryAutoplay() {
    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Autoplay started successfully
            isPlaying = true;
            document.getElementById('music-icon').textContent = '🔊';
            console.log('Music started successfully!');
        }).catch(() => {
            // Autoplay was prevented by browser
            console.log('Autoplay prevented. Music will start on first interaction.');
            isPlaying = false;
            document.getElementById('music-icon').textContent = '🔇';
            showMusicHint();
        });
    }
}

function setupInteractionListeners() {
    // Try to play on first user interaction
    const enableAudioOnInteraction = () => {
        if (!isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                document.getElementById('music-icon').textContent = '🔊';
                removeMusicHint();
                console.log('Music started after user interaction!');
                // Remove listeners after successful play
                removeInteractionListeners();
            }).catch(err => {
                console.log('Could not autoplay:', err);
            });
        }
    };

    // Store reference for later removal
    window.enableAudioOnInteraction = enableAudioOnInteraction;

    // Add listeners for various user interactions (more comprehensive)
    document.addEventListener('click', enableAudioOnInteraction, { once: false, capture: true });
    document.addEventListener('touchstart', enableAudioOnInteraction, { once: false, capture: true });
    document.addEventListener('touchend', enableAudioOnInteraction, { once: false, capture: true });
    document.addEventListener('scroll', enableAudioOnInteraction, { once: false, passive: true });
    document.addEventListener('wheel', enableAudioOnInteraction, { once: false, passive: true });
    document.addEventListener('keydown', enableAudioOnInteraction, { once: false });
    document.addEventListener('mousemove', enableAudioOnInteraction, { once: false, passive: true });
    document.addEventListener('touchmove', enableAudioOnInteraction, { once: false, passive: true });
}

function removeInteractionListeners() {
    if (window.enableAudioOnInteraction) {
        document.removeEventListener('click', window.enableAudioOnInteraction, { capture: true });
        document.removeEventListener('touchstart', window.enableAudioOnInteraction, { capture: true });
        document.removeEventListener('touchend', window.enableAudioOnInteraction, { capture: true });
        document.removeEventListener('scroll', window.enableAudioOnInteraction);
        document.removeEventListener('wheel', window.enableAudioOnInteraction);
        document.removeEventListener('keydown', window.enableAudioOnInteraction);
        document.removeEventListener('mousemove', window.enableAudioOnInteraction);
        document.removeEventListener('touchmove', window.enableAudioOnInteraction);
    }
}

function showMusicHint() {
    const musicBtn = document.getElementById('music-toggle');
    musicBtn.classList.add('pulse');
}

function removeMusicHint() {
    const musicBtn = document.getElementById('music-toggle');
    musicBtn.classList.remove('pulse');
}

function toggleMusic() {
    if (!weddingConfig.music.enabled) {
        return;
    }

    const musicIcon = document.getElementById('music-icon');

    if (!audio) {
        initializeMusic();
        return;
    }

    if (isPlaying) {
        audio.pause();
        musicIcon.textContent = '🔇';
        isPlaying = false;
    } else {
        audio.play().catch(error => {
            console.log('Audio play failed:', error);
            alert('Tidak dapat memutar musik. Silakan coba lagi.');
        });
        musicIcon.textContent = '🔊';
        isPlaying = true;
        removeMusicHint();
    }
}

// Smooth scrolling for navigation links (if you add navigation)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Optimized parallax effect for hero section with requestAnimationFrame
let ticking = false;
let lastScrollY = 0;

function updateParallax() {
    const scrolled = lastScrollY;
    const hero = document.querySelector('.hero');
    if (hero) {
        // Use transform3d for hardware acceleration
        hero.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    lastScrollY = window.pageYOffset;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax();
        });
        ticking = true;
    }
}, { passive: true });

// Prevent right-click on images (optional - to protect photos)
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Add floating animation to ornaments
const ornaments = document.querySelectorAll('.ornament');
ornaments.forEach((ornament, index) => {
    ornament.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
});

// CSS animation for floating effect (added via JS)
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

// Note: Skeleton loader initialization moved to initializeWebsite() function

// Console message
console.log('%c💍 Wedding Invitation Template 💍', 'font-size: 20px; color: #d4af37; font-weight: bold;');
console.log('%cWishing you a lifetime of love and happiness!', 'font-size: 14px; color: #666;');

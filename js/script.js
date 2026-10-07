/* ============================================
   DUA TITIK - JAVASCRIPT
   Mobile Menu, Smooth Scroll, Animations
   ============================================ */

// ============================================
// MOBILE MENU TOGGLE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ============================================
// SMOOTH SCROLL BEHAVIOR (fallback for older browsers)
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-fade-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards, review cards, step cards on page load
document.addEventListener('DOMContentLoaded', function() {
    const elementsToObserve = document.querySelectorAll(
        '.feature-card, .review-card, .step-card, .gallery-item'
    );
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});

// ============================================
// NAVBAR STICKY BEHAVIOR & SHADOW
// ============================================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow when scrolled
    if (scrollTop > 0) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
    
    lastScrollTop = scrollTop;
});

// ============================================
// CONTACT PLACEHOLDERS & WHATSAPP CONFIG
// ============================================

// EDIT THESE VALUES WITH YOUR ACTUAL INFORMATION
const CONTACT_CONFIG = {
    whatsappNumber: '62812345678', // Format: country code + number (no + or -)
    address: 'Jl. Example No. 123, Jakarta, Indonesia',
    hours: 'Monday - Friday: 10:00 - 20:00\nSaturday - Sunday: 10:00 - 22:00',
    instagram: '@miechilioilduatitik',
    phone: '+62 812 345 678'
};

// Update WhatsApp links dynamically
function updateWhatsAppLinks() {
    const whatsappMessage = encodeURIComponent('Halo Dua Titik! Saya ingin order Mie Chili Oil.');
    const whatsappUrl = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${whatsappMessage}`;
    
    // Update all WhatsApp CTA buttons
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.href = whatsappUrl;
    });
}

// Update contact information
function updateContactInfo() {
    // Update address placeholders
    const addressElements = document.querySelectorAll('[data-info="address"]');
    addressElements.forEach(el => {
        if (el.textContent.includes('INSERT ACTUAL ADDRESS')) {
            el.textContent = CONTACT_CONFIG.address;
        }
    });

    // Update hours placeholders
    const hoursElements = document.querySelectorAll('[data-info="hours"]');
    hoursElements.forEach(el => {
        if (el.textContent.includes('INSERT OPERATING HOURS')) {
            el.textContent = CONTACT_CONFIG.hours;
        }
    });

    // Update phone placeholders
    const phoneElements = document.querySelectorAll('[data-info="phone"]');
    phoneElements.forEach(el => {
        if (el.textContent.includes('INSERT WHATSAPP NUMBER')) {
            el.textContent = CONTACT_CONFIG.phone;
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateWhatsAppLinks();
    updateContactInfo();
});

// ============================================
// IMAGE LAZY LOADING
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Remove existing ripple
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        this.appendChild(ripple);
    });
});

// ============================================
// FORM VALIDATION (if forms are added)
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const re = /^(\+\d{1,3}[- ]?)?\d{10,}$/;
    return re.test(String(phone).replace(/\s/g, ''));
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Copy to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard!');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// ANALYTICS HELPER (ready for GA4)
// ============================================

function trackEvent(eventName, eventData = {}) {
    if (window.gtag) {
        window.gtag('event', eventName, eventData);
    } else {
        console.log('Event tracked:', eventName, eventData);
    }
}

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        trackEvent('button_click', {
            button_text: buttonText,
            page: window.location.pathname
        });
    });
});

// ============================================
// EXPORT FOR USE IN OTHER MODULES
// ============================================

window.DuaTitik = {
    trackEvent,
    copyToClipboard,
    debounce,
    updateWhatsAppLinks,
    updateContactInfo,
    CONTACT_CONFIG
};

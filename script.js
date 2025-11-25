// Smooth scroll animation observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all fade-in-up elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 60;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navigation
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.boxShadow = '0 2px 16px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        if (scrolled < heroHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
        }
    });
}

// Animate wave bars continuously
const waveBars = document.querySelectorAll('.wave-bar');
waveBars.forEach((bar, index) => {
    bar.style.animationDelay = `${index * 0.1}s`;
});

// Add hover effect to benefit cards
const benefitCards = document.querySelectorAll('.benefit-card');
benefitCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, rgba(0, 113, 227, 0.05) 0%, rgba(0, 161, 227, 0.05) 100%)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.background = 'var(--secondary-bg)';
    });
});

// Lazy load optimization
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add prefers-reduced-motion support
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelectorAll('.fade-in-up').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

// Performance optimization: debounce scroll events
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

// Apply debouncing to scroll-heavy operations
const debouncedScroll = debounce(() => {
    // Additional scroll operations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Portfolio video hover effect
document.addEventListener('DOMContentLoaded', () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item[data-video]');

    portfolioItems.forEach(item => {
        const video = item.querySelector('.portfolio-video');

        if (video) {
            item.addEventListener('mouseenter', () => {
                video.play().catch(err => {
                    console.log('Video autoplay prevented:', err);
                });
            });

            item.addEventListener('mouseleave', () => {
                video.pause();
                // Don't reset - continue from where it left off on re-hover
            });
        }
    });
});

// Cookie Consent Banner
document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('cookie-accept');

    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');

    if (!cookiesAccepted) {
        // Show banner after a short delay
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    // Handle accept button click
    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.remove('show');

        // Remove banner from DOM after animation
        setTimeout(() => {
            cookieBanner.remove();
        }, 500);
    });
});

// Article cover parallax effect
const articleCover = document.querySelector('.article-cover-image');
if (articleCover) {
    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        const coverSection = articleCover.parentElement;
        const coverOffset = coverSection.offsetTop;
        const coverHeight = coverSection.offsetHeight;

        // Only apply parallax when the cover is in viewport
        if (scrolled + window.innerHeight > coverOffset && scrolled < coverOffset + coverHeight) {
            const parallaxSpeed = -0.2;
            const yPos = (scrolled - coverOffset) * parallaxSpeed;
            articleCover.style.transform = `translateY(${yPos}px)`;
        }
    };

    window.addEventListener('scroll', updateParallax);
    // Initial call
    updateParallax();
}

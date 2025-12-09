// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-bg');

    parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('glass-nav');
        navbar.classList.remove('bg-transparent');
    } else {
        navbar.classList.remove('glass-nav');
        navbar.classList.add('bg-transparent');
    }
});

// Smooth Scroll Function
function smoothScroll(targetId, duration) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function (easeInOutCubic) for "beautiful" feel
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
}

// Attach Smooth Scroll to Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        smoothScroll(targetId, 2000); // 2000ms for slow scroll
    });
});

// Attach Smooth Scroll to Scroll Down Button
const scrollBtn = document.querySelector('.animate-bounce');
if (scrollBtn) {
    // Remove inline onclick if possible or just override
    scrollBtn.removeAttribute('onclick');
    scrollBtn.addEventListener('click', () => {
        smoothScroll('youtube-channel', 2000);
    });
}


// Email Tooltip Functionality
const emailBtn = document.getElementById('emailBtn');
const emailTooltip = document.getElementById('emailTooltip');
const copyBtn = document.getElementById('copyBtn');
const emailText = document.getElementById('emailText');

if (emailBtn && emailTooltip && copyBtn && emailText) {
    // Toggle tooltip
    emailBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        emailTooltip.classList.toggle('hidden');
        emailTooltip.classList.toggle('flex');
    });

    // Copy to clipboard
    copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        copyEmail();
    });

    // Also copy when clicking the text
    emailText.addEventListener('click', (e) => {
        e.stopPropagation();
        copyEmail();
    });

    function copyEmail() {
        const email = emailText.innerText;
        navigator.clipboard.writeText(email).then(() => {
            // Visual feedback
            const originalText = emailText.innerText;
            emailText.innerText = "Copied!";

            setTimeout(() => {
                emailText.innerText = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    // Close tooltip when clicking outside
    document.addEventListener('click', (e) => {
        if (!emailBtn.contains(e.target) && !emailTooltip.contains(e.target)) {
            emailTooltip.classList.add('hidden');
            emailTooltip.classList.remove('flex');
        }
    });
}

/* ============================================
   TARGET & TRANSPARENT CONSTRUCTION
   JavaScript - Shared across all pages
   ============================================ */

// ============================================
// SIDEBAR TOGGLE
// ============================================
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const toggle = document.getElementById('menuToggle');

    if (sidebar && overlay && toggle) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        toggle.classList.toggle('active');
    }
}

// Close sidebar when clicking a link (mobile only)
document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                toggleSidebar();
            }
        });
    });
});

// ============================================
// FADE IN ANIMATION ON SCROLL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');

    if (fadeElements.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        fadeElements.forEach(function(el) {
            observer.observe(el);
        });
    }
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ============================================
// HERO VIDEO FALLBACK
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.hero-video-bg');
    const fallback = document.getElementById('videoFallback');

    if (video && fallback) {
        video.addEventListener('error', function() {
            video.style.display = 'none';
            fallback.style.display = 'flex';
        });

        // Check if video source is empty or default
        const sources = video.querySelectorAll('source');
        if (sources.length === 0 || sources[0].src.includes('assets/construction-video.mp4')) {
            // If video file doesn't exist, show fallback
            video.style.display = 'none';
            fallback.style.display = 'flex';
        }
    }
});

// ============================================
// PORTFOLIO FILTER (Portfolio Page Only)
// ============================================
function filterPortfolio(category) {
    const items = document.querySelectorAll('.portfolio-item');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update active button
    buttons.forEach(function(btn) {
        btn.classList.remove('active');
    });

    if (event && event.target) {
        event.target.classList.add('active');
    }

    // Filter items
    items.forEach(function(item) {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            item.style.display = 'none';
        }
    });
}

// ============================================
// PORTFOLIO VIDEO HOVER-TO-PLAY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const videoItems = document.querySelectorAll('.portfolio-video-item');

    videoItems.forEach(function(item) {
        const video = item.querySelector('video');
        const playBtn = item.querySelector('.play-btn');

        if (video) {
            item.addEventListener('mouseenter', function() {
                video.play().catch(function() {});
            });

            item.addEventListener('mouseleave', function() {
                video.pause();
                video.currentTime = 0;
            });

            item.addEventListener('click', function() {
                if (video.paused) {
                    video.play().catch(function() {});
                    if (playBtn) playBtn.style.opacity = '0';
                } else {
                    video.pause();
                    if (playBtn) playBtn.style.opacity = '1';
                }
            });
        }
    });
});

// ============================================
// NAVBAR ACTIVE STATE HIGHLIGHTING
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Desktop nav
    document.querySelectorAll('.desktop-nav-links a').forEach(function(link) {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.classList.add('active');
        }
    });

    // Sidebar nav
    document.querySelectorAll('.sidebar-nav a').forEach(function(link) {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
});

// ============================================
// CLOSE SIDEBAR ON ESCAPE KEY
// ============================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    }
});

// ============================================
// LAZY LOAD IMAGES (Optional Enhancement)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
});

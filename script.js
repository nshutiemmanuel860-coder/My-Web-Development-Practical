document.addEventListener('DOMContentLoaded', function () {

    // ===== HAMBURGER MENU =====
    // Inject hamburger button into header for mobile nav
    const headerContent = document.querySelector('.header-content');
    const nav = document.querySelector('nav');

    if (headerContent && nav) {
        const hamburger = document.createElement('button');
        hamburger.classList.add('hamburger');
        hamburger.setAttribute('aria-label', 'Toggle navigation');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<span></span><span></span><span></span>';

        // Insert hamburger before nav
        headerContent.insertBefore(hamburger, nav);

        hamburger.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            hamburger.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });

        // Close nav when a link is clicked (mobile)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close nav on outside click
        document.addEventListener('click', (e) => {
            if (!headerContent.contains(e.target)) {
                nav.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ===== PERSISTENT DARK MODE =====
    const savedDarkMode = localStorage.getItem('darkMode');
    const allDarkModeBtns = document.querySelectorAll('#darkModeBtn');

    if (savedDarkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    function updateDarkModeButtons() {
        const isDark = document.body.classList.contains('dark-mode');
        allDarkModeBtns.forEach(btn => {
            btn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        });
    }

    updateDarkModeButtons();

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        updateDarkModeButtons();
    }

    allDarkModeBtns.forEach(btn => btn.addEventListener('click', toggleDarkMode));

    // ===== SCROLL REVEAL =====
    // Add .reveal class to all section cards and section titles
    const revealTargets = document.querySelectorAll(
        'main section .card, main section .section-title, .hero-card'
    );
    revealTargets.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Small stagger per batch
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 60);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => observer.observe(el));

    // ===== INTERACTIVE FEATURES =====

    // 1. Alert button
    const alertBtn = document.getElementById('alertBtn');
    if (alertBtn) {
        alertBtn.addEventListener('click', () => {
            alert('🎉 Hello! This is a button click alert.');
        });
    }

    // 2. Change greeting text
    const changeTextBtn = document.getElementById('changeTextBtn');
    const greeting = document.getElementById('greeting');
    if (changeTextBtn && greeting) {
        const messages = [
            'Hello! Welcome to my page.',
            'Thanks for visiting! 😊',
            'JavaScript makes websites interactive!',
            'Keep coding and learning! 🚀',
            'You clicked the button! 🎉',
        ];
        let index = 0;
        changeTextBtn.addEventListener('click', () => {
            index = (index + 1) % messages.length;
            greeting.style.opacity = '0';
            greeting.style.transform = 'translateY(8px)';
            setTimeout(() => {
                greeting.textContent = messages[index];
                greeting.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                greeting.style.opacity = '1';
                greeting.style.transform = 'translateY(0)';
            }, 150);
        });
    }

    // 3. Display current date and time (live clock)
    const showDateTimeBtn = document.getElementById('showDateTimeBtn');
    const dateTimeDisplay = document.getElementById('dateTimeDisplay');
    let clockInterval = null;

    function showClock() {
        const now = new Date();
        dateTimeDisplay.textContent = '📅 ' + now.toLocaleString();
    }

    if (showDateTimeBtn && dateTimeDisplay) {
        showClock();
        showDateTimeBtn.addEventListener('click', () => {
            if (clockInterval) {
                clearInterval(clockInterval);
                clockInterval = null;
                showDateTimeBtn.textContent = 'Show Date/Time';
                dateTimeDisplay.textContent = '';
            } else {
                showClock();
                clockInterval = setInterval(showClock, 1000);
                showDateTimeBtn.textContent = 'Stop Clock';
            }
        });
    }

    // 4. Show/hide marks table section
    const toggleSectionBtn = document.getElementById('toggleSectionBtn');
    const marksSection = document.getElementById('marksSection');
    if (toggleSectionBtn && marksSection) {
        toggleSectionBtn.textContent = 'Hide Table';
        toggleSectionBtn.addEventListener('click', () => {
            const isHidden = marksSection.style.display === 'none';
            marksSection.style.display = isHidden ? 'block' : 'none';
            toggleSectionBtn.textContent = isHidden ? 'Hide Table' : 'Show Table';
        });
    }

    // 5. Smooth active nav link highlight
    const navLinks = document.querySelectorAll('.menu li a');
    navLinks.forEach(link => {
        if (link.href === window.location.href ||
            link.getAttribute('href') === window.location.pathname.split('/').pop()) {
            link.style.background = 'linear-gradient(135deg, #2563eb, #10b981)';
            link.style.color = '#fff';
        }
    });

});

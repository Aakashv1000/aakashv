/*!
* Start Bootstrap - Resume v7.0.4 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2026 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Custom section nav highlight (Bootstrap ScrollSpy breaks on very short tail sections)
    initSectionNavHighlight();

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100,
        });
    }

    // Initialize Typed.js for hero section
    var typedElement = document.querySelector('#typed-output');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('#typed-output', {
            strings: [
                'Full-Stack Developer',
                'Cloud &amp; Infrastructure Engineer',
                'AI/ML Enthusiast',
                'Software Development Engineer',
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });
    }

});

/**
 * Highlight the correct #sideNav link based on which section contains a
 * reference line in the viewport (works for short Interests / Achievements).
 */
function initSectionNavHighlight() {
    const nav = document.querySelector('#sideNav');
    if (!nav) return;

    const links = [].slice.call(nav.querySelectorAll('.nav-link.js-scroll-trigger[href^="#"]'));
    if (!links.length) return;

    const ids = links.map(function (link) {
        const href = link.getAttribute('href') || '';
        return href.charAt(0) === '#' ? href.slice(1) : '';
    }).filter(Boolean);

    function documentTop(el) {
        return el.getBoundingClientRect().top + window.scrollY;
    }

    function updateActiveNav() {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const docEl = document.documentElement;
        const maxScroll = Math.max(0, docEl.scrollHeight - vh);

        // Reference line: mid-viewport (top-only lines stay inside tall Projects too long)
        const yLine = scrollY + Math.min(Math.max(vh * 0.46, 200), 520);

        let activeId = ids[0];

        // Pinned to bottom: always last section
        if (scrollY >= maxScroll - 3) {
            activeId = ids[ids.length - 1];
        } else {
            let contained = null;
            for (let i = 0; i < ids.length; i++) {
                const el = document.getElementById(ids[i]);
                if (!el) continue;
                const top = documentTop(el);
                const bottom = top + el.offsetHeight;
                if (yLine >= top && yLine < bottom) {
                    contained = ids[i];
                    break;
                }
            }

            if (contained) {
                activeId = contained;
            } else {
                // Fallback: last section whose top is above the line
                for (let j = 0; j < ids.length; j++) {
                    const el = document.getElementById(ids[j]);
                    if (!el) continue;
                    if (documentTop(el) <= yLine) {
                        activeId = ids[j];
                    }
                }
            }
        }

        links.forEach(function (link) {
            const href = link.getAttribute('href') || '';
            const id = href.charAt(0) === '#' ? href.slice(1) : '';
            link.classList.toggle('active', id === activeId);
        });
    }

    let ticking = false;
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateActiveNav);
    window.addEventListener('load', function () {
        setTimeout(updateActiveNav, 50);
        setTimeout(updateActiveNav, 600);
        setTimeout(updateActiveNav, 1200);
    });

    window.addEventListener('hashchange', updateActiveNav);

    updateActiveNav();
}

// Print/PDF functionality
window.addEventListener('beforeprint', () => {
    // Hide sidebar when printing
    const sideNav = document.querySelector('#sideNav');
    if (sideNav) {
        sideNav.style.display = 'none';
    }
    // Adjust body padding for print
    document.body.style.paddingLeft = '0';

    // Force AOS elements visible for print
    document.querySelectorAll('[data-aos]').forEach(function(el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.transition = 'none';
    });
});

window.addEventListener('afterprint', () => {
    // Show sidebar after printing
    const sideNav = document.querySelector('#sideNav');
    if (sideNav) {
        sideNav.style.display = '';
    }
    // Restore body padding
    const isLargeScreen = window.matchMedia('(min-width: 992px)').matches;
    if (isLargeScreen) {
        document.body.style.paddingLeft = '17rem';
    } else {
        document.body.style.paddingLeft = '0';
    }

    // Restore AOS inline styles
    document.querySelectorAll('[data-aos]').forEach(function(el) {
        el.style.opacity = '';
        el.style.transform = '';
        el.style.transition = '';
    });
});

/*!
* Start Bootstrap - Resume v7.0.4 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2026 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            offset: 74,
        });
    };

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

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('main-menu');
    const navBar = document.querySelector('nav'); 
    const breakpoint = 768;


    function closeMenu() {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    
    menuToggle.addEventListener('click', function(event) {

        event.stopPropagation();


        navLinks.classList.toggle('active');


        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    
    window.addEventListener('resize', function() {
        
        if (window.innerWidth > breakpoint) {
            closeMenu(); 
        }
    });

    
    document.addEventListener('click', function(event) {
        
        if (window.innerWidth <= breakpoint && !navBar.contains(event.target)) {
            closeMenu();
        }
    });
});
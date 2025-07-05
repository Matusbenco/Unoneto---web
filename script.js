document.addEventListener('DOMContentLoaded', function() {

    // Funkcia pre "scroll-reveal" animáciu
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Po zobrazení už nie je potrebné sledovať
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Zobrazí sa, keď je 10% prvku viditeľných
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

});
/* =================================================================
   FINÁLNY A KOMPLETNÝ JAVASCRIPT KÓD (v. 3.1)
   - Pridaný autoplay pre banner
   ================================================================= */

document.addEventListener('DOMContentLoaded', function() {

    // --- ČASŤ 1: Animácie prvkov pri scrollovaní (Scroll Reveal) ---
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealElements.forEach(element => {
            observer.observe(element);
        });
    }


    // --- ČASŤ 2: Zobrazenie/skrytie sekcie 'Ostatné' po kliknutí v menu ---
    const toggleLink = document.getElementById('toggle-ostatne');
    const ostatneSection = document.getElementById('ostatne');
    if (toggleLink && ostatneSection) {
        toggleLink.addEventListener('click', function(event) {
            event.preventDefault();
            ostatneSection.classList.toggle('active');
            if (ostatneSection.classList.contains('active')) {
                setTimeout(() => {
                    ostatneSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    }


    // --- ČASŤ 3: Inicializácia Banner Slideru (Splide.js) ---
    const bannerSlider = document.getElementById('banner-slider');
    if (bannerSlider) {
        new Splide('#banner-slider', {
            type       : 'loop',
            perPage    : 1,
            arrows     : true,
            pagination : true,
            autoplay   : true,      // Automatické posúvanie je zapnuté
            interval   : 5000,      // Interval 5 sekúnd
            pauseOnHover: true,     // Pauza pri prejdení myšou
        }).mount();
    }
    
    
    // --- ČASŤ 4: Inicializácia Hamburger Menu pre mobily ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.querySelector('.nav-links');
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
        });
    }

}); // Koniec hlavného 'DOMContentLoaded' poslucháča
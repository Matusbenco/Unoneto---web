/* =================================================================
   FINÁLNY A KOMPLETNÝ JAVASCRIPT KÓD (v. 4.0)
   - Opravuje zatváranie mobilného menu po kliknutí
   ================================================================= */

document.addEventListener('DOMContentLoaded', function() {

    // --- ČASŤ 1: Animácie prvkov pri scrollovaní (Scroll Reveal) ---
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    revealElements.forEach(element => {
        observer.observe(element);
    });

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

    // --- ČASŤ 3: Funkčnosť mobilného menu (vylepšená verzia) ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        // Funkcia na otvorenie/zatvorenie menu
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
        });

        // NOVÁ ČASŤ: Sledovanie kliknutí na odkazy v menu
        // Získame všetky odkazy (<li>) vnútri menu
        const navLinks = navMenu.querySelectorAll('li');

        // Pre každý odkaz pridáme poslucháča
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Ak je menu otvorené, zatvoríme ho
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

}); // Koniec hlavného 'DOMContentLoaded' poslucháča
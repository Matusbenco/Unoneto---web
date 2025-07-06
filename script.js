/* =================================================================
   FINÁLNY A KOMPLETNÝ JAVASCRIPT KÓD (v. 3.0)
   - Kombinuje všetky funkcie vrátane mobilného menu
   ================================================================= */

// Spustíme celý skript až vtedy, keď je celá HTML štruktúra stránky pripravená
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

    // --- ČASŤ 3: Funkčnosť mobilného menu ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Zmena aria-expanded pre prístupnosť
            const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
        });
    }

}); // Koniec hlavného 'DOMContentLoaded' poslucháča
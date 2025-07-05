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
// ===== KÓD PRE ZOBRAZENIE/SKRYTIE SEKCE 'OSTATNÉ' =====

// Počkáme, kým sa načíta celá stránka
document.addEventListener('DOMContentLoaded', function() {
    
    // Nájdeme si náš odkaz v menu a sekciu, ktorú chceme ovládať
    const toggleLink = document.getElementById('toggle-ostatne');
    const ostatneSection = document.getElementById('ostatne');

    // Ak sme oba prvky našli, pokračujeme
    if (toggleLink && ostatneSection) {
        
        // Spustíme funkciu pri kliknutí na odkaz "Ostatné"
        toggleLink.addEventListener('click', function(event) {
            
            // Zastavíme predvolené správanie odkazu (aby neskákal na stránke)
            event.preventDefault();
            
            // Zistíme, či je sekcia momentálne skrytá alebo zobrazená
            const isVisible = ostatneSection.classList.contains('active');
            
            if (isVisible) {
                // Ak je VIDITEĽNÁ, tak ju skryjeme (odoberieme triedu 'active')
                ostatneSection.classList.remove('active');
            } else {
                // Ak je SKRYTÁ, tak ju zobrazíme (pridáme triedu 'active')
                ostatneSection.classList.add('active');

                // A plynule zascrollujeme k novo zobrazenej sekcii
                setTimeout(() => {
                    ostatneSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100); // malá pauza, aby sa stihla zobraziť pred scrollom
            }
        });
    }

});
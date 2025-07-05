/* =================================================================
   FINÁLNY A KOMPLETNÝ JAVASCRIPT KÓD (v. 2.0)
   - Kombinuje všetky funkcie do jedného celku
   ================================================================= */

// Spustíme celý skript až vtedy, keď je celá HTML štruktúra stránky pripravená
document.addEventListener('DOMContentLoaded', function() {

    // --- ČASŤ 1: Animácie prvkov pri scrollovaní (Scroll Reveal) ---
    
    const revealElements = document.querySelectorAll('.reveal');

    // Vytvoríme "pozorovateľa", ktorý sleduje, či je prvok viditeľný na obrazovke
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Keď sa raz prvok zobrazí, už ho netreba sledovať
            }
        });
    }, {
        threshold: 0.1 // Animácia sa spustí, keď je viditeľných aspoň 10% prvku
    });

    // Povieme pozorovateľovi, ktoré prvky má sledovať
    revealElements.forEach(element => {
        observer.observe(element);
    });


    // --- ČASŤ 2: Zobrazenie/skrytie sekcie 'Ostatné' po kliknutí v menu ---

    const toggleLink = document.getElementById('toggle-ostatne');
    const ostatneSection = document.getElementById('ostatne');

    // Tento kód sa spustí, iba ak na stránke existuje odkaz s id 'toggle-ostatne'
    if (toggleLink && ostatneSection) {
        
        toggleLink.addEventListener('click', function(event) {
            
            // Tento príkaz zastaví predvolené správanie odkazu (skok na #ostatne)
            // Aplikuje sa IBA na tento jeden odkaz, nie na celú stránku.
            event.preventDefault();
            
            // Jednoducho prepneme triedu 'active' na sekcii
            ostatneSection.classList.toggle('active');

            // Ak sme sekciu práve zviditeľnili (pridali sme triedu 'active'), tak na ňu plynulo zascrollujeme
            if (ostatneSection.classList.contains('active')) {
                setTimeout(() => {
                    ostatneSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    }

}); // Koniec hlavného 'DOMContentLoaded' poslucháča
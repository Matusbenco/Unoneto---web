/* =================================================================
   FINÁLNA KONSOLIDOVANÁ VERZIA SCRIPT.JS - OPRAVENÁ
   ================================================================= */
document.addEventListener('DOMContentLoaded', function() {

    // --- Animácie prvkov pri scrollovaní ---
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
        revealElements.forEach(element => { observer.observe(element); });
    }

    // --- Banner Slider na hlavnej stránke (index.html) ---
    if (document.getElementById('banner-slider')) {
        new Splide('#banner-slider', {
            type: 'loop', perPage: 1, autoplay: true, interval: 5000,
        }).mount();
    }
    
 // --- Galéria na podstránke HUGO (hugo.html) ---
if (document.getElementById('gallery-slider')) {
    new Splide('#gallery-slider', {
        type: 'loop', perPage: 3, gap: '1.5rem', autoplay: true,
        breakpoints: { 1024: { perPage: 2 }, 767: { perPage: 1 } }
    }).mount();
}

    // --- Slidery na podstránke VEXION (vexion.html) ---
    if (document.getElementById('how-it-works-slider')) {
        new Splide('#how-it-works-slider', {
            type: 'fade', rewind: true, perPage: 1, autoplay: true, interval: 4000,
        }).mount();
    }
    if (document.getElementById('card-types-slider')) {
        new Splide('#card-types-slider', {
            type: 'loop', perPage: 3, gap: '2rem', autoplay: true, interval: 3500,
            breakpoints: { 1024: { perPage: 2 }, 768: { perPage: 1 } }
        }).mount();
    }

    // --- OPRAVENÉ: Slidery pre 5 typov VEXION kariet ---
    const initVexionGallery = (selector) => {
        const sliderElement = document.querySelector(selector);
        if (sliderElement) {
            new Splide(sliderElement, {
                type: 'loop',
                perPage: 3,
                gap: '1rem',
                autoplay: true,
                interval: 3000,
                pauseOnHover: true,
                breakpoints: {
                    1024: { perPage: 2 },
                    767: { perPage: 1 }
                }
            }).mount();
        }
    };

    // Inicializujeme každý slider zvlášť
    initVexionGallery('#gallery-peciatky');
    initVexionGallery('#gallery-odmeny');
    // initVexionGallery('#gallery-zlavy'); // odkomentuj, keď pridáš galériu do HTML
    // initVexionGallery('#gallery-kupony'); // odkomentuj, keď pridáš galériu do HTML
    // initVexionGallery('#gallery-permanentky'); // odkomentuj, keď pridáš galériu do HTML

    // --- Hamburger Menu pre mobily ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-menu');
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
        });
    }
// --- Logika pre rozbaľovacie menu ---
    const nasaPonukaToggle = document.getElementById('nasa-ponuka-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (nasaPonukaToggle && dropdownMenu) {
        nasaPonukaToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', function(e) {
            if (!nasaPonukaToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    }
// --- Logika pre rozbaľovacie menu na mobile ---
    const nasaPonukaToggleMobile = document.getElementById('nasa-ponuka-toggle');
    const dropdownMenuMobile = document.querySelector('.dropdown-menu');

    if (nasaPonukaToggleMobile && dropdownMenuMobile) {
        nasaPonukaToggleMobile.addEventListener('click', function(e) {
            // Zabraňuje zatvoreniu menu pri kliknutí na hlavný odkaz, ak je menu už otvorené
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                e.preventDefault();
                
                // Zistíme, či je menu aktuálne zobrazené
                const isDisplayed = dropdownMenuMobile.style.display === 'flex';
                
                // Zmeníme stav zobrazenia
                dropdownMenuMobile.style.display = isDisplayed ? 'none' : 'flex';
            }
        });
    }
   // --- Galéria na podstránke OZOBOT (ozobot.html) ---
if (document.getElementById('ozobot-gallery-slider')) {
    new Splide('#ozobot-gallery-slider', {
        type: 'loop',      // Typ animácie
        perPage: 1,        // Zobrazí vždy len 1 obrázok
        gap: '1.5rem',     // Medzera medzi obrázkami
        autoplay: true,    // Automatické posúvanie
        arrows: false      // Skryje šípky, keďže je obrázok len jeden
    }).mount();
}

// --- Logika pre bočný banner "Veľký týždeň malých firiem" ---
    const banner = document.getElementById('velky-tyzden-banner');
    const closeButton = banner ? banner.querySelector('.close-banner') : null;

    if (banner && closeButton) {
        // Zobraz banner vždy po načítaní stránky
        banner.classList.remove('hidden'); // Odstráň triedu 'hidden' hneď po načítaní

        // Pridaj event listener na tlačidlo zatvorenia
        closeButton.addEventListener('click', () => {
            banner.classList.add('hidden'); // Pridaj triedu pre skrytie
            // *** ODSTRÁNENÝ RIADOK: localStorage.setItem('velkyTyzdenBannerClosed', 'true'); ***
            // Teraz sa stav zatvorenia NEBUDE ukladať
        });
    }

}); // <-- VŠETKO MUSÍ BYŤ VNÚTRI TEJTO ZÁTVORKY


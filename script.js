/* =================================================================
   FINÁLNA KONSOLIDOVANÁ VERZIA SCRIPT.JS - OPRAVENÁ
   ================================================================= */
document.addEventListener('DOMContentLoaded', function() {

   
    // --- Dynamický odkaz pre LOGO (SK/EN) ---
    const logoLink = document.querySelector('a.logo');
    const pageLang = document.documentElement.lang; // Získa 'sk' alebo 'en' z <html lang="...">

    if (logoLink) {
        if (pageLang === 'en') {
            logoLink.href = 'en';
        } else if (pageLang === 'sk') {
            logoLink.href = '/';
        }
        // Ak jazyk nie je ani 'sk' ani 'en', nechá pôvodný odkaz (napr. "/")
    }
    // --- Koniec skriptu pre logo ---




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

// =================================================================
// START: UPRAVENÁ Logika pre bočný banner "Veľký týždeň malých firiem"
// =================================================================
    const banner = document.getElementById('velky-tyzden-banner');
    const closeButton = banner ? banner.querySelector('.close-banner') : null;
    const storageKey = 'velkyTyzdenBannerClosedCount';
    const maxShows = 2; // Koľkokrát sa má banner zobraziť (1. zobrazenie + 2. zobrazenie)

    if (banner && closeButton) {
        // 1. Získa aktuálny počet zatvorení z localStorage
        let closeCount = parseInt(localStorage.getItem(storageKey) || 0);

        // 2. Skontroluje, či sa má banner zobraziť
        if (closeCount >= maxShows) {
            // Používateľ už banner zatvoril 2x, skryjeme ho pridaním triedy 'hidden'
            banner.classList.add('hidden'); 
        } else {
            // Má sa zobraziť, odstránime triedu 'hidden' (pre prípad, že by bola pridaná)
            banner.classList.remove('hidden');
        }

        // 3. Pridá funkciu na zatváracie tlačidlo
        closeButton.addEventListener('click', () => {
            // 3a. Skryje banner
            banner.classList.add('hidden');
            
            // 3b. Získa *aktuálny* počet (pre istotu, keby mal otvorených viac okien)
            let currentCount = parseInt(localStorage.getItem(storageKey) || 0);
            
            // 3c. Zvýši počet
            currentCount++;
            
            // 3d. Uloží nový počet späť do localStorage
            localStorage.setItem(storageKey, currentCount);
        });
    }
// =================================================================
// KONIEC: UPRAVENÁ Logika pre bočný banner "Veľký týždeň malých firiem"
// =================================================================


// =================================================================
// LOGIKA PRE OBJEDNÁVKOVÝ FORMULÁR (webstranka_formular.html)
// =================================================================

// --- Rozbaľovanie/zabaľovanie sekcií ---
const formSectionHeaders = document.querySelectorAll('.form-section-header');
if (formSectionHeaders.length > 0) {
    // Otvor prvú sekciu automaticky
    const firstSection = document.querySelector('.form-section[data-section="basic"]');
    if (firstSection) {
        firstSection.classList.add('open');
    }

    formSectionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const section = this.closest('.form-section');
            section.classList.toggle('open');
        });
    });
}

// --- Zobrazenie inputu pre názov domény ---
    const domainOptions = document.querySelectorAll('input[name="domainOption"]');
    const domainNameGroup = document.getElementById('domainNameGroup');
    if (domainOptions.length > 0 && domainNameGroup) {
        domainOptions.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'buy_self' || this.value === 'package') {
                    domainNameGroup.style.display = 'block';
                } else {
                    domainNameGroup.style.display = 'none';
                }
            });
        });
    }

    // --- Zobrazenie počtu emailov ---
    const emailOptions = document.querySelectorAll('input[name="emailOption"]');
    const emailCountGroup = document.getElementById('emailCountGroup');
    if (emailOptions.length > 0 && emailCountGroup) {
        emailOptions.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'buy_self' || this.value === 'package') {
                    emailCountGroup.style.display = 'block';
                } else {
                    emailCountGroup.style.display = 'none';
                }
            });
        });
    }
// =================================================================
// COUNTDOWN TIMER PRE VEĽKÝ TÝŽDEŇ
// =================================================================
const countdownElement = document.getElementById('countdown');
if (countdownElement) {
    const endDate = new Date('November 30, 2025 23:59:59').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate - now;
        
        if (distance < 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}
// --- Galéria na podstránke GRAFICKE SLUZBY (s Lightboxom) ---
    const portfolioSlider = document.getElementById('portfolio-gallery-slider');
    
    if (portfolioSlider) {
        
        // 1. Najprv inicializujeme Splide slider
        const splide = new Splide('#portfolio-gallery-slider', {
            type       : 'loop',
            perPage    : 3,
            gap        : '1.5rem',
            autoplay   : true,
            breakpoints: {
                1024: { perPage: 2 },
                767:  { perPage: 1 },
            }
        });

        // 2. Počkáme, kým Splide slider "namontuje" galériu
        splide.on('mounted', function () {
            
            // 3. AŽ POTOM inicializujeme GLightbox
            // Týmto zabezpečíme, že sa načíta správne aj pre klonované slidy
            const lightbox = GLightbox({
                // Tento selector nájde všetky odkazy s triedou .glightbox v rámci slidera
                selector: '#portfolio-gallery-slider .splide__slide a.glightbox', 
                touchNavigation: true,
                loop: true,
                // Použijeme data-gallery atribút z HTML, aby sa neopakovali klony
                gallery: 'portfolio-gallery' 
            });
        });

        // 4. Spustíme Splide
        splide.mount();
    }
    
});
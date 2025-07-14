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
        revealElements.forEach(element => {
            observer.observe(element);
        });
    }

    // --- Banner Slider na hlavnej stránke (index.html) ---
    const bannerSlider = document.getElementById('banner-slider');
    if (bannerSlider) {
        new Splide('#banner-slider', {
            type: 'loop',
            perPage: 1,
            arrows: true,
            pagination: true,
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
        }).mount();
    }
    
    // --- Galéria na podstránkach (napr. hugo.html) ---
    const gallerySlider = document.getElementById('gallery-slider');
    if (gallerySlider) {
        new Splide('#gallery-slider', {
            type        : 'loop',
            perPage     : 1,
            gap         : '1rem',
            arrows      : true,
            pagination  : true,
            autoplay    : true,
            interval    : 3000,
            pauseOnHover: true,
            resetProgress: false,
        }).mount();
    }

    // --- Funkcionalita Lightboxu (zväčšenie obrázku po kliknutí) ---
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);

    // OPRAVA: Hľadá obrázky v OBOCH slideroch (banner aj galéria)
    const clickableImages = document.querySelectorAll('#banner-slider .splide__slide img, #gallery-slider .splide__slide img');
    
    clickableImages.forEach(image => {
        image.addEventListener('click', e => {
            e.preventDefault(); // Zabraňuje nežiaducim akciám
            lightbox.classList.add('show');
            
            const img = document.createElement('img');
            img.src = image.src;
            
            const closeBtn = document.createElement('span');
            closeBtn.classList.add('close-lightbox');
            closeBtn.innerHTML = '&times;';

            // Vymaže predchádzajúci obsah a vloží nový
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            lightbox.appendChild(img);
            lightbox.appendChild(closeBtn);
        });
    });

    // OPRAVA: Správna logika pre zatvorenie lightboxu
    lightbox.addEventListener('click', e => {
        // Zatvorí sa, ak klikneme na pozadie ALEBO na tlačidlo "X"
        if (e.target === e.currentTarget || e.target.classList.contains('close-lightbox')) {
            lightbox.classList.remove('show');
        }
    });

    // Zatváranie pomocou klávesy Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            lightbox.classList.remove('show');
        }
    });

    // --- Hamburger Menu pre mobily ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.querySelector('.nav-links');
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
        });
    }

});
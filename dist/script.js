document.addEventListener('DOMContentLoaded', () => {

    // --- SCROLL TO TOP ON LOAD ---
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // --- GENTLE FADE IN OBSERVER ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial triggers for above-the-fold
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-section .fade-in-up');
        heroElements.forEach(el => el.classList.add('visible'));
    }, 100);

    // Observe scroll triggers
    document.querySelectorAll('.scroll-trigger').forEach(el => {
        fadeObserver.observe(el);
    });

    // --- PHOTO STACK (Gentle Shuffle) ---
    const stackContainer = document.getElementById('memory-stack');
    
    if (stackContainer) {
        stackContainer.addEventListener('click', () => {
            const currentCards = Array.from(stackContainer.children);
            const topCard = currentCards.find(c => c.classList.contains('card-1'));
            
            if (topCard) {
                // Animate top card softly sliding away
                topCard.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s';
                topCard.style.transform = `translate(100px, -50px) rotate(10deg)`;
                topCard.style.opacity = '0';
                
                setTimeout(() => {
                    // Update classes to cycle the stack
                    currentCards.forEach(card => {
                        if (card.classList.contains('card-1')) {
                            card.classList.remove('card-1', 'main-card');
                            card.classList.add('card-3');
                        } else if (card.classList.contains('card-2')) {
                            card.classList.remove('card-2');
                            card.classList.add('card-1', 'main-card');
                        } else if (card.classList.contains('card-3')) {
                            card.classList.remove('card-3');
                            card.classList.add('card-2');
                        }
                        
                        // Reset the styles so CSS classes take over
                        card.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
                        card.style.transform = '';
                        card.style.opacity = '';
                        
                        stackContainer.appendChild(topCard);
                    });
                }, 600);
            }
        });
    }

    // --- YEAR UPDATE ---
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // --- NAV BAR SCROLL EFFECT ---
    const nav = document.querySelector('.cozy-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.transform = 'translate(-50%, -10px)';
            nav.style.opacity = '0.9';
        } else {
            nav.style.transform = 'translate(-50%, 0)';
            nav.style.opacity = '1';
        }
    });

});


    // --- EXACT APPLE PRICING LOCALIZATION ---
    const applePrices = {
        'USD': { label: 'USD ($)', monthly: 1.99, yearly: 14.99, lifetime: 19.99, symbol: '$', locale: 'en-US' },
        'SAR': { label: 'SAR (ر.س)', monthly: 7.99, yearly: 59.99, lifetime: 79.99, symbol: 'ر.س', locale: 'ar-SA' },
        'AED': { label: 'AED (د.إ)', monthly: 7.99, yearly: 59.99, lifetime: 79.99, symbol: 'د.إ', locale: 'ar-AE' },
        'EUR': { label: 'EUR (€)', monthly: 1.99, yearly: 14.99, lifetime: 19.99, symbol: '€', locale: 'de-DE' },
        'GBP': { label: 'GBP (£)', monthly: 1.79, yearly: 12.99, lifetime: 17.99, symbol: '£', locale: 'en-GB' },
        'CAD': { label: 'CAD ($)', monthly: 2.99, yearly: 19.99, lifetime: 24.99, symbol: 'CA$', locale: 'en-CA' },
        'AUD': { label: 'AUD ($)', monthly: 2.99, yearly: 22.99, lifetime: 29.99, symbol: 'AU$', locale: 'en-AU' },
        'JPY': { label: 'JPY (¥)', monthly: 300, yearly: 2200, lifetime: 3000, symbol: '¥', locale: 'ja-JP' },
        'KWD': { label: 'KWD (د.ك)', monthly: 0.69, yearly: 4.99, lifetime: 6.99, symbol: 'د.ك', locale: 'ar-KW' },
        'BHD': { label: 'BHD (ب.د)', monthly: 0.79, yearly: 5.99, lifetime: 7.99, symbol: 'ب.د', locale: 'ar-BH' },
        'QAR': { label: 'QAR (ر.ق)', monthly: 7.99, yearly: 54.99, lifetime: 74.99, symbol: 'ر.ق', locale: 'ar-QA' },
        'OMR': { label: 'OMR (ر.ع.)', monthly: 0.79, yearly: 5.99, lifetime: 7.99, symbol: 'ر.ع.', locale: 'ar-OM' },
        'EGP': { label: 'EGP (ج.م)', monthly: 99.99, yearly: 749.99, lifetime: 999.99, symbol: 'ج.م', locale: 'ar-EG' },
        'JOD': { label: 'JOD (د.أ)', monthly: 1.49, yearly: 10.99, lifetime: 14.99, symbol: 'د.أ', locale: 'ar-JO' },
        'MAD': { label: 'MAD (د.م.)', monthly: 19.99, yearly: 149.99, lifetime: 199.99, symbol: 'د.م.', locale: 'ar-MA' },
        'DZD': { label: 'DZD (د.ج)', monthly: 269.99, yearly: 2000.00, lifetime: 2700.00, symbol: 'د.ج', locale: 'ar-DZ' },
        'TND': { label: 'TND (د.ت)', monthly: 5.99, yearly: 46.99, lifetime: 62.99, symbol: 'د.ت', locale: 'ar-TN' },
        'IQD': { label: 'IQD (ع.د)', monthly: 2600, yearly: 19500, lifetime: 26000, symbol: 'ع.د', locale: 'ar-IQ' },
        'LBP': { label: 'LBP (ل.ل)', monthly: 179000, yearly: 1350000, lifetime: 1790000, symbol: 'ل.ل', locale: 'ar-LB' },
        'LYD': { label: 'LYD (د.ل)', monthly: 9.99, yearly: 74.99, lifetime: 99.99, symbol: 'د.ل', locale: 'ar-LY' }

    };

    const currencySelect = document.getElementById('currency-select');
    
    if (currencySelect) {
        // Populate dropdown
        currencySelect.innerHTML = '';
        Object.keys(applePrices).forEach(code => {
            const opt = document.createElement('option');
            opt.value = code;
            opt.textContent = applePrices[code].label;
            currencySelect.appendChild(opt);
        });

        // Function to update DOM
        const updatePrices = (currencyCode) => {
            if (!applePrices[currencyCode]) currencyCode = 'USD';
            const priceData = applePrices[currencyCode];
            
            document.querySelectorAll('.dynamic-price').forEach(el => {
                const tier = el.getAttribute('data-tier');
                if (priceData[tier]) {
                    // Format correctly based on locale
                    const formatted = new Intl.NumberFormat(priceData.locale, {
                        style: 'currency',
                        currency: currencyCode
                    }).format(priceData[tier]);
                    el.textContent = formatted;
                }
            });
            
            currencySelect.value = currencyCode;
            localStorage.setItem('echo_currency', currencyCode);
        };

        // Event listener
        currencySelect.addEventListener('change', (e) => {
            updatePrices(e.target.value);
        });

        // Detect or load currency
        const savedCurrency = localStorage.getItem('echo_currency');
        if (savedCurrency && applePrices[savedCurrency]) {
            updatePrices(savedCurrency);
        } else {
            // Fetch from IP
            fetch('https://ipapi.co/currency/')
                .then(res => res.text())
                .then(currency => {
                    currency = currency.trim();
                    if (applePrices[currency]) {
                        updatePrices(currency);
                    } else {
                        updatePrices('USD');
                    }
                })
                .catch(() => {
                    updatePrices('USD');
                });
        }
    }



// --- LANGUAGE SWITCHER LOGIC ---
document.querySelectorAll('.language-dropdown').forEach(select => {
    select.addEventListener('change', function() {
        const selectedLang = this.options[this.selectedIndex].getAttribute('data-lang');
        let currentPath = window.location.pathname;
        
        // Supported non-default languages
        const langs = ['ar', 'es', 'fr', 'ja', 'pt-BR'];
        
        // Remove existing lang prefix if present
        for (let l of langs) {
            const prefix = '/' + l;
            if (currentPath.startsWith(prefix + '/') || currentPath === prefix) {
                currentPath = currentPath.substring(prefix.length);
                break;
            }
        }
        
        if (!currentPath.startsWith('/')) currentPath = '/' + currentPath;
        
        // Construct new URL
        if (selectedLang === 'en') {
            window.location.href = currentPath;
        } else {
            // e.g. /privacy -> /ar/privacy
            // e.g. / -> /ar/ (or /ar)
            let newPath = '/' + selectedLang + currentPath;
            // Prevent double slashes like /ar//
            newPath = newPath.replace('//', '/');
            window.location.href = newPath;
        }
    });
});


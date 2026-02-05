// Header scroll
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-md', 'py-3');
        header.classList.remove('py-6');
    } else {
        header.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-md', 'py-3');
        header.classList.add('py-6');
    }
});

// Mobile menu
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

// Reveal
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
revealElements.forEach(el => revealObserver.observe(el));

// Form Submission (CONECTADO A FORMSPREE)
const contactForm = document.getElementById('contact-form');
const formContainer = document.getElementById('contact-form-container');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Estado de carga
        btnText.innerText = "Enviando...";
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-50', 'cursor-not-allowed');

        const formData = new FormData(contactForm);
        
        try {
            // Configurado con el ID: mykprbdn
            const response = await fetch('https://formspree.io/f/mykprbdn', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formContainer.classList.add('hidden');
                successMessage.classList.remove('hidden');
            } else {
                // Si hay error en la respuesta (ej: 400, 500)
                console.error("Error en el envío");
                formContainer.classList.add('hidden');
                errorMessage.classList.remove('hidden');
            }
        } catch (error) {
            // Si hay error de red (offline)
            formContainer.classList.add('hidden');
            errorMessage.classList.remove('hidden');
        }
    });
}

// Carousels (Generic Logic)
document.querySelectorAll('.carousel-container').forEach(container => {
    const slides = container.querySelectorAll('.carousel-slide');
    const dotsContainer = container.querySelector('.carousel-dots');
    let current = 0;
    
    // Si no hay slides o solo hay 1, no activar lógica
    if (!slides.length) return;

    // Limpiar dots previos si existieran (útil si se regenera el DOM)
    dotsContainer.innerHTML = '';

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `h-2 rounded-full transition-all ${i === 0 ? 'bg-navy w-6' : 'bg-navy w-2 opacity-30'} shadow-sm`;
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('button');

    function goTo(idx) {
        current = idx;
        slides.forEach((s, i) => {
            s.classList.toggle('opacity-100', i === idx);
            s.classList.toggle('opacity-0', i !== idx);
            s.classList.toggle('z-10', i === idx);
        });
        dots.forEach((d, i) => {
            d.classList.toggle('w-6', i === idx);
            d.classList.toggle('w-2', i !== idx);
            d.classList.toggle('opacity-100', i === idx);
            d.classList.toggle('opacity-30', i !== idx);
        });
    }

    // Auto-advance cada 5 segundos
    setInterval(() => goTo((current + 1) % slides.length), 5000);
});

// Scroll to Top Button
const scrollBtn = document.getElementById('scroll-top');
if (scrollBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.remove('translate-y-20', 'opacity-0');
        } else {
            scrollBtn.classList.add('translate-y-20', 'opacity-0');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* // Cookies
const banner = document.getElementById('cookie-banner');
if (banner) {
    if (!localStorage.getItem('cookies-accepted')) {
        setTimeout(() => banner.classList.remove('translate-y-full'), 1000);
    }
    document.getElementById('accept-cookies').addEventListener('click', () => {
        localStorage.setItem('cookies-accepted', 'true');
        banner.classList.add('translate-y-full');
    });
    document.getElementById('reject-cookies').addEventListener('click', () => {
        banner.classList.add('translate-y-full');
    });
}
*/
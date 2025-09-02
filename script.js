document.addEventListener('DOMContentLoaded', () => {
    // ===== MOBILE MENU TOGGLE =====
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const hamburgers = document.querySelectorAll('.hamburger');

    mobileBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');

        hamburgers.forEach((bar, i) => {
            if (mobileNav.classList.contains('active')) {
                bar.style.transform = i === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                                    i === 2 ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
                if(i === 1) bar.style.opacity = '0';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            hamburgers.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== MODAL FUNCTIONS =====
    const reservationModal = document.getElementById('reservationModal');

    function showModal() {
        reservationModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        reservationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    document.querySelectorAll('.reserve-btn').forEach(btn => btn.addEventListener('click', showModal));
    window.addEventListener('click', e => { if(e.target === reservationModal) hideModal(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape') hideModal(); });

    // ===== TOAST NOTIFICATIONS =====
    const toast = document.getElementById('toast');
    function showToast(title, message) {
        toast.querySelector('.toast-text h4').textContent = title;
        toast.querySelector('#toastMessage').textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 5000);
    }

    // ===== FORM HANDLING =====
    function handleForm(formId, successTitle, successMessage) {
        const form = document.getElementById(formId);
        form.addEventListener('submit', e => {
            e.preventDefault();
            const data = new FormData(form);
            for(let [key, value] of data.entries()) {
                if(!value) return showToast('Error', 'Please fill in all required fields.');
            }

            setTimeout(() => {
                showToast(successTitle, successMessage(data));
                form.reset();
                if(formId === 'reservationForm') hideModal();
            }, 1000);
        });
    }

    handleForm('reservationForm', 'Reservation Confirmed!', data => 
        `Your table for ${data.get('guests')} on ${new Date(data.get('date')).toLocaleDateString()} at ${data.get('time')} has been reserved.`
    );

    handleForm('contactForm', 'Message Sent!', () => 'Thank you for your message. We\'ll get back to you within 24 hours.');

    // ===== MINIMUM DATE FOR RESERVATION =====
    const resDate = document.getElementById('resDate');
    if(resDate) resDate.min = new Date().toISOString().split('T')[0];

    // ===== NAVBAR BACKGROUND ON SCROLL =====
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.style.background = window.scrollY > 50 ? 'rgba(26,26,26,0.98)' : 'rgba(26,26,26,0.95)';
    });

    // ===== ANIMATION ON SCROLL =====
    const animateElements = document.querySelectorAll('.feature-card, .staff-card, .review-card, .menu-item');

    function animateOnScroll() {
        animateElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight && !el.classList.contains('animated')) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    el.classList.add('animated');
                }, 100);
            }
        });
    }
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // ===== HERO SECTION ANIMATION =====
    const hero = document.querySelector('.hero-content');
    if(hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(30px)';
        hero.style.transition = 'opacity 1s ease, transform 1s ease';
        setTimeout(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 300);
    }

    // ===== BUTTON LOADING STATE =====
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', () => {
            const btn = form.querySelector('button[type="submit"]');
            if(btn) {
                const original = btn.innerHTML;
                btn.disabled = true;
                btn.textContent = 'Sending...';
                setTimeout(() => {
                    btn.disabled = false;
                    btn.innerHTML = original;
                }, 1000);
            }
        });
    });
});
function getBurgerElements() {
    return {
        burger: document.querySelector('.burger-btn'),
        menu: document.querySelector('.mobile-menu'),
        overlay: document.querySelector('.mobile-overlay')
    };
}

function openBurgerMenu() {
    const { burger, menu, overlay } = getBurgerElements();
    if (!burger || !menu || !overlay) return;

    burger.classList.add('active');
    menu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBurgerMenu() {
    const { burger, menu, overlay } = getBurgerElements();
    if (!burger || !menu || !overlay) return;

    burger.classList.remove('active');
    menu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function toggleBurgerMenu() {
    const { menu } = getBurgerElements();
    if (!menu) return;

    if (menu.classList.contains('active')) closeBurgerMenu();
    else openBurgerMenu();
}

function initBurger() {
    if (document.body.dataset.burgerReady === 'true') return;
    document.body.dataset.burgerReady = 'true';

    document.addEventListener('click', (event) => {
        if (event.target.closest('.burger-btn')) {
            event.preventDefault();
            toggleBurgerMenu();
            return;
        }

        if (event.target.closest('.mobile-overlay')) {
            closeBurgerMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeBurgerMenu();
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBurger);
} else {
    initBurger();
}

window.initBurger = initBurger;
window.closeBurgerMenu = closeBurgerMenu;

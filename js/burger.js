function initBurger() {
    const burger = document.querySelector('.burger-btn');
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-overlay');

    if (!burger || !menu || !overlay) return;

    function openMenu() {
        burger.classList.add('active');
        menu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        burger.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    burger.removeEventListener('click', openCloseHandler);
    overlay.removeEventListener('click', closeMenu);

    function openCloseHandler() {
        if (menu.classList.contains('active')) closeMenu();
        else openMenu();
    }

    burger.addEventListener('click', openCloseHandler);
    overlay.addEventListener('click', closeMenu);
}

document.addEventListener('DOMContentLoaded', initBurger);

window.initBurger = initBurger;
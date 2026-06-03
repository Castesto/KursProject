function normalizeInsertedLinks(root) {
    try {
        const anchors = root.querySelectorAll('a');
        anchors.forEach(a => {
            const href = a.getAttribute('href');
            if (!href) return;

            const skip = href.startsWith('http') ||
                href.startsWith('/') ||
                href.startsWith('#') ||
                href.startsWith('mailto:') ||
                href.includes('://') ||
                href.startsWith('viber:');

            if (!skip) {
                const newHref = href.startsWith('./') ? '/' + href.slice(2) : '/' + href;
                a.setAttribute('href', newHref);
            }
        });

        const imgs = root.querySelectorAll('img');
        imgs.forEach(img => {
            const src = img.getAttribute('src');
            if (!src) return;
            if (!src.startsWith('/') && !src.startsWith('http')) {
                img.setAttribute('src', '/' + src);
            }
        });
    } catch (e) {
        console.error('normalizeInsertedLinks error', e);
    }
}

function setActiveMenuLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.menu a');

    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        const linkPath = href ? href.split('/').pop() : '';
        if (linkPath === currentPath) {
            link.parentElement.classList.add('active');
        }
    });
}

function initAppointmentButton() {
    const appointmentBtn = document.querySelector('.buttonMakeAppo');
    if (!appointmentBtn) return;

    const newBtn = appointmentBtn.cloneNode(true);
    appointmentBtn.parentNode.replaceChild(newBtn, appointmentBtn);
    newBtn.addEventListener('click', () => {
        window.location.href = 'appointment.html';
    });
}

async function includeLayout() {
    const headerElement = document.querySelector('header');
    const footerElement = document.querySelector('footer');

    try {
        if (headerElement) {
            const headerResponse = await fetch('components/header.html');
            headerElement.innerHTML = await headerResponse.text();
            normalizeInsertedLinks(headerElement);
            setActiveMenuLink();

            if (typeof updateAuthUI === 'function') updateAuthUI();
            if (typeof window.initBurger === 'function') window.initBurger();
            initAppointmentButton();

            window.dispatchEvent(new CustomEvent('headerloaded'));
        }
    } catch (err) {
        console.error('Ошибка загрузки шапки:', err);
    }

    try {
        if (footerElement) {
            const footerResponse = await fetch('components/footer.html');
            footerElement.innerHTML = await footerResponse.text();
            normalizeInsertedLinks(footerElement);
        }
    } catch (err) {
        console.error('Ошибка загрузки подвала:', err);
    }

    if (typeof window.initVideoModal === 'function') {
        window.initVideoModal();
    }
    if (typeof window.removePreloader === 'function') {
        window.removePreloader();
    }
}

document.addEventListener('DOMContentLoaded', includeLayout);

window.addEventListener && window.addEventListener('localechange', () => {
    try {
        if (typeof updateAuthUI === 'function') updateAuthUI();
    } catch (e) {}
});

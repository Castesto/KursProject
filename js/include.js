document.addEventListener('DOMContentLoaded', async function () {
    try {
        const headerResponse = await fetch('components/header.html');
        const headerHtml = await headerResponse.text();
        document.querySelector('header').innerHTML = headerHtml;

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const menuLinks = document.querySelectorAll('.menu a');
        menuLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath) {
                link.parentElement.classList.add('active');
            }
        });
    } catch (err) {
        console.error('Ошибка загрузки шапки:', err);
    }

    try {
        const footerResponse = await fetch('components/footer.html');
        const footerHtml = await footerResponse.text();
        document.querySelector('footer').innerHTML = footerHtml;
    } catch (err) {
        console.error('Ошибка загрузки подвала:', err);
    }
});

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const headerResponse = await fetch('components/header.html');
        const headerHtml = await headerResponse.text();
        document.querySelector('header').innerHTML = headerHtml;

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const menuLinks = document.querySelectorAll('.menu a');
        menuLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath) {
                link.parentElement.classList.add('active');
            }
        });

        if (typeof updateAuthUI === 'function') {
            updateAuthUI();
        }
    } catch (err) {
        console.error('Ошибка загрузки шапки:', err);
    }

    try {
        const footerResponse = await fetch('components/footer.html');
        const footerHtml = await footerResponse.text();
        document.querySelector('footer').innerHTML = footerHtml;
    } catch (err) {
        console.error('Ошибка загрузки подвала:', err);
    }
});

if (typeof updateAuthUI === 'function') {
    updateAuthUI();
}

const appointmentBtn = document.querySelector('.buttonMakeAppo');
if (appointmentBtn) {
    appointmentBtn.addEventListener('click', (e) => {
        window.location.href = 'appointment.html';
    });
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const headerResponse = await fetch('components/header.html');
        const headerHtml = await headerResponse.text();
        document.querySelector('header').innerHTML = headerHtml;

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const menuLinks = document.querySelectorAll('.menu a');
        menuLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath) {
                link.parentElement.classList.add('active');
            }
        });

        if (typeof updateAuthUI === 'function') updateAuthUI();

        const appointmentBtn = document.querySelector('.buttonMakeAppo');
        if (appointmentBtn) {
            appointmentBtn.addEventListener('click', () => {
                window.location.href = 'appointment.html';
            });
        }
    } catch (err) {
        console.error('Ошибка загрузки шапки:', err);
    }

    try {
        const footerResponse = await fetch('components/footer.html');
        const footerHtml = await footerResponse.text();
        document.querySelector('footer').innerHTML = footerHtml;
    } catch (err) {
        console.error('Ошибка загрузки подвала:', err);
    }
});

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const headerResponse = await fetch('components/header.html');
        const headerHtml = await headerResponse.text();
        const headerElement = document.querySelector('header');
        if (headerElement) {
            headerElement.innerHTML = headerHtml;
        }

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const menuLinks = document.querySelectorAll('.menu a');
        menuLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath) {
                link.parentElement.classList.add('active');
            }
        });

        if (typeof updateAuthUI === 'function') {
            updateAuthUI();
        }

        if (typeof window.initBurger === 'function') {
            window.initBurger();
        }

        const appointmentBtn = document.querySelector('.buttonMakeAppo');
        if (appointmentBtn) {
            const newBtn = appointmentBtn.cloneNode(true);
            appointmentBtn.parentNode.replaceChild(newBtn, appointmentBtn);
            newBtn.addEventListener('click', () => {
                window.location.href = 'appointment.html';
            });
        }
    } catch (err) {
        console.error('Ошибка загрузки шапки:', err);
    }

    try {
        const footerResponse = await fetch('components/footer.html');
        const footerHtml = await footerResponse.text();
        const footerElement = document.querySelector('footer');
        if (footerElement) {
            footerElement.innerHTML = footerHtml;
        }
    } catch (err) {
        console.error('Ошибка загрузки подвала:', err);
    }

    if (typeof window.initVideoModal === 'function') {
        window.initVideoModal();
    }
});



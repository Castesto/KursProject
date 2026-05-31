document.addEventListener('DOMContentLoaded', async function () {
    function normalizeInsertedLinks(root){
        try{
            const anchors = root.querySelectorAll('a');
            anchors.forEach(a => {
                const href = a.getAttribute('href');
                if(!href) return;
                const skip = href.startsWith('http') || href.startsWith('/') || href.startsWith('#') || href.startsWith('mailto:') || href.includes('://') || href.startsWith('viber:');
                if(!skip){
                    // make root-relative to avoid resolving relative to components folder
                    const newHref = href.startsWith('./') ? '/' + href.slice(2) : '/' + href;
                    a.setAttribute('href', newHref);
                }
            });
            // also normalize img src that accidentally point to relative paths starting without /
            const imgs = root.querySelectorAll('img');
            imgs.forEach(img => {
                const src = img.getAttribute('src');
                if(!src) return;
                if(!src.startsWith('/') && !src.startsWith('http')){
                    img.setAttribute('src', '/' + src);
                }
            });
        }catch(e){
            console.error('normalizeInsertedLinks error', e);
        }
    }
    try {
        const headerResponse = await fetch('components/header.html');
        const headerHtml = await headerResponse.text();
    document.querySelector('header').innerHTML = headerHtml;
    normalizeInsertedLinks(document.querySelector('header'));
    if(typeof window.removePreloader === 'function') window.removePreloader();

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
    normalizeInsertedLinks(document.querySelector('footer'));
    if(typeof window.removePreloader === 'function') window.removePreloader();
    } catch (err) {
        console.error('Ошибка загрузки подвала:', err);
    }
});

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const headerResponse = await fetch('components/header.html');
        const headerHtml = await headerResponse.text();
    document.querySelector('header').innerHTML = headerHtml;
    normalizeInsertedLinks(document.querySelector('header'));

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
    normalizeInsertedLinks(document.querySelector('footer'));
    if(typeof window.removePreloader === 'function') window.removePreloader();
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
    normalizeInsertedLinks(document.querySelector('header'));
    if(typeof window.removePreloader === 'function') window.removePreloader();

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
    normalizeInsertedLinks(document.querySelector('footer'));
    if(typeof window.removePreloader === 'function') window.removePreloader();
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
            normalizeInsertedLinks(headerElement);
            if(typeof window.removePreloader === 'function') window.removePreloader();
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
            normalizeInsertedLinks(footerElement);
            if(typeof window.removePreloader === 'function') window.removePreloader();
        }
    } catch (err) {
        console.error('Ошибка загрузки подвала:', err);
    }

    if (typeof window.initVideoModal === 'function') {
        window.initVideoModal();
    }
    if(typeof window.removePreloader === 'function') window.removePreloader();
});



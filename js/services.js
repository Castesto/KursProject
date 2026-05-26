async function getServices() {
    const response = await fetch('bd.json');
    const data = await response.json();
    return data.services;
}

async function renderServices() {
    const services = await getServices();
    const container = document.querySelector('.servicesCards');
    if (!container) return;

    container.innerHTML = services.map(service => `
        <div class="card">
            <div class="titleAndPhoto">
                <div class="cardTitle">${service.title}</div>
                <div class="cardPhoto"><img src="${service.img}" alt=""></div>
            </div>
            <div class="cardMore">
                <a href="${service.ref}">
                    <img src="images/moreButton.png" alt="Подробнее">
                </a>
            </div>
        </div>
    `).join('');
}

renderServices();
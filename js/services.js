let allServices = [];

async function getServices() {
    const response = await fetch('bd.json');
    const data = await response.json();
    allServices = data.services;
    return allServices;
}

function renderServices(filterText = '') {
    const container = document.querySelector('.servicesCards');
    if (!container) return;
    const lowerFilter = filterText.toLowerCase();
    const filtered = allServices.filter(service => 
        service.title.toLowerCase().includes(lowerFilter) || 
        (service.description && service.description.toLowerCase().includes(lowerFilter))
    );
    container.innerHTML = filtered.map(service => `
        <div class="card">
            <div class="titleAndPhoto">
                <div class="cardTitle">${service.title}</div>
                <div class="cardPhoto"><img src="${service.img}" alt=""></div>
            </div>
            <div class="cardMore">
                <a href="service-detail.html?id=${service.id}">
                    <img src="images/moreButton.png" alt="Подробнее">
                </a>
            </div>
        </div>
    `).join('');
}

async function initServices() {
    await getServices();
    renderServices();
    const searchInput = document.getElementById('serviceSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderServices(e.target.value);
        });
    }
}

initServices();
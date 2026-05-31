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
        (service.title && service.title.toLowerCase().includes(lowerFilter)) || 
        (service.description && service.description.toLowerCase().includes(lowerFilter)) ||
        (service.title_en && service.title_en.toLowerCase().includes(lowerFilter)) ||
        (service.description_en && service.description_en.toLowerCase().includes(lowerFilter))
    );
    const locale = (window.i18nData && window.i18nData.getLocale && window.i18nData.getLocale()) || 'ru';
    container.innerHTML = filtered.map(service => {
        const title = (locale === 'en' && service.title_en) ? service.title_en : service.title;
        const img = service.img || '';
        return `
        <div class="card">
            <div class="titleAndPhoto">
                <div class="cardTitle">${title}</div>
                <div class="cardPhoto"><img src="${img}" alt=""></div>
            </div>
            <div class="cardMore">
                <a href="service-detail.html?id=${service.id}">
                    <img src="images/moreButton.png" alt="Подробнее">
                </a>
            </div>
        </div>
    `}).join('');
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

// re-render services when locale changes so titles/descriptions update
window.addEventListener('localechange', async () => {
    const searchInput = document.getElementById('serviceSearch');
    const filter = searchInput ? searchInput.value : '';
    await getServices();
    renderServices(filter);
    if (window.i18nData && window.i18nData.applyTranslations) window.i18nData.applyTranslations(document);
});

initServices();
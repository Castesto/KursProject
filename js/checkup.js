async function loadCheckups() {
    const res = await fetch('bd.json');
    const data = await res.json();
    const checkups = data.checkups || [];
    const container = document.querySelector('.checkupCardsBox');
    if (!container) return;
    
    const locale = (window.i18nData && window.i18nData.getLocale && window.i18nData.getLocale()) || 'ru';
    container.innerHTML = checkups.map(checkup => {
        const title = (locale === 'en' && checkup.title_en) ? checkup.title_en : checkup.title;
        const desc = (locale === 'en' && checkup.description_en) ? checkup.description_en : checkup.description;
        return `
        <div class="checkUpPriceCard" data-id="${checkup.id}">
            <div class="priceTitle">${title}</div>
            <div class="priceInfo">${desc}</div>
            <div class="priceCount">${checkup.price} ₽</div>
            <div class="petPriceImage"><img src="${checkup.img}" alt="${title}"></div>
        </div>
    `
    }).join('');

    document.querySelectorAll('.checkUpPriceCard').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            window.location.href = `checkup-detail.html?id=${id}`;
        });
        card.style.cursor = 'pointer';
    });
}

document.addEventListener('DOMContentLoaded', loadCheckups);
// re-load checkups when locale changes
window.addEventListener('localechange', () => {
    // reload and reapply translations
    loadCheckups().then(() => {
        if(window.i18nData && window.i18nData.applyTranslations) window.i18nData.applyTranslations(document);
    });
});
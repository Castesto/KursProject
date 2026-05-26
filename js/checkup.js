async function loadCheckups() {
    const res = await fetch('bd.json');
    const data = await res.json();
    const checkups = data.checkups || [];
    const container = document.querySelector('.checkupCardsBox');
    if (!container) return;
    container.innerHTML = checkups.map(card => `
        <div class="checkUpPriceCard">
            <div class="priceTitle">${card.title}</div>
            <div class="priceInfo">${card.description}</div>
            <div class="priceCount">${card.price} ₽</div>
            <div class="petPriceImage"><img src="${card.img}" alt=""></div>
        </div>
    `).join('');
}
document.addEventListener('DOMContentLoaded', loadCheckups);
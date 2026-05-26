async function loadCheckups() {
    const res = await fetch('bd.json');
    const data = await res.json();
    const checkups = data.checkups || [];
    const container = document.querySelector('.checkupCardsBox');
    if (!container) return;
    
    container.innerHTML = checkups.map(checkup => `
        <div class="checkUpPriceCard" data-id="${checkup.id}">
            <div class="priceTitle">${checkup.title}</div>
            <div class="priceInfo">${checkup.description}</div>
            <div class="priceCount">${checkup.price} ₽</div>
            <div class="petPriceImage"><img src="${checkup.img}" alt="${checkup.title}"></div>
        </div>
    `).join('');

    document.querySelectorAll('.checkUpPriceCard').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            window.location.href = `checkup-detail.html?id=${id}`;
        });
        card.style.cursor = 'pointer';
    });
}

document.addEventListener('DOMContentLoaded', loadCheckups);
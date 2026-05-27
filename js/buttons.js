document.querySelector('.historyButton').addEventListener('click', function () {
    window.location.href = 'about-cat.html';
});

const moreSpecialistsBtn = document.querySelector('.moreSpecialistsButton');
if (moreSpecialistsBtn) {
    moreSpecialistsBtn.addEventListener('click', () => {
        window.location.href = 'medics.html';
    });
}

const yandexMapBtn = document.querySelector('.yandexMap');
if (yandexMapBtn) {
    yandexMapBtn.addEventListener('click', () => {
        const address = encodeURIComponent('Краснодар, ул. Пушкина 14');
        window.open(`https://yandex.ru/maps/?text=${address}`, '_blank');
    });
}

const gisMapBtn = document.querySelector('.gisMap');
if (gisMapBtn) {
    gisMapBtn.addEventListener('click', () => {
        const address = encodeURIComponent('Краснодар ул. Пушкина 14');
        window.open(`https://2gis.ru/krasnodar/search/${address}`, '_blank');
    });
}
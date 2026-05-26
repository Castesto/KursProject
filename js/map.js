function initVetMap() {
    const mapDiv = document.getElementById('vetMap');
    if (!mapDiv) return;
    
    const map = new ymaps.Map(mapDiv, {
        center: [45.041226, 38.980440],
        zoom: 17,
        controls: ['zoomControl', 'fullscreenControl']
    });
    
    const placemark = new ymaps.Placemark([45.041226, 38.980440], {
        balloonContent: 'VetMajor<br>Краснодар, ул. Пушкина 14'
    });
    
    map.geoObjects.add(placemark);
}

if (typeof ymaps !== 'undefined') {
    ymaps.ready(initVetMap);
} else {
    window.addEventListener('load', function() {
        if (typeof ymaps !== 'undefined') {
            ymaps.ready(initVetMap);
        } else {
            console.error('Yandex Maps API not loaded');
        }
    });
}
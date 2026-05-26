async function loadServiceDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');
    if (!serviceId) {
        document.getElementById('serviceDetail').innerHTML = '<p>Услуга не найдена</p>';
        return;
    }
    const res = await fetch('bd.json');
    const data = await res.json();
    const service = data.services.find(s => s.id === serviceId);
    if (!service) {
        document.getElementById('serviceDetail').innerHTML = '<p>Услуга не найдена</p>';
        return;
    }
    document.getElementById('serviceTitle').innerText = service.title;
    document.getElementById('serviceDescription').innerText = service.description;
    document.getElementById('servicePrice').innerText = service.price + ' ₽';
    
    const img = document.getElementById('serviceAnimalImg');
    img.src = service.animalImg || service.img;
    img.onerror = () => {
        img.src = service.img;
        img.onerror = null;
    };
    
    window.currentService = service;
    
    const addBtn = document.getElementById('addToCartBtn');
    if (addBtn) {
        addBtn.onclick = () => {
            const user = getCurrentUser();
            if (!user) {
                showNotification('Войдите или зарегистрируйтесь, чтобы добавить услугу в корзину', 'error');
                setTimeout(() => window.location.href = 'login.html', 1500);
                return;
            }
            addToCart(window.currentService);
        };
    }
}
loadServiceDetail();
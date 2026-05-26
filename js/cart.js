const CART_KEY = 'vet_cart';

function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(service) {
    const cart = getCart();
    const existing = cart.find(item => item.id === service.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...service, quantity: 1 });
    }
    saveCart(cart);
    showNotification('Товар добавлен в корзину', 'success');
}

function renderCart() {
    const cart = getCart();
    const container = document.getElementById('cartItems');
    const totalSpan = document.getElementById('cartTotal');
    
    if (!cart.length) {
        container.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
        totalSpan.innerText = '0';
        return;
    }
    
    let total = 0;
    container.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img class="cart-item-img" src="${item.img}" alt="${item.title}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">${item.price} ₽</div>
            </div>
            <div class="cart-item-quantity">
                <button data-index="${index}" data-delta="-1">-</button>
                <span>${item.quantity}</span>
                <button data-index="${index}" data-delta="1">+</button>
            </div>
            <button class="delete-item" data-index="${index}">Удалить</button>
        `;
        container.appendChild(itemDiv);
    });
    
    totalSpan.innerText = total;
    
    document.querySelectorAll('.cart-item-quantity button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.dataset.index);
            const delta = parseInt(btn.dataset.delta);
            updateQuantity(index, delta);
        });
    });
    
    document.querySelectorAll('.delete-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.dataset.index);
            removeItem(index);
        });
    });
}

function updateQuantity(index, delta) {
    const cart = getCart();
    const item = cart[index];
    if (item) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) {
            cart.splice(index, 1);
        } else {
            item.quantity = newQty;
        }
        saveCart(cart);
        renderCart();
    }
}

function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

function checkout() {
    const user = getCurrentUser();
    if (!user) {
        showNotification('Войдите в аккаунт, чтобы оформить заказ', 'error');
        window.location.href = 'login.html';
        return;
    }
    const cart = getCart();
    if (!cart.length) {
        showNotification('Корзина пуста', 'info');
        return;
    }
    saveCart([]);
    showNotification('Заказ оформлен! Спасибо за покупку.', 'success');
    renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
});
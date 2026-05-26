async function loadCheckupDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const checkupId = urlParams.get('id');
    if (!checkupId) {
        document.getElementById('checkupDetail').innerHTML = '<p>Чек-ап не найден</p>';
        return;
    }

    try {
        const res = await fetch('bd.json');
        const data = await res.json();
        const checkup = data.checkups.find(c => c.id === checkupId);
        if (!checkup) {
            document.getElementById('checkupDetail').innerHTML = '<p>Чек-ап не найден</p>';
            return;
        }

        document.getElementById('checkupTitle').innerText = checkup.title;
        document.getElementById('checkupDescription').innerText = checkup.description;
        document.getElementById('checkupPrice').innerText = checkup.price + ' ₽';
        const img = document.getElementById('checkupImg');
        img.src = checkup.img;
        img.alt = checkup.title;
        img.onerror = () => {
            img.src = 'images/centerPhoto.png';
        };

        window.currentCheckup = {
            id: checkup.id,
            title: checkup.title,
            price: checkup.price,
            img: checkup.img,
            description: checkup.description
        };

        const addBtn = document.getElementById('addToCartBtn');
        if (addBtn) {
            addBtn.onclick = () => {
                const user = getCurrentUser();
                if (!user) {
                    showNotification('Войдите или зарегистрируйтесь, чтобы добавить чек-ап в корзину', 'error');
                    setTimeout(() => window.location.href = 'login.html', 1500);
                    return;
                }
                addToCart(window.currentCheckup);
            };
        }
    } catch (err) {
        console.error(err);
        document.getElementById('checkupDetail').innerHTML = '<p>Ошибка загрузки данных</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadCheckupDetail);
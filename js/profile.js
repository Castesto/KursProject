async function loadProfile() {
    let user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const resp = await fetch(`${API_URL}/users/${user.id}`);
        if (resp.ok) {
            const freshUser = await resp.json();
            setCurrentUser(freshUser);
            user = freshUser;
        }
    } catch (err) {
        console.warn('Не удалось обновить данные', err);
    }

    const container = document.getElementById('profileContainer');
    if (!container) {
        console.error('Контейнер profileContainer не найден');
        return;
    }

    if (user.isAdmin) {
        container.innerHTML = `
            <h2>Админ-панель</h2>
            <div class="admin-section">
                <h3>Управление пользователями</h3>
                <div id="usersList"></div>
            </div>
        `;
        await loadUsers();
    } else {
        container.innerHTML = `
            <h2>Мой профиль</h2>
            <form class="profile-form" id="profileForm">
                <div class="form-group"><label>Имя</label><input type="text" id="firstName" value="${user.firstName || ''}" required></div>
                <div class="form-group"><label>Фамилия</label><input type="text" id="lastName" value="${user.lastName || ''}" required></div>
                <div class="form-group"><label>Отчество</label><input type="text" id="patronymic" value="${user.patronymic || ''}"></div>
                <div class="form-group"><label>Email</label><input type="email" id="email" value="${user.email || ''}" required></div>
                <div class="form-group"><label>Телефон</label><input type="tel" id="phone" value="${user.phone || ''}" required></div>
                <div class="form-group"><label>Новый пароль</label><input type="password" id="newPassword" placeholder="Новый пароль"></div>
                <div class="form-group"><label>Подтверждение пароля</label><input type="password" id="confirmPassword" placeholder="Подтвердите пароль"></div>
                <button type="submit">Сохранить изменения</button>
            </form>
        `;
        const form = document.getElementById('profileForm');
        if (form) form.addEventListener('submit', updateProfile);
    }
}

document.addEventListener('DOMContentLoaded', loadProfile);
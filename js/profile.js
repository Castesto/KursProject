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
            if (typeof updateAuthUI === 'function') updateAuthUI();
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
        <div class="admin-section">
            <div id="servicesAdminList"></div>
        </div>
        <div class="admin-section">
            <div id="checkupsAdminList"></div>
        </div>
        <div class="admin-section">
            <div id="doctorsAdminList"></div>
        </div>
    `;
        await loadUsers();
        await loadServicesAdmin();
        await loadCheckupsAdmin();
        await loadDoctorsAdmin();
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

async function loadServicesAdmin() {
    const res = await fetch(`${API_URL}/services`);
    const services = await res.json();
    const container = document.getElementById('servicesAdminList');
    if (!container) return;
    container.innerHTML = `
        <h4>Услуги</h4>
        <table class="admin-table">
            <tr><th>Название</th><th>Цена</th><th>Действия</th></tr>
            ${services.map(s => `
                <tr>
                    <td>${s.title}</td>
                    <td>${s.price} ₽</td>
                    <td><button class="delete-service" data-id="${s.id}">Удалить</button></td>
                </tr>
            `).join('')}
        </table>
        <h5>Добавить услугу</h5>
        <form id="addServiceForm">
            <input type="text" id="serviceTitle" placeholder="Название" required>
            <input type="text" id="serviceImg" placeholder="Путь к картинке" value="images/">
            <input type="text" id="serviceDesc" placeholder="Описание">
            <input type="number" id="servicePrice" placeholder="Цена" required>
            <button type="submit">Добавить</button>
        </form>
    `;
    document.querySelectorAll('.delete-service').forEach(btn => {
        btn.onclick = () => deleteService(btn.dataset.id);
    });
    document.getElementById('addServiceForm')?.addEventListener('submit', addService);
}

async function addService(e) {
    e.preventDefault();
    const newService = {
        title: document.getElementById('serviceTitle').value,
        img: document.getElementById('serviceImg').value,
        description: document.getElementById('serviceDesc').value,
        price: Number(document.getElementById('servicePrice').value),
        animalImg: document.getElementById('serviceImg').value,
        ref: 'service-detail.html'
    };
    const res = await fetch(`${API_URL}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService)
    });
    if (res.ok) {
        showNotification('Услуга добавлена', 'success');
        loadServicesAdmin();
    } else showNotification('Ошибка', 'error');
}

async function deleteService(id) {
    const res = await fetch(`${API_URL}/services/${id}`, { method: 'DELETE' });
    if (res.ok) {
        showNotification('Услуга удалена', 'success');
        loadServicesAdmin();
    } else showNotification('Ошибка', 'error');
}

async function loadCheckupsAdmin() {
    const res = await fetch(`${API_URL}/checkups`);
    const checkups = await res.json();
    const container = document.getElementById('checkupsAdminList');
    if (!container) return;
    container.innerHTML = `
        <h4>Чек-ап</h4>
        <table class="admin-table">
            <tr><th>Название</th><th>Цена</th><th>Действия</th></tr>
            ${checkups.map(c => `
                <tr>
                    <td>${c.title}</td>
                    <td>${c.price} ₽</td>
                    <td><button class="delete-checkup" data-id="${c.id}">Удалить</button></td>
                </tr>
            `).join('')}
        </table>
        <h5>Добавить чек-ап</h5>
        <form id="addCheckupForm">
            <input type="text" id="checkupTitle" placeholder="Название" required>
            <input type="text" id="checkupDesc" placeholder="Описание">
            <input type="number" id="checkupPrice" placeholder="Цена" required>
            <input type="text" id="checkupImg" placeholder="Путь к картинке" value="images/хомяк.png">
            <button type="submit">Добавить</button>
        </form>
    `;
    document.querySelectorAll('.delete-checkup').forEach(btn => {
        btn.onclick = () => deleteCheckup(btn.dataset.id);
    });
    document.getElementById('addCheckupForm')?.addEventListener('submit', addCheckup);
}

async function addCheckup(e) {
    e.preventDefault();
    const newCheckup = {
        title: document.getElementById('checkupTitle').value,
        description: document.getElementById('checkupDesc').value,
        price: Number(document.getElementById('checkupPrice').value),
        img: document.getElementById('checkupImg').value
    };
    const res = await fetch(`${API_URL}/checkups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCheckup)
    });
    if (res.ok) {
        showNotification('Чек-ап добавлен', 'success');
        loadCheckupsAdmin();
    } else showNotification('Ошибка', 'error');
}

async function deleteCheckup(id) {
    const res = await fetch(`${API_URL}/checkups/${id}`, { method: 'DELETE' });
    if (res.ok) {
        showNotification('Чек-ап удалён', 'success');
        loadCheckupsAdmin();
    } else showNotification('Ошибка', 'error');
}

async function loadUsers() {
    const res = await fetch(`${API_URL}/users`);
    const users = await res.json();
    const container = document.getElementById('usersList');
    if (!container) return;
    container.innerHTML = `
        <table class="admin-table">
            <tr><th>Логин</th><th>Email</th><th>Роль</th></tr>
            ${users.map(u => `
                <tr>
                    <td>${u.username}</td>
                    <td>${u.email || ''}</td>
                    <td>${u.isAdmin ? 'Админ' : 'Пользователь'}</td>
                </tr>
            `).join('')}
        </table>
    `;
}

async function loadDoctorsAdmin() {
    const res = await fetch(`${API_URL}/doctors`);
    const doctors = await res.json();
    const container = document.getElementById('doctorsAdminList');
    if (!container) return;
    container.innerHTML = `
        <h4>Врачи</h4>
        <table class="admin-table">
            <tr><th>Имя</th><th>Должность</th><th>Действия</th></tr>
            ${doctors.map(d => `
                <tr>
                    <td>${d.name}</td>
                    <td>${d.position}</td>
                    <td><button class="delete-doctor" data-id="${d.id}">Удалить</button></td>
                </tr>
            `).join('')}
        </table>
        <h5>Добавить врача</h5>
        <form id="addDoctorForm">
            <input type="text" id="doctorName" placeholder="ФИО" required>
            <input type="text" id="doctorPosition" placeholder="Должность" required>
            <input type="text" id="doctorPhoto" placeholder="Путь к фото" value="images/">
            <button type="submit">Добавить</button>
        </form>
    `;
    document.querySelectorAll('.delete-doctor').forEach(btn => {
        btn.onclick = () => deleteDoctor(btn.dataset.id);
    });
    document.getElementById('addDoctorForm')?.addEventListener('submit', addDoctor);
}

async function addDoctor(e) {
    e.preventDefault();
    const newDoctor = {
        name: document.getElementById('doctorName').value,
        position: document.getElementById('doctorPosition').value,
        photo: document.getElementById('doctorPhoto').value
    };
    const res = await fetch(`${API_URL}/doctors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDoctor)
    });
    if (res.ok) {
        showNotification('Врач добавлен', 'success');
        loadDoctorsAdmin();
    } else showNotification('Ошибка', 'error');
}

async function deleteDoctor(id) {
    const res = await fetch(`${API_URL}/doctors/${id}`, { method: 'DELETE' });
    if (res.ok) {
        showNotification('Врач удалён', 'success');
        loadDoctorsAdmin();
    } else showNotification('Ошибка', 'error');
}

document.addEventListener('DOMContentLoaded', loadProfile);

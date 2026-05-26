const API_URL = 'http://localhost:3000';

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
    if (user) localStorage.setItem('currentUser', JSON.stringify(user));
    else localStorage.removeItem('currentUser');
}

async function register(firstName, lastName, patronymic, email, phone, username, password) {
    const users = await fetch(`${API_URL}/users`).then(r => r.json());
    if (users.find(u => u.username === username)) {
        return { success: false, message: 'Пользователь с таким логином уже существует' };
    }
    if (users.find(u => u.email === email)) {
        return { success: false, message: 'Пользователь с таким email уже существует' };
    }
    const newUser = {
        username,
        password,
        firstName,
        lastName,
        patronymic,
        email,
        phone,
        isAdmin: false,
        purchaseHistory: []
    };
    const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    });
    if (res.ok) return { success: true };
    return { success: false, message: 'Ошибка сервера' };
}

async function login(username, password) {
    const users = await fetch(`${API_URL}/users`).then(r => r.json());
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return { success: false, message: 'Неверный логин или пароль' };
    }
    setCurrentUser({ 
        id: user.id, 
        username: user.username, 
        isAdmin: user.isAdmin,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
    });
    return { success: true };
}

function logout() {
    setCurrentUser(null);
    window.location.href = 'index.html';
}

function updateAuthUI() {
    const currentUser = getCurrentUser();
    const authButtons = document.querySelector('.authButtons');
    const userInfo = document.querySelector('.userInfo');
    const usernameSpan = document.getElementById('authUsername');

    if (currentUser) {
        if (authButtons) authButtons.style.display = 'none';
        if (userInfo) {
            userInfo.style.display = 'flex';
            if (usernameSpan) usernameSpan.textContent = currentUser.username;
        }
        const logoutBtn = document.getElementById('authLogoutBtn');
        if (logoutBtn) logoutBtn.onclick = () => logout();
    } else {
        if (authButtons) authButtons.style.display = 'flex';
        if (userInfo) userInfo.style.display = 'none';
    }
}

function initAuthPages() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            const res = await login(username, password);
            const msgDiv = document.getElementById('loginMessage');
            if (res.success) {
                msgDiv.style.color = 'green';
                msgDiv.textContent = 'Успешно! Перенаправление...';
                setTimeout(() => { window.location.href = 'index.html'; }, 1000);
            } else {
                msgDiv.style.color = 'red';
                msgDiv.textContent = res.message;
            }
        });
    }

    const regForm = document.getElementById('registerForm');
    if (regForm) {
        regForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const firstName = document.getElementById('regFirstName').value.trim();
            const lastName = document.getElementById('regLastName').value.trim();
            const patronymic = document.getElementById('regPatronymic').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const phone = document.getElementById('regPhone').value.trim();
            const username = document.getElementById('regUsername').value.trim();
            const password = document.getElementById('regPassword').value.trim();
            const confirmPassword = document.getElementById('regConfirmPassword').value.trim();
            const msgDiv = document.getElementById('registerMessage');

            if (password !== confirmPassword) {
                msgDiv.style.color = 'red';
                msgDiv.textContent = 'Пароли не совпадают';
                return;
            }
            const res = await register(firstName, lastName, patronymic, email, phone, username, password);
            if (res.success) {
                msgDiv.style.color = 'green';
                msgDiv.textContent = 'Регистрация успешна! Теперь войдите.';
                setTimeout(() => { window.location.href = 'login.html'; }, 1500);
            } else {
                msgDiv.style.color = 'red';
                msgDiv.textContent = res.message;
            }
        });
    }
}

if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
    document.addEventListener('DOMContentLoaded', initAuthPages);
}
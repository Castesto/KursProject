const API_URL = 'http://localhost:3000';

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
    if (user) localStorage.setItem('currentUser', JSON.stringify(user));
    else localStorage.removeItem('currentUser');
}

async function fetchJson(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
}

async function register(firstName, lastName, patronymic, email, phone, username, password) {
    const users = await fetchJson(`${API_URL}/users`);
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
    const users = await fetchJson(`${API_URL}/users`);
    const normalizedUsername = String(username).trim();
    const normalizedPassword = String(password).trim();
    const user = users.find(u => (
        String(u.username || '').trim() === normalizedUsername &&
        String(u.password || '').trim() === normalizedPassword
    ));
    if (!user) {
        return { success: false, message: 'Неверный логин или пароль' };
    }
    setCurrentUser({ 
        id: user.id, 
        username: user.username, 
        isAdmin: user.isAdmin,
        firstName: user.firstName,
        lastName: user.lastName,
        patronymic: user.patronymic,
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
    if (loginForm && !loginForm.dataset.authReady) {
        loginForm.dataset.authReady = 'true';
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            const msgDiv = document.getElementById('loginMessage');
            const submitButton = loginForm.querySelector('button[type="submit"]');

            if (submitButton) submitButton.disabled = true;
            if (msgDiv) {
                msgDiv.style.color = '';
                msgDiv.textContent = 'Проверяем данные...';
            }

            try {
                const res = await login(username, password);
                if (res.success) {
                    msgDiv.style.color = 'green';
                    msgDiv.textContent = 'Успешно! Перенаправление...';
                    setTimeout(() => { window.location.href = 'index.html'; }, 1000);
                } else {
                    msgDiv.style.color = 'red';
                    msgDiv.textContent = res.message;
                }
            } catch (err) {
                console.error('Login error:', err);
                msgDiv.style.color = 'red';
                msgDiv.textContent = 'Не удалось подключиться к json-server. Проверьте, что он запущен на http://localhost:3000.';
            } finally {
                if (submitButton) submitButton.disabled = false;
            }
        });
    }

    const regForm = document.getElementById('registerForm');
    if (regForm && !regForm.dataset.authReady) {
        regForm.dataset.authReady = 'true';
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
            try {
                const res = await register(firstName, lastName, patronymic, email, phone, username, password);
                if (res.success) {
                    msgDiv.style.color = 'green';
                    msgDiv.textContent = 'Регистрация успешна! Теперь войдите.';
                    setTimeout(() => { window.location.href = 'login.html'; }, 1500);
                } else {
                    msgDiv.style.color = 'red';
                    msgDiv.textContent = res.message;
                }
            } catch (err) {
                console.error('Register error:', err);
                msgDiv.style.color = 'red';
                msgDiv.textContent = 'Не удалось подключиться к json-server. Проверьте, что он запущен на http://localhost:3000.';
            }
        });
    }
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

    const mobileAuth = document.querySelector('.mobile-auth');
    if (mobileAuth) {
        const originalAuthButtons = document.querySelector('.authButtons');
        const originalUserInfo = document.querySelector('.userInfo');
        if (currentUser && originalUserInfo) {
            const clone = originalUserInfo.cloneNode(true);
            clone.querySelector('#authLogoutBtn')?.addEventListener('click', logout);
            mobileAuth.innerHTML = '';
            mobileAuth.appendChild(clone);
        } else if (originalAuthButtons) {
            mobileAuth.innerHTML = originalAuthButtons.cloneNode(true);
        }
    }

    const mobileContacts = document.querySelector('.mobile-contacts');
    if (mobileContacts) {
        const phone = document.querySelector('.phoneNumber .number');
        const cart = document.querySelector('.cart-icon');
        mobileContacts.innerHTML = '';
        if (phone) mobileContacts.appendChild(phone.cloneNode(true));
        if (cart) mobileContacts.appendChild(cart.cloneNode(true));
    }

    const mobileSocial = document.querySelector('.mobile-social');
    if (mobileSocial) {
        const originalSocial = document.querySelector('.socialMedias');
        if (originalSocial) mobileSocial.innerHTML = originalSocial.innerHTML;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthPages);
} else {
    initAuthPages();
}

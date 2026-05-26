const API_URL = 'http://localhost:3000';

function fillUserData() {
    const user = getCurrentUser();
    if (user) {
        document.getElementById('appFirstName').value = user.firstName || '';
        document.getElementById('appLastName').value = user.lastName || '';
        document.getElementById('appPhone').value = user.phone || '';
    }
}

async function submitAppointment(event) {
    event.preventDefault();
    const firstName = document.getElementById('appFirstName').value.trim();
    const lastName = document.getElementById('appLastName').value.trim();
    const phone = document.getElementById('appPhone').value.trim();
    const dateTime = document.getElementById('appDateTime').value;

    if (!firstName || !lastName || !phone || !dateTime) {
        showNotification('Заполните все поля', 'error');
        return;
    }

    const appointment = {
        firstName, lastName, phone, dateTime,
        createdAt: new Date().toISOString(),
        userId: getCurrentUser()?.id || null
    };

    try {
        const res = await fetch(`${API_URL}/appointments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointment)
        });
        if (res.ok) {
            showNotification('Вы успешно записаны!', 'success');
            document.getElementById('appointmentForm').reset();
            fillUserData(); 
        } else {
            showNotification('Ошибка сервера', 'error');
        }
    } catch (err) {
        showNotification('Ошибка соединения', 'error');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fillUserData();
    const form = document.getElementById('appointmentForm');
    if (form) form.addEventListener('submit', submitAppointment);
});
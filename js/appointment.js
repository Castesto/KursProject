function fillUserData() {
    const user = getCurrentUser();
    if (user) {
        document.getElementById('appFirstName').value = user.firstName || '';
        document.getElementById('appLastName').value = user.lastName || '';
        document.getElementById('appPhone').value = user.phone || '';
    }
}

async function loadDoctors() {
    try {
        const res = await fetch(`${API_URL}/doctors`);
        const doctors = await res.json();
        const select = document.getElementById('appDoctor');
        if (!select) return;
        select.innerHTML = '<option value="">Выберите врача</option>' + 
            doctors.map(doc => `<option value="${doc.id}">${doc.name}</option>`).join('');
    } catch (err) {
        console.error('Ошибка загрузки врачей:', err);
    }
}

async function submitAppointment(event) {
    event.preventDefault();
    const firstName = document.getElementById('appFirstName').value.trim();
    const lastName = document.getElementById('appLastName').value.trim();
    const phone = document.getElementById('appPhone').value.trim();
    const dateTime = document.getElementById('appDateTime').value;
    const doctorId = document.getElementById('appDoctor').value;

    if (!firstName || !lastName || !phone || !dateTime || !doctorId) {
        showNotification('Заполните все поля', 'error');
        return;
    }

    const appointment = {
        firstName, lastName, phone, dateTime, doctorId,
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
            loadDoctors();
        } else {
            showNotification('Ошибка сервера', 'error');
        }
    } catch (err) {
        showNotification('Ошибка соединения', 'error');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fillUserData();
    loadDoctors();
    const form = document.getElementById('appointmentForm');
    if (form) form.addEventListener('submit', submitAppointment);
});
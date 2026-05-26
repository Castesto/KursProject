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
        window.doctorsList = doctors;
    } catch (err) {
        console.error('Ошибка загрузки врачей:', err);
    }
}

function getDoctorName(doctorId) {
    if (!window.doctorsList) return doctorId;
    const doc = window.doctorsList.find(d => d.id === doctorId);
    return doc ? doc.name : doctorId;
}

function showConfirmModal(formData) {
    const existingOverlay = document.querySelector('.modal-overlay');
    if (existingOverlay) existingOverlay.remove();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal-container';
    modal.innerHTML = `
        <h3>Проверьте данные</h3>
        <div class="modal-data">
            <p><strong>Имя:</strong> ${escapeHtml(formData.firstName)}</p>
            <p><strong>Фамилия:</strong> ${escapeHtml(formData.lastName)}</p>
            <p><strong>Телефон:</strong> ${escapeHtml(formData.phone)}</p>
            <p><strong>Врач:</strong> ${escapeHtml(formData.doctorName)}</p>
            <p><strong>Время:</strong> ${escapeHtml(formData.dateTimeFormatted)}</p>
        </div>
        <div class="modal-buttons">
            <button class="confirm-btn">Да, всё верно</button>
            <button class="edit-btn">Редактировать</button>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const confirmBtn = modal.querySelector('.confirm-btn');
    const editBtn = modal.querySelector('.edit-btn');

    confirmBtn.addEventListener('click', () => {
        overlay.remove();
        submitAppointment(formData);
    });

    editBtn.addEventListener('click', () => {
        overlay.remove();
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

async function handleFormSubmit(event) {
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

    const doctorName = getDoctorName(doctorId);
    if (!doctorName) {
        showNotification('Выберите врача из списка', 'error');
        return;
    }

    const dateObj = new Date(dateTime);
    const formattedDateTime = dateObj.toLocaleString('ru-RU', {
        day: 'numeric', month: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    const formData = {
        firstName, lastName, phone, doctorId, doctorName,
        dateTime: dateTime,
        dateTimeFormatted: formattedDateTime
    };

    showConfirmModal(formData);
}

async function submitAppointment(formData) {
    const appointment = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        dateTime: formData.dateTime,
        doctorId: formData.doctorId,
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
    if (form) form.addEventListener('submit', handleFormSubmit);
});
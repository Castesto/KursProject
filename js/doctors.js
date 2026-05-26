async function loadDoctors() {
    const container = document.getElementById('doctorsContainer');
    if (!container) {
        console.error('Контейнер doctorsContainer не найден');
        return;
    }
    try {
        const res = await fetch(`${API_URL}/doctors`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const doctors = await res.json();
        if (doctors.length === 0) {
            container.innerHTML = '<p>Нет врачей</p>';
            return;
        }
        container.innerHTML = doctors.map(doc => `
            <div class="specialist">
                <div class="photo"><img src="${doc.photo}" alt="${doc.name}"></div>
                <div class="nameAndDescription">
                    <div class="specialistName">${doc.name}</div>
                    <div class="specialistDescription">${doc.position}</div>
                </div>
            </div>
        `).join('');
    } catch (err) {
        console.error('Ошибка загрузки врачей:', err);
        container.innerHTML = '<p>Ошибка загрузки данных. Убедитесь, что json-server запущен.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadDoctors);
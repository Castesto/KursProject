const API_PORT = 3000;
const API_URL = `http://localhost:${API_PORT}`;

async function getServices() {
    const responce = await fetch(`${API_URL}/services`)
    const services = await responce.json();

    return services;
}

async function renderServices() {
    const services = await getServices();
    const container = document.querySelector('.servicesCards');

    container.innerHTML = services.map(service => `
                    <div class="card">
                        <div class="titleAndPhoto">
                            <div class="cardTitle">${service.title}</div>
                            <div class="cardPhoto"><img src="${service.img}" alt=""></div>
                        </div>
                        <div class="cardMore">
                            <a href="${service.ref}">
                                 <img src="images/moreButton.png" alt="Подробнее">
                            </a>
                        </div>
                    </div>`).join('');

}

renderServices();
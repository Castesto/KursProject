function initPhotoSlider() {
    const photoCenter = document.querySelector('.photoCenter');
    if (!photoCenter) return;

    const images = [
        'images/centerPhoto.png',
        'images/Дизайн-мед-центра-ресепшн.jpg',
        'images/медцентрz.jpg',
        'images/imred_033-1024x683.jpg'
    ];

    photoCenter.innerHTML = `
        <div class="slider-container">
            <div class="slider-track">
                ${images.map(src => `
                    <div class="slider-slide">
                        <img src="${src}" alt="Фото клиники">
                    </div>
                `).join('')}
            </div>
            <button class="slider-btn slider-prev">❮</button>
            <button class="slider-btn slider-next">❯</button>
            <div class="slider-dots">
                ${images.map((_, i) => `<span class="slider-dot ${i === 0 ? 'active' : ''}"></span>`).join('')}
            </div>
        </div>
    `;

    let current = 0;
    const track = photoCenter.querySelector('.slider-track');
    const slides = photoCenter.querySelectorAll('.slider-slide');
    const dots = photoCenter.querySelectorAll('.slider-dot');
    const prevBtn = photoCenter.querySelector('.slider-prev');
    const nextBtn = photoCenter.querySelector('.slider-next');
    const total = slides.length;

    function updateSlider() {
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
        });
    }

    function next() {
        current = (current + 1) % total;
        updateSlider();
    }

    function prev() {
        current = (current - 1 + total) % total;
        updateSlider();
    }

    function goTo(index) {
        current = index;
        updateSlider();
    }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => goTo(idx));
    });

    let interval = setInterval(next, 5000);
    photoCenter.addEventListener('mouseenter', () => clearInterval(interval));
    photoCenter.addEventListener('mouseleave', () => {
        interval = setInterval(next, 5000);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhotoSlider);
} else {
    initPhotoSlider();
}
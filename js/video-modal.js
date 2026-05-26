(function() {
    const VIDEO_PATH = 'images/video.mp4'; 

    function openVideoModal() {
        const existing = document.querySelector('.video-modal-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.className = 'video-modal-overlay';

        const container = document.createElement('div');
        container.className = 'video-modal-container';

        const closeBtn = document.createElement('div');
        closeBtn.className = 'video-modal-close';
        closeBtn.innerHTML = '&times;';

        const video = document.createElement('video');
        video.src = VIDEO_PATH;
        video.controls = true;
        video.autoplay = true;
        video.loop = false;
        video.playsInline = true;

        closeBtn.addEventListener('click', () => {
            video.pause();
            overlay.remove();
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                video.pause();
                overlay.remove();
            }
        });

        container.appendChild(closeBtn);
        container.appendChild(video);
        overlay.appendChild(container);
        document.body.appendChild(overlay);

        video.play().catch(e => console.log('Autoplay blocked:', e));
    }

    window.initVideoModal = function() {
        const playButtons = document.querySelectorAll('.play');
        playButtons.forEach(btn => {
            btn.removeEventListener('click', openVideoModal);
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openVideoModal();
            });
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.initVideoModal);
    } else {
        window.initVideoModal();
    }
})();
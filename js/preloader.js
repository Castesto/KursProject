(function() {
    const style = document.createElement('style');
    style.textContent = `
        #preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #EED198;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        #preloader .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #fff;
            border-top-color: #241913;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(preloader);

    window.addEventListener('load', function() {
        const el = document.getElementById('preloader');
        if (el) el.remove();
    });
})();
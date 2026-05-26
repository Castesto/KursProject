(function() {
    let container = null;

    function getContainer() {
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
        }
        return container;
    }

    function createToastElement(message, type) {
        const toast = document.createElement('div');
        toast.className = `notification ${type}`;
        
        let icon = '';
        if (type === 'success') icon = '✓';
        else if (type === 'error') icon = '✗';
        else if (type === 'info') icon = 'ℹ';
        
        toast.innerHTML = `
            <div class="notification-icon">${icon}</div>
            <div class="notification-content">${message}</div>
            <button class="notification-close">×</button>
        `;
        
        const closeBtn = toast.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            closeToast(toast);
        });
        
        return toast;
    }

    function closeToast(toast) {
        toast.classList.add('fade-out');
        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 300);
    }

    function showNotification(message, type = 'info', duration = 4000) {
        const toast = createToastElement(message, type);
        getContainer().appendChild(toast);
        
        const timeout = setTimeout(() => {
            closeToast(toast);
        }, duration);
        
        toast.addEventListener('mouseenter', () => clearTimeout(timeout));
        toast.addEventListener('mouseleave', () => {
            setTimeout(() => closeToast(toast), duration);
        });
    }

    window.showNotification = showNotification;
})();
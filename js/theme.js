(function () {
    const STORAGE_KEY = 'vetmajor-theme-settings';
    const DEFAULTS = {
        theme: 'light',
        accessibility: false,
        fontSize: 'small',
        colorScheme: 'black-white',
        images: true
    };

    const schemes = [
        { value: 'black-white', label: 'Черный / белый' },
        { value: 'black-green', label: 'Черный / зеленый' },
        { value: 'white-black', label: 'Белый / черный' },
        { value: 'beige-brown', label: 'Бежевый / коричневый' },
        { value: 'blue-navy', label: 'Голубой / синий' }
    ];

    const fontSizes = [
        { value: 'small', label: 'A' },
        { value: 'medium', label: 'A+' },
        { value: 'large', label: 'A++' }
    ];

    function readSettings() {
        try {
            return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'));
        } catch (error) {
            return Object.assign({}, DEFAULTS);
        }
    }

    let settings = readSettings();

    function saveSettings() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }

    function applySettings() {
        const root = document.documentElement;
        root.dataset.theme = settings.accessibility ? 'light' : settings.theme;
        root.dataset.accessibility = settings.accessibility ? 'on' : 'off';
        root.dataset.fontSize = settings.fontSize;
        root.dataset.colorScheme = settings.colorScheme;
        root.dataset.images = settings.images ? 'on' : 'off';
    }

    function setSetting(key, value) {
        settings[key] = value;
        applySettings();
        saveSettings();
        syncControls();
    }

    function syncControls() {
        const themeButton = document.querySelector('.theme-toggle');
        const accessButton = document.querySelector('.accessibility-toggle');
        const imageToggle = document.querySelector('#themeImagesToggle');

        if (themeButton) {
            const isDark = settings.theme === 'dark' && !settings.accessibility;
            themeButton.setAttribute('aria-pressed', String(isDark));
            themeButton.textContent = isDark ? 'Светлая тема' : 'Темная тема';
        }

        if (accessButton) {
            accessButton.setAttribute('aria-pressed', String(settings.accessibility));
        }

        if (imageToggle) {
            imageToggle.checked = !settings.images;
        }

        document.querySelectorAll('[data-font-size-option]').forEach((button) => {
            button.classList.toggle('is-active', button.dataset.fontSizeOption === settings.fontSize);
        });

        document.querySelectorAll('[data-color-scheme-option]').forEach((button) => {
            button.classList.toggle('is-active', button.dataset.colorSchemeOption === settings.colorScheme);
        });
    }

    function createButton(className, text, pressed) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = className;
        button.textContent = text;
        button.setAttribute('aria-pressed', String(Boolean(pressed)));
        return button;
    }

    function buildControls() {
        if (document.querySelector('.theme-controls')) return;

        const target = document.querySelector('.rightHeader1') || document.querySelector('header');
        if (!target) return;

        const controls = document.createElement('div');
        controls.className = 'theme-controls';

        const themeButton = createButton('theme-toggle', 'Темная тема', settings.theme === 'dark');
        themeButton.addEventListener('click', () => {
            setSetting('accessibility', false);
            setSetting('theme', settings.theme === 'dark' ? 'light' : 'dark');
        });

        const accessButton = createButton('accessibility-toggle', 'Для слабовидящих', settings.accessibility);
        accessButton.setAttribute('aria-expanded', 'false');

        const panel = document.createElement('div');
        panel.className = 'theme-panel';
        panel.setAttribute('role', 'region');
        panel.setAttribute('aria-label', 'Настройки версии для слабовидящих');

        const title = document.createElement('div');
        title.className = 'theme-panel-title';
        title.textContent = 'Версия для слабовидящих';
        panel.appendChild(title);

        const fontGroup = document.createElement('div');
        fontGroup.className = 'theme-panel-group';
        const fontLabel = document.createElement('div');
        fontLabel.className = 'theme-panel-label';
        fontLabel.textContent = 'Размер шрифта';
        fontGroup.appendChild(fontLabel);

        fontSizes.forEach((item) => {
            const button = createButton('', item.label, false);
            button.dataset.fontSizeOption = item.value;
            button.setAttribute('aria-label', `Размер шрифта ${item.label}`);
            button.addEventListener('click', () => {
                setSetting('accessibility', true);
                setSetting('fontSize', item.value);
            });
            fontGroup.appendChild(button);
        });
        panel.appendChild(fontGroup);

        const schemeGroup = document.createElement('div');
        schemeGroup.className = 'theme-panel-group schemes';
        const schemeLabel = document.createElement('div');
        schemeLabel.className = 'theme-panel-label';
        schemeLabel.textContent = 'Цветовая схема';
        schemeGroup.appendChild(schemeLabel);

        schemes.forEach((item) => {
            const button = createButton('', item.label, false);
            button.dataset.colorSchemeOption = item.value;
            button.addEventListener('click', () => {
                setSetting('accessibility', true);
                setSetting('colorScheme', item.value);
            });
            schemeGroup.appendChild(button);
        });
        panel.appendChild(schemeGroup);

        const imageLabel = document.createElement('label');
        const imageToggle = document.createElement('input');
        imageToggle.type = 'checkbox';
        imageToggle.id = 'themeImagesToggle';
        imageToggle.addEventListener('change', () => {
            const shouldHideImages = imageToggle.checked;
            setSetting('accessibility', true);
            setSetting('images', !shouldHideImages);
        });
        imageLabel.appendChild(imageToggle);
        imageLabel.appendChild(document.createTextNode('Отключить изображения'));
        panel.appendChild(imageLabel);

        accessButton.addEventListener('click', () => {
            const isPanelOpen = panel.classList.contains('is-open');
            if (!settings.accessibility) {
                setSetting('accessibility', true);
                panel.classList.add('is-open');
                accessButton.setAttribute('aria-expanded', 'true');
                return;
            }

            if (!isPanelOpen) {
                panel.classList.add('is-open');
                accessButton.setAttribute('aria-expanded', 'true');
                return;
            }

            setSetting('accessibility', false);
            panel.classList.remove('is-open');
            accessButton.setAttribute('aria-expanded', 'false');
        });

        controls.appendChild(themeButton);
        controls.appendChild(accessButton);
        controls.appendChild(panel);
        target.insertBefore(controls, target.firstChild);
        syncControls();
    }

    applySettings();

    document.addEventListener('DOMContentLoaded', () => {
        buildControls();

        const observer = new MutationObserver(() => buildControls());
        observer.observe(document.body, { childList: true, subtree: true });

        document.addEventListener('click', (event) => {
            const controls = document.querySelector('.theme-controls');
            const panel = document.querySelector('.theme-panel');
            const accessButton = document.querySelector('.accessibility-toggle');
            if (!controls || !panel || controls.contains(event.target)) return;
            panel.classList.remove('is-open');
            if (accessButton) accessButton.setAttribute('aria-expanded', 'false');
        });
    });
})();

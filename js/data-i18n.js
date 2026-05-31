(function (window) {
    const translations = {
        ru: {
            'nav.profile': 'Профиль',
            'nav.home': 'Центр',
            'nav.services': 'Услуги и цены',
            'nav.checkup': 'Чекап',
            'nav.medics': 'Врачи',
            'nav.contacts': 'Контакты',
            'auth.login': 'Вход',
            'auth.register': 'Регистрация',
            'header.makeAppointment': 'Записаться',
            'header.aboutText': 'О нас за пару минут',
            'footer.slogan': 'С ЗАБОТОЙ О ЖИЗНИ',
            'footer.section1.title': 'Услуги',
            'footer.section.vaccination': 'Вакцинация',
            'footer.section.surgery': 'Хирургия',
            'footer.section.castration': 'Кастрация и стерилизация',
            'footer.section.stationary': 'Стационар',
            'index.title': 'Ветцентр',
            'index.centerName': 'ЦЕНТР',
            'index.infoCenter': 'На сайте для вас представлена вся актуальная информация о ветеринарном центре, о специалистах и различных полезных возможностях пространства VetMajor. Наш ветеринарный центр был задуман как необычный центр помощи животным. Мы совместили концепцию высокопрофессионального лечения с современным гармоничным и уютным пространством по доступной цене для заботливых владельцев.',
            'index.chooseUs': 'Выбирайте нас',
            'departments.title': 'ОТДЕЛЕНИЕ',
            'departName': 'Основная клиника',
            'depart.address': 'Краснодар, ул. Пушкина 14',
            'depart.phone': '+7 999 999 99 99',
            'depart.hours': 'Ежедневно 8:00 - 22:00',
            'map.yandex': 'Мы на яндекс картах',
            'map.gis': 'Мы в 2Gis',
            'history.title': 'ИСТОРИЯ',
            'history.more': 'Подробнее',
            'pets.title': 'КОШКИ',
            'pets.text': 'Проведение детального осмотра и обсуждения состояния вашего питомца',
            'services.title': 'УСЛУГИ',
            'specialists.title': 'НАШИ СПЕЦИАЛИСТЫ',
            'specialists.more': 'Больше специалистов',
            'achievements.years': '7 ЛЕТ',
            'achievements.pets': '>500',
            'achievements.rate': '90%',
            'achievements.care': 'Заботимся о здоровье животных',
            'achievements.healed': 'Всего вылеченных питомцев',
            'achievements.recommend': 'Клиентов рекомендуют нас',
            'cart.add': 'В корзину',
            'footer.menu.home': 'Главная',
            'footer.menu.clinic': 'Клиника',
            'footer.menu.services': 'Услуги и цены',
            'footer.menu.articles': 'Статьи',
            'footer.menu.checkup': 'Чек-ап',
            'footer.question': 'Остались вопросы? Звоните!',
            'footer.phone': '+7 54 334 99 99',
            'footer.mail': 'mail@vetmajor.ru',
            'search.placeholder': 'Поиск по услугам...',
            'login.title': 'Вход',
            'register.title': 'Регистрация',
            'form.login.username': 'Логин',
            'form.login.password': 'Пароль',
            'form.register.firstname': 'Имя',
            'form.register.lastname': 'Фамилия',
            'form.register.patronymic': 'Отчество',
            'form.register.email': 'Email',
            'form.register.phone': 'Номер телефона'
        },
        en: {
            'nav.profile': 'Profile',
            'nav.home': 'Center',
            'nav.services': 'Services & Prices',
            'nav.checkup': 'Check-up',
            'nav.medics': 'Doctors',
            'nav.contacts': 'Contacts',
            'auth.login': 'Login',
            'auth.register': 'Register',
            'header.makeAppointment': 'Make Appointment',
            'header.aboutText': 'About us in a few minutes',
            'footer.slogan': 'WITH CARE FOR LIFE',
            'footer.section1.title': 'Services',
            'footer.section.vaccination': 'Vaccination',
            'footer.section.surgery': 'Surgery',
            'footer.section.castration': 'Castration & Sterilization',
            'footer.section.stationary': 'Inpatient Care',
            'index.title': 'Vet Center',
            'index.centerName': 'CENTER',
            'index.infoCenter': 'On this site you will find all the up-to-date information about the veterinary center, the specialists and various useful features of the VetMajor space. Our veterinary center was conceived as an unusual animal care center. We combined the concept of highly professional treatment with a modern harmonious and cozy space at an affordable price for caring owners.',
            'index.chooseUs': 'Choose us',
            'departments.title': 'DEPARTMENTS',
            'departName': 'Main clinic',
            'depart.address': 'Krasnodar, Pushkina St. 14',
            'depart.phone': '+7 999 999 99 99',
            'depart.hours': 'Daily 8:00 - 22:00',
            'map.yandex': 'We are on Yandex.Maps',
            'map.gis': 'We are in 2Gis',
            'history.title': 'HISTORY',
            'history.more': 'Read more',
            'pets.title': 'CATS',
            'pets.text': 'A detailed examination and discussion of the condition of your pet',
            'services.title': 'SERVICES',
            'specialists.title': 'OUR SPECIALISTS',
            'specialists.more': 'More specialists',
            'achievements.years': '7 YEARS',
            'achievements.pets': '>500',
            'achievements.rate': '90%',
            'achievements.care': 'We care about animal health',
            'achievements.healed': 'Total treated pets',
            'achievements.recommend': 'Clients recommend us',
            'cart.add': 'Add to cart',
            'footer.menu.home': 'Home',
            'footer.menu.clinic': 'Clinic',
            'footer.menu.services': 'Services & Prices',
            'footer.menu.articles': 'Articles',
            'footer.menu.checkup': 'Check-up',
            'footer.question': 'Any questions? Call us!',
            'footer.phone': '+7 54 334 99 99',
            'footer.mail': 'mail@vetmajor.ru',
            'search.placeholder': 'Search services...',
            'login.title': 'Login',
            'register.title': 'Register',
            'form.login.username': 'Username',
            'form.login.password': 'Password',
            'form.register.firstname': 'First name',
            'form.register.lastname': 'Last name',
            'form.register.patronymic': 'Patronymic',
            'form.register.email': 'Email',
            'form.register.phone': 'Phone number'
        }
    };

    function getLocale() {
        return localStorage.getItem('locale') || 'ru';
    }

    function setLocale(locale) {
        localStorage.setItem('locale', locale);
        applyTranslations();
        try { window.dispatchEvent(new Event('localechange')); } catch (e) { /* noop */ }
    }

    function t(key) {
        const locale = getLocale();
        return (translations[locale] && translations[locale][key]) || key;
    }

    function applyTranslations(root = document) {
        const locale = getLocale();
        const els = root.querySelectorAll('[data-i18n]');
        els.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const attr = el.getAttribute('data-i18n-attr');
            const value = (translations[locale] && translations[locale][key]) || '';
            if (attr) {
                el.setAttribute(attr, value);
            } else {
                el.textContent = value;
            }
        });
        const phs = root.querySelectorAll('[data-i18n-placeholder]');
        phs.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const value = (translations[locale] && translations[locale][key]) || '';
            el.setAttribute('placeholder', value);
        });
    }

    window.i18nData = {
        getLocale,
        setLocale,
        t,
        applyTranslations,
        translations
    };

})(window);

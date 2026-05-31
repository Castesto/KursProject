// Simple i18n data and helper functions
(function(window){
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
      'index.title': 'Ветцентр',
      'index.chooseUs': 'Выбирайте нас',
      'services.title': 'УСЛУГИ',
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
      'index.title': 'Vet Center',
      'index.chooseUs': 'Choose us',
      'services.title': 'SERVICES',
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

  function getLocale(){
    return localStorage.getItem('locale') || 'ru';
  }

  function setLocale(locale){
    localStorage.setItem('locale', locale);
    applyTranslations();
  }

  function t(key){
    const locale = getLocale();
    return (translations[locale] && translations[locale][key]) || key;
  }

  function applyTranslations(root=document){
    const locale = getLocale();
    // translate textContent elements
    const els = root.querySelectorAll('[data-i18n]');
    els.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const attr = el.getAttribute('data-i18n-attr');
      const value = (translations[locale] && translations[locale][key]) || '';
      if(attr){
        el.setAttribute(attr, value);
      } else {
        el.textContent = value;
      }
    });
    // translate placeholders
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

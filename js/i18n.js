document.addEventListener('DOMContentLoaded', () => {
  let initScheduled = false;
  function scheduleInit(){
    if(initScheduled) return;
    initScheduled = true;
    setTimeout(() => {
      initScheduled = false;
      realInit();
    }, 120);
  }

  function realInit(){
    if(!window.i18nData) return;
    const header = document.querySelector('header');
    if(header){
      const existing = header.querySelector('.lang-switch');
      if(!existing){
        const btn = document.createElement('button');
        btn.className = 'lang-switch';
        btn.type = 'button';
        btn.setAttribute('aria-label','Toggle language');
        btn.style.marginLeft = '10px';
        btn.style.padding = '6px 10px';
        btn.style.cursor = 'pointer';
        const locale = window.i18nData.getLocale();
        btn.textContent = locale === 'ru' ? 'EN' : 'RU';
        btn.addEventListener('click', () => {
          const next = window.i18nData.getLocale() === 'ru' ? 'en' : 'ru';
          window.i18nData.setLocale(next);
          btn.textContent = next === 'ru' ? 'EN' : 'RU';
        });
        const authTop = header.querySelector('#authTopBlock') || header;
        try{ authTop.appendChild(btn); }catch(e){ /* ignore */ }
      }
    }
    try{ window.i18nData.applyTranslations(document); }catch(e){console.error('i18n apply error', e)}
  }

  scheduleInit();
  setTimeout(scheduleInit, 300);

  (function watchForHeader(){
    if(document.querySelector('header')){
      scheduleInit();
      return;
    }
    const hdrObserver = new MutationObserver((mutations, obs) => {
      for(const m of mutations){
        for(const n of m.addedNodes || []){
          if(n && n.nodeType === 1){
            if(n.matches && n.matches('header')){
              scheduleInit(); obs.disconnect(); return;
            }
            if(n.querySelector && n.querySelector('header')){
              scheduleInit(); obs.disconnect(); return;
            }
          }
        }
      }
    });
    hdrObserver.observe(document.documentElement, {childList:true, subtree:true});
  })();
});

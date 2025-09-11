
(function(){
  async function injectPartials(){
    const slots = document.querySelectorAll('[data-include]');
    const base = new URL('.', window.location.href);
    for (const el of slots){
      const file = el.getAttribute('data-include');
      try{
        const url  = new URL(file, base);
        const res  = await fetch(url);
        if(!res.ok) throw new Error(res.status + ' ' + res.statusText);
        el.outerHTML = await res.text();
      }catch(e){
        console.error('No se pudo cargar el parcial', file, e);
      }
    }
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('#nav-links');
    if (toggle && links){
      toggle.addEventListener('click', ()=>{
        const show = links.classList.toggle('show');
        toggle.setAttribute('aria-expanded', show ? 'true' : 'false');
      });
    }
    document.addEventListener('click', (e)=>{
      const menu = document.querySelector('.menu');
      const btn = document.querySelector('.menu-btn');
      if(!menu || !btn) return;
      if(btn.contains(e.target)){
        menu.classList.toggle('open');
        btn.setAttribute('aria-expanded', menu.classList.contains('open') ? 'true':'false');
      }else if(!menu.contains(e.target)){
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded','false');
      }
    });
    const year = document.getElementById('year');
    if(year) year.textContent = new Date().getFullYear();

    // Avisar que los parciales están listos (útil para el carrusel)
    document.dispatchEvent(new CustomEvent('partials:ready'));
  }
  if(document.readyState !== 'loading') injectPartials();
  else document.addEventListener('DOMContentLoaded', injectPartials);
})();

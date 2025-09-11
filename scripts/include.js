
(function(){
  async function injectPartials(){
    const slots = document.querySelectorAll('[data-include]');
    for (const el of slots){
      const file = el.getAttribute('data-include');
      try{
        const base = new URL('.', document.currentScript.src);
        const url  = new URL(file, base);
        const res  = await fetch(url);
        el.outerHTML = await res.text();
      }catch(e){ console.error('No se pudo cargar el parcial', file, e); }
    }
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('#nav-links');
    if (toggle && links){
      toggle.addEventListener('click', ()=>{
        const show = links.classList.toggle('show');
        toggle.setAttribute('aria-expanded', show ? 'true' : 'false');
      });
    }
    const year = document.getElementById('year');
    if(year) year.textContent = new Date().getFullYear();
  }
  if(document.readyState !== 'loading') injectPartials();
  else document.addEventListener('DOMContentLoaded', injectPartials);
})();

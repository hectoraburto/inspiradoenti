
(function(){
  function initCarousel(root){
    const track = root.querySelector('.carousel-track');
    const slides = [...root.querySelectorAll('.slide')];
    const prev = root.querySelector('.prev');
    const next = root.querySelector('.next');
    const dots = root.querySelector('.dots');
    let idx = 0, timer;
    function go(i){
      idx = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${idx*100}%)`;
      dots.querySelectorAll('button').forEach((b,bi)=>{
        b.classList.toggle('active', bi===idx);
        b.setAttribute('aria-selected', bi===idx ? 'true':'false');
      });
    }
    function auto(){ clearInterval(timer); timer = setInterval(()=>go(idx+1), 5000); }
    dots.innerHTML = slides.map((_,i)=>`<button role="tab" aria-selected="${i===0?'true':'false'}" aria-label="Slide ${i+1}"></button>`).join('');
    dots.querySelectorAll('button').forEach((b,i)=> b.addEventListener('click', ()=>{ go(i); auto(); }));
    prev.addEventListener('click', ()=>{ go(idx-1); auto(); });
    next.addEventListener('click', ()=>{ go(idx+1); auto(); });
    go(0); auto();
  }
  function tryInit(){
    const car = document.querySelector('.carousel');
    if(car) initCarousel(car);
  }
  document.addEventListener('partials:ready', tryInit);
  document.addEventListener('DOMContentLoaded', tryInit);
})();

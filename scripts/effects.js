
(function(){
  function addRevealTargets(){
    document.querySelectorAll('.card, .service, .grid > *, .slide-inner').forEach(el=>{
      if(!el.classList.contains('reveal')) el.classList.add('reveal');
    });
  }
  function initReveal(){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('show');
          io.unobserve(e.target);
        }
      });
    }, {root:null, rootMargin:'0px', threshold:0.12});
    document.querySelectorAll('.reveal').forEach(el=> io.observe(el));
  }
  function run(){ addRevealTargets(); initReveal(); }
  document.addEventListener('partials:ready', run);
  document.addEventListener('DOMContentLoaded', run);
})();

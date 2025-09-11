
(function(){
  // --- Reading progress bar
  function initProgressBar(){
    let bar = document.querySelector('.progress-bar');
    if(!bar){
      bar = document.createElement('div');
      bar.className = 'progress-bar';
      document.body.appendChild(bar);
    }
    const update = ()=>{
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', update, {passive:true});
    window.addEventListener('resize', update);
    update();
  }

  // --- Ripple on buttons
  function initRipple(){
    document.body.addEventListener('click', (e)=>{
      const btn = e.target.closest('.btn');
      if(!btn) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const r = document.createElement('span');
      r.className = 'ripple';
      r.style.left = (x - 20) + 'px';
      r.style.top  = (y - 20) + 'px';
      r.style.width = r.style.height = Math.max(rect.width, rect.height) + 'px';
      btn.appendChild(r);
      setTimeout(()=> r.remove(), 600);
    });
  }

  // --- Tilt 3D
  function initTilt(){
    const els = document.querySelectorAll('.card, .service');
    els.forEach(el=> el.classList.add('tilt'));
    function handleMove(e){
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width/2;
      const cy = r.top + r.height/2;
      const dx = (e.clientX - cx) / (r.width/2);
      const dy = (e.clientY - cy) / (r.height/2);
      const max = 8; // degrees
      el.style.transform = `rotateX(${-dy*max}deg) rotateY(${dx*max}deg)`;
    }
    function reset(e){ e.currentTarget.style.transform = 'rotateX(0) rotateY(0)'; }
    document.querySelectorAll('.tilt').forEach(el=>{
      el.addEventListener('mousemove', handleMove);
      el.addEventListener('mouseleave', reset);
    });
  }

  // --- Counters
  function initCounters(){
    const nums = document.querySelectorAll('[data-counter]');
    if(nums.length===0) return;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter'),10) || 0;
        const dur = 1200;
        const start = performance.now();
        function tick(now){
          const t = Math.min(1, (now - start)/dur);
          const val = Math.floor(target * (t*(2 - t))); // ease-out
          el.textContent = val.toLocaleString('es-CL');
          if(t<1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, {threshold:0.4});
    nums.forEach(n=> io.observe(n));
  }

  // --- Parallax for carousel icons
  function initParallax(){
    const icons = document.querySelectorAll('.carousel .slide-icon');
    if(icons.length===0) return;
    window.addEventListener('scroll', ()=>{
      const vh = window.innerHeight;
      icons.forEach(ic=>{
        const r = ic.getBoundingClientRect();
        const center = r.top + r.height/2;
        const rel = (center - vh/2) / vh; // -1..1 aprox
        ic.style.transform = `translateY(${rel * -20}px)`; // move opposite
      });
    }, {passive:true});
  }

  function run(){
    initProgressBar();
    initRipple();
    initTilt();
    initCounters();
    initParallax();
  }

  document.addEventListener('partials:ready', run);
  document.addEventListener('DOMContentLoaded', run);
})();


(async function(){
  const money = (n)=> new Intl.NumberFormat('es-CL', {style:'currency', currency:'CLP', maximumFractionDigits:0}).format(n);
  try{
    const res = await fetch(new URL('../data/servicios-imprenta.json', document.currentScript.src));
    const items = await res.json();
    const grid = document.getElementById('imprenta-grid');
    if(!grid) return;
    grid.innerHTML = items.map(it => `
      <article class="card">
        <img src="./assets/img/placeholder.svg" alt="" style="width:100%;border-radius:12px;aspect-ratio:16/9;object-fit:cover">
        <h3>${it.nombre}</h3>
        <p class="tagline">${it.detalle}</p>
        <div class="price">Desde ${money(it.desde)} <span class="badge">${it.unidad}</span></div>
        <a href="./cotizacion.html?servicio=${encodeURIComponent(it.slug)}" class="btn">Solicitar cotización</a>
      </article>
    `).join('');
  }catch(e){
    console.error('Error cargando servicios de imprenta', e);
  }
})();

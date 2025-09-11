
(async function renderCards(){
  const money = (n)=> new Intl.NumberFormat('es-CL', {style:'currency', currency:'CLP', maximumFractionDigits:0}).format(n);
  try{
    const res = await fetch('./data/servicios-imprenta.json');
    const items = await res.json();
    const grid = document.getElementById('imprenta-grid');
    if(!grid) return;
    grid.innerHTML = items.map(it => `
      <article class="card">
        <img src="./assets/img/vectors/imprenta.svg" alt="" style="width:100%;border-radius:12px;aspect-ratio:16/9;object-fit:cover;opacity:.06">
        <h3>${it.nombre}</h3>
        <p class="tagline">${it.detalle}</p>
        <div class="price">Desde ${money(it.desde)} <span class="badge">${it.unidad}</span></div>
        <a href="./cotizacion.html?servicio=${encodeURIComponent(it.slug)}" class="btn">Solicitar cotización</a>
      </article>
    `).join('');
  }catch(e){ console.error('Error cargando servicios de imprenta', e); }
})();

;(async function renderTabla(){
  const money = (n)=> new Intl.NumberFormat('es-CL', {style:'currency', currency:'CLP', maximumFractionDigits:0}).format(n);
  try{
    const res = await fetch('./data/servicios-imprenta.json');
    const items = await res.json();
    const tbody = document.querySelector('#tabla-imprenta tbody');
    if(!tbody) return;
    tbody.innerHTML = items.map(it => `
      <tr>
        <td style="padding:.6rem;border-bottom:1px solid #eef2f7">${it.nombre}</td>
        <td style="padding:.6rem;border-bottom:1px solid #eef2f7;color:#475569">${it.detalle}</td>
        <td style="padding:.6rem;border-bottom:1px solid #eef2f7;text-align:right">${money(it.desde)}</td>
        <td style="padding:.6rem;border-bottom:1px solid #eef2f7">${it.unidad}</td>
      </tr>
    `).join('');
  }catch(e){ console.error(e); }
})();

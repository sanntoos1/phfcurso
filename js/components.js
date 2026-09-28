function esc(value = '') {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function renderModules(course) {
  const target = document.querySelector('#modules-list');
  const moduleSlugs = {
    '01': 'preparo-e-ferramentas',
    '02': 'telhado-embutido',
    '03': 'duas-aguas',
    '04': 'quatro-aguas-e-espigoes',
    '05': 'grandes-vaos-e-varandas',
    '06': 'telha-termoacustica'
  };

  target.innerHTML = course.content.modules.map(([n,title,desc]) => `
    <a class="module-row reveal" href="conteudos/${moduleSlugs[n]}.html" aria-label="Ver detalhes sobre ${esc(title)}">
      <span class="module-number">${esc(n)}</span>
      <span class="module-title"><h3>${esc(title)}</h3><small>Ver conteúdo detalhado</small></span>
      <p>${esc(desc)}</p>
      <span class="module-arrow" aria-hidden="true">↗</span>
    </a>`).join('');
}

function renderFAQ(course) {
  const target = document.querySelector('#faq-list');
  target.innerHTML = course.content.faq.map(([question,answer], i) => `
    <div class="faq-item">
      <button type="button" aria-expanded="false" aria-controls="faq-panel-${i}">
        <span>${esc(question)}</span><b>+</b>
      </button>
      <div class="faq-answer" id="faq-panel-${i}" hidden><p>${esc(answer)}</p></div>
    </div>`).join('');
}

function renderGallery() {
  const target = document.querySelector('#gallery-list');
  const empty = document.querySelector('#gallery-empty');
  const filters = document.querySelector('#gallery-filters');
  const status = document.querySelector('#gallery-status');

  if (!target || !filters) return;

  // Mantém a galeria visualmente enxuta: mostra 4 registros por cidade
  // e revela o restante somente quando o visitante pedir.
  const PREVIEW_LIMIT = 6;
  const expandedCities = new Set();

  const renderMedia = (item, index, city) => {
    const cityLabel = `${city.city} - ${city.state}`;
    if (item.type === 'video') {
      return `
        <button class="gallery-item gallery-video gallery-layout-${Math.min(index + 1, 5)} reveal" data-media="video" data-src="${esc(item.src)}" aria-label="Abrir vídeo ${index + 1} de ${esc(cityLabel)}">
          <span class="media-number">${String(index + 1).padStart(2, '0')}</span>
          <span class="gallery-city-tag">${esc(cityLabel)}</span>
          <span class="play">▶</span>
          <video muted preload="none" poster="${esc(item.poster || '')}"></video>
        </button>`;
    }

    return `
      <button class="gallery-item gallery-layout-${Math.min(index + 1, 5)} reveal" data-media="image" data-src="${esc(item.src)}" aria-label="Ampliar imagem ${index + 1} de ${esc(cityLabel)}">
        <img src="${esc(item.src)}" alt="${esc(item.alt || `Registro da formação em ${cityLabel}`)}" loading="lazy" decoding="async">
        <span class="media-number">${String(index + 1).padStart(2, '0')}</span>
        <span class="gallery-city-tag">${esc(cityLabel)}</span>
      </button>`;
  };

  const renderCityBlock = city => {
    const items = city.items || [];
    if (!items.length) {
      return `
        <section class="gallery-city-block gallery-city-empty-block" data-gallery-city="${esc(city.slug)}">
          <div class="gallery-city-heading">
            <div><span class="gallery-city-index">${esc(city.slug === 'assis' ? '01' : '02')}</span><h3>${esc(city.city)} <span>/ ${esc(city.state)}</span></h3></div>
            <p>Os registros desta turma serão adicionados aqui.</p>
          </div>
          <div class="gallery-city-empty">Ainda não há fotos ou vídeos cadastrados para esta cidade.</div>
        </section>`;
    }

    const isExpanded = expandedCities.has(city.slug);
    const visibleItems = isExpanded ? items : items.slice(0, PREVIEW_LIMIT);
    const remaining = Math.max(items.length - PREVIEW_LIMIT, 0);
    const expandLabel = isExpanded ? 'Mostrar menos' : `Ver mais ${remaining} registro${remaining > 1 ? 's' : ''}`;
    const expandAction = remaining > 0 ? `
      <div class="gallery-expand-wrap">
        <button
          type="button"
          class="gallery-expand"
          data-gallery-expand="${esc(city.slug)}"
          aria-expanded="${String(isExpanded)}"
          aria-controls="gallery-grid-${esc(city.slug)}">
          <span>${expandLabel}</span>
          <span class="gallery-expand-icon" aria-hidden="true">${isExpanded ? '↑' : '↓'}</span>
        </button>
      </div>` : '';

    return `
      <section class="gallery-city-block" data-gallery-city="${esc(city.slug)}">
        <div class="gallery-city-heading">
          <div><span class="gallery-city-index">${esc(city.slug === 'assis' ? '01' : '02')}</span><h3>${esc(city.city)} <span>/ ${esc(city.state)}</span></h3></div>
          <p>${items.length} registro${items.length > 1 ? 's' : ''} disponível${items.length > 1 ? 'eis' : ''}</p>
        </div>
        <div class="gallery-grid" id="gallery-grid-${esc(city.slug)}">${visibleItems.map((item, i) => renderMedia(item, i, city)).join('')}</div>
        ${expandAction}
      </section>`;
  };

  const setActiveFilter = slug => {
    filters.querySelectorAll('[data-gallery-filter]').forEach(button => {
      const active = button.dataset.galleryFilter === slug;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
    });
  };

  const render = slug => {
    const validSlug = slug === 'all' || CITY_GALLERIES[slug] ? slug : 'all';
    setActiveFilter(validSlug);

    if (validSlug === 'all') {
      target.innerHTML = GALLERY_CITIES.map(renderCityBlock).join('');
      status.textContent = 'Todas as cidades';
    } else {
      const city = CITY_GALLERIES[validSlug];
      target.innerHTML = renderCityBlock(city);
      status.textContent = `${city.city} - ${city.state}`;
    }

    const hasAny = validSlug === 'all'
      ? GALLERY_CITIES.some(city => city.items?.length)
      : Boolean(CITY_GALLERIES[validSlug]?.items?.length);
    empty.hidden = hasAny;

    target.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    window.dispatchEvent(new CustomEvent('gallery:rendered', { detail: { city: validSlug } }));
  };

  const params = new URLSearchParams(window.location.search);
  const initial = params.get('galeria') || 'all';
  render(initial);

  filters.addEventListener('click', event => {
    const button = event.target.closest('[data-gallery-filter]');
    if (!button) return;

    const slug = button.dataset.galleryFilter;
    render(slug);

    const next = new URL(window.location.href);
    if (slug === 'all') next.searchParams.delete('galeria');
    else next.searchParams.set('galeria', slug);
    window.history.replaceState({}, '', next);

    if (typeof window.trackEvent === 'function') {
      window.trackEvent('gallery_filter', { gallery_city: slug });
    }
  });

  target.addEventListener('click', event => {
    const button = event.target.closest('[data-gallery-expand]');
    if (!button) return;

    const slug = button.dataset.galleryExpand;
    if (expandedCities.has(slug)) expandedCities.delete(slug);
    else expandedCities.add(slug);

    const activeSlug = filters.querySelector('.gallery-filter.is-active')?.dataset.galleryFilter || 'all';
    render(activeSlug);

    if (typeof window.trackEvent === 'function') {
      window.trackEvent('gallery_expand', {
        gallery_city: slug,
        expanded: expandedCities.has(slug)
      });
    }

    requestAnimationFrame(() => {
      document.querySelector(`[data-gallery-expand="${slug}"]`)?.focus({ preventScroll: true });
    });
  });
}

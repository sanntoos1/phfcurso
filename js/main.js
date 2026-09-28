(() => {
  const params = new URLSearchParams(window.location.search);
  const pathSlug = window.location.pathname.match(/\/curso\/([^/]+)/)?.[1];
  const slug = (params.get('cidade') || pathSlug || 'assis').toLowerCase();
  const course = COURSES[slug] || COURSES.assis;

  const fieldMap = {
    'city-state': `${course.city} - ${course.state}`,
    date: course.course.date,
    time: course.course.time,
    duration: course.course.duration,
    location: course.course.location,
    address: course.course.address,
    format: course.course.format,
    subtitle: course.course.subtitle,
    'course-eyebrow': course.course.eyebrow,
    'instructor-name': course.instructor.name,
    'instructor-role': course.instructor.role,
    'instructor-bio': course.instructor.bio
  };

  document.querySelectorAll('[data-field]').forEach(el => {
    const value = fieldMap[el.dataset.field];
    if (value !== undefined) el.textContent = value;
  });

  document.querySelector('#hero-image').src = course.hero.image;
  document.querySelector('#hero-image').alt = course.hero.alt;
  document.querySelector('#instructor-image').src = course.instructor.image;
  document.title = course.seo.title;
  document.querySelector('#meta-description').content = course.seo.description;
  document.querySelector('#canonical').href = location.href.split('?')[0] + `?cidade=${encodeURIComponent(course.slug)}`;
  document.querySelector('#og-title').content = course.seo.title;
  document.querySelector('#og-description').content = course.seo.description;
  document.querySelector('#og-image').content = new URL(course.seo.image, location.href).href;
  document.querySelector('#og-url').content = location.href;

  const structured = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.course.title,
    description: course.seo.description,
    courseMode: 'onsite',
    provider: { '@type': 'Organization', name: 'PHF Galvanizados' }
  };
  document.querySelector('#structured-data').textContent = JSON.stringify(structured);

  const whatsappUrl = () => `https://wa.me/${course.contact.whatsapp}?text=${encodeURIComponent(course.contact.message)}`;
  document.querySelectorAll('[data-whatsapp]').forEach(link => link.href = whatsappUrl());

  renderModules(course); renderFAQ(course); renderGallery();
  document.querySelector('#year').textContent = new Date().getFullYear();

  window.trackEvent = (event, extra = {}) => {
    const payload = { event, city: course.slug, ...extra };
    if (typeof window.dataLayer !== 'undefined') window.dataLayer.push(payload);
    if (typeof window.fbq === 'function') window.fbq('trackCustom', event, payload);
    window.dispatchEvent(new CustomEvent('landingpage:event', { detail: payload }));
  };

  document.querySelectorAll('[data-track]').forEach(el => el.addEventListener('click', () => trackEvent(el.dataset.track)));

  const header = document.querySelector('#site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const toggle = document.querySelector('.menu-toggle');
  const mobile = document.querySelector('#mobile-menu');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    mobile.setAttribute('aria-hidden', String(open));
    mobile.classList.toggle('is-open', !open);
  });
  mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded','false'); mobile.setAttribute('aria-hidden','true'); mobile.classList.remove('is-open');
  }));

  // Navegação interna: scroll nativo suave do navegador, com fallback JS.
  // O fallback evita o salto seco em navegadores/ambientes que ignoram
  // `scroll-behavior: smooth`.
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      if (toggle && mobile) {
        toggle.setAttribute('aria-expanded', 'false');
        mobile.setAttribute('aria-hidden', 'true');
        mobile.classList.remove('is-open');
      }

      const headerOffset = document.querySelector('.site-header')?.offsetHeight || 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset - 14;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });

      history.replaceState(null, '', href);
    });
  });

  document.querySelector('#faq-list').addEventListener('click', e => {
    const btn = e.target.closest('.faq-item button'); if (!btn) return;
    const item = btn.closest('.faq-item'); const answer = item.querySelector('.faq-answer');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-item').forEach(other => {
      other.querySelector('button').setAttribute('aria-expanded','false'); other.querySelector('.faq-answer').hidden = true; other.classList.remove('open');
    });
    if (!expanded) { btn.setAttribute('aria-expanded','true'); answer.hidden=false; item.classList.add('open'); trackEvent('faq_open'); }
  });

  const modal = document.querySelector('#media-modal');
  const modalContent = document.querySelector('#modal-content');
  const closeModal = () => { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden','true'); modalContent.replaceChildren(); document.body.classList.remove('modal-open'); };
  document.querySelector('#gallery-list').addEventListener('click', e => {
    const item = e.target.closest('[data-media]'); if (!item) return;
    const type = item.dataset.media; const src = item.dataset.src;
    if (type === 'image') { const img = new Image(); img.src=src; img.alt='Registro ampliado da formação'; img.decoding='async'; modalContent.appendChild(img); }
    else { const video=document.createElement('video'); video.src=src; video.controls=true; video.autoplay=true; video.playsInline=true; modalContent.appendChild(video); }
    modal.classList.add('is-open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open'); trackEvent('gallery_open');
  });
  document.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });

  // O carregador do index.html garante que o GSAP esteja pronto antes desta inicialização.
  // O await também protege a página caso o CDN precise usar o segundo fallback.
  if (window.__GSAP_BOOT__) {
    window.__GSAP_BOOT__.then(() => initScrollAnimations()).catch(() => initScrollAnimations());
  } else {
    initScrollAnimations();
  }

  document.querySelectorAll('video').forEach(video => video.addEventListener('play', () => trackEvent('video_play')));

  function initScrollAnimations() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fallback somente se GSAP/ScrollTrigger não estiverem disponíveis.
    if (!window.gsap || !window.ScrollTrigger || reduceMotion) {
      if (!reduceMotion) console.warn('[GSAP] Scroll animations usando fallback porque GSAP/ScrollTrigger não está disponível.');
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }), { threshold: .12 });
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      return;
    }

    document.documentElement.classList.add('gsap-ready');
    gsap.registerPlugin(ScrollTrigger);

    // Divide os títulos em palavras para criar uma entrada editorial controlada pelo scroll.
    const splitWords = element => {
      if (element.dataset.gsapSplit === 'true') return element.querySelectorAll('.gsap-word');
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);

      nodes.forEach(node => {
        if (!node.nodeValue.trim()) return;
        const fragment = document.createDocumentFragment();
        node.nodeValue.split(/(\s+)/).forEach(part => {
          if (/\s+/.test(part)) fragment.appendChild(document.createTextNode(part));
          else if (part) {
            const word = document.createElement('span');
            word.className = 'gsap-word';
            word.textContent = part;
            fragment.appendChild(word);
          }
        });
        node.parentNode.replaceChild(fragment, node);
      });
      element.dataset.gsapSplit = 'true';
      return element.querySelectorAll('.gsap-word');
    };

    const headingSelectors = [
      '.intro-copy h2',
      '.dark-statement h2',
      '.modules-header h2',
      '.experience-copy h2',
      '.instructor-copy h2',
      '.gallery-header h2',
      '.class-main h2',
      '.faq-heading h2',
      '.final-cta h2'
    ].join(',');

    // 1) TÍTULOS: o usuário literalmente "revela" as palavras enquanto passa pelo bloco.
    document.querySelectorAll(headingSelectors).forEach((heading, index) => {
      const words = splitWords(heading);
      if (!words.length) return;

      gsap.set(words, { opacity: .14, yPercent: 80, rotateX: -35, transformOrigin: '50% 100%' });

      gsap.to(words, {
        opacity: 1,
        yPercent: 0,
        rotateX: 0,
        ease: 'none',
        stagger: { each: .08, from: 'start' },
        scrollTrigger: {
          trigger: heading,
          start: 'top 88%',
          end: 'top 42%',
          scrub: .7,
          invalidateOnRefresh: true
        }
      });
    });

    // 2) TEXTOS: entrada vertical ligada à posição do scroll, não apenas um fade automático.
    const copySelectors = [
      '.intro-copy > p', '.intro-note', '.statement-label', '.contrast-head',
      '.modules-header > p', '.experience-copy > p', '.instructor-copy > p',
      '.gallery-header > p', '.class-intro', '.faq-heading > p', '.final-cta p'
    ].join(',');

    gsap.utils.toArray(copySelectors).forEach((element, index) => {
      gsap.fromTo(element,
        { opacity: 0, y: 46 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top 92%',
            end: 'top 58%',
            scrub: .65,
            invalidateOnRefresh: true
          }
        }
      );
    });

    // 3) HERO: entrada inicial mais forte, separada das animações de scroll.
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTimeline
      .from('.hero .overline', { opacity: 0, y: 24, duration: .5 })
      .from('.hero h1', { opacity: 0, y: 55, duration: .85 }, '-=.2')
      .from('.hero .hero-lead', { opacity: 0, y: 30, duration: .6 }, '-=.4')
      .from('.hero .hero-meta > div', { opacity: 0, y: 24, duration: .5, stagger: .08 }, '-=.25')
      .from('.hero .hero-actions > *', { opacity: 0, y: 20, duration: .45, stagger: .08 }, '-=.2')
      .from('.hero-image-wrap', { opacity: 0, x: 55, scale: .96, duration: 1 }, '-=.75');

    // 4) BLOCOS DE CONTEÚDO: deslocamento lateral + escala sutil conforme entram na tela.
    gsap.utils.toArray('.contrast-row, .module-row, .plain-list li, .faq-item').forEach((element, index) => {
      gsap.fromTo(element,
        { opacity: 0, x: index % 2 ? 34 : -34 },
        {
          opacity: 1,
          x: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top 94%',
            end: 'top 66%',
            scrub: .55,
            invalidateOnRefresh: true
          }
        }
      );
    });

    // 5) IMAGENS: parallax vertical leve ligado ao scroll.
    gsap.utils.toArray('.experience-visual, .instructor-image, .hero-image-wrap').forEach(element => {
      gsap.fromTo(element,
        { opacity: .55, y: 42, scale: .965 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top 94%',
            end: 'top 45%',
            scrub: .8,
            invalidateOnRefresh: true
          }
        }
      );
    });

    // 6) GALERIA: os registros entram em sequência e respondem ao scroll.
    gsap.utils.toArray('.gallery-item').forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, y: 32, scale: .97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top 94%',
            end: 'top 72%',
            scrub: .5,
            invalidateOnRefresh: true
          }
        }
      );
    });

    // Quando o filtro da galeria troca a cidade, as novas mídias recebem GSAP novamente.
    window.addEventListener('gallery:rendered', () => {
      const items = gsap.utils.toArray('#gallery-list .gallery-item');
      gsap.fromTo(items,
        { opacity: 0, y: 26, scale: .98 },
        { opacity: 1, y: 0, scale: 1, duration: .55, stagger: .07, ease: 'power3.out' }
      );
      ScrollTrigger.refresh();
    });

    // Garante que o cálculo dos gatilhos aconteça depois que fontes/imagens forem carregadas.
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    setTimeout(() => ScrollTrigger.refresh(), 250);
  }
})();

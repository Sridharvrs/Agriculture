/* AgroHarvest — Gallery page interactions */

// Filter
function initGalleryFilter() {
  const filters = document.querySelectorAll('.gal-filter');
  const items = document.querySelectorAll('.masonry-item');
  if (!filters.length) return;
  filters.forEach(f => {
    f.addEventListener('click', () => {
      const cat = f.dataset.filter;
      filters.forEach(x => x.classList.remove('active'));
      f.classList.add('active');
      items.forEach(item => {
        const show = cat === 'all' || item.dataset.cat === cat;
        item.classList.toggle('hide', !show);
      });
    });
  });
}

// Lightbox
function initLightbox() {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  if (!lb) return;
  const items = Array.from(document.querySelectorAll('.masonry-item img'));
  let current = 0;

  const open = (i) => {
    current = i;
    lbImg.src = items[i].src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  const nav = (dir) => {
    current = (current + dir + items.length) % items.length;
    lbImg.src = items[current].src;
  };

  items.forEach((img, i) => img.parentElement.addEventListener('click', () => open(i)));
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', () => nav(-1));
  lb.querySelector('.lb-next').addEventListener('click', () => nav(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') nav(-1);
    if (e.key === 'ArrowRight') nav(1);
  });
}

// Count up stats
function initCountUp() {
  const cards = document.querySelectorAll('.gs-card');
  if (!cards.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target.querySelector('[data-count]');
      const target = parseInt(el.dataset.count, 10);
      const suffix = target >= 1000 ? '+' : '';
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
        cur += step;
        if (cur >= target) { el.textContent = target.toLocaleString() + suffix; }
        else { el.textContent = cur.toLocaleString() + suffix; requestAnimationFrame(tick); }
      };
      tick();
      obs.unobserve(e.target);
    });
  }, { threshold: 0.4 });
  cards.forEach(c => obs.observe(c));
}

// Play button (simulated)
function initPlayBtn() {
  const btn = document.getElementById('playBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    btn.innerHTML = '⏸';
    btn.style.animation = 'none';
    const poster = btn.parentElement;
    poster.style.filter = 'brightness(0.5)';
    setTimeout(() => {
      btn.innerHTML = '▶';
      btn.style.animation = 'pulse 2s infinite';
      poster.style.filter = '';
    }, 3000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilter();
  initLightbox();
  initCountUp();
  initPlayBtn();
});

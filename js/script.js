// ============================================================
//  PHARMACIE RHAZLAOUI — Script principal
// ============================================================

// ── IMAGES FLOTTANTES ────────────────────────────────────────
const ORTHO_IMAGES = [
  'images/gallery/thumbs/photo-010.jpg',
  'images/gallery/thumbs/photo-040.jpg',
  'images/gallery/thumbs/photo-055.jpg',
  'images/gallery/thumbs/photo-100.jpg',
  'images/gallery/thumbs/photo-150.jpg',
  'images/gallery/thumbs/photo-200.jpg',
  'images/gallery/thumbs/photo-240.jpg',
  'images/gallery/thumbs/photo-273.jpg',
  'images/gallery/thumbs/photo-050.jpg',
  'images/gallery/thumbs/photo-020.jpg',
  'images/gallery/thumbs/photo-060.jpg',
  'images/gallery/thumbs/photo-235.jpg',
];

function buildFloaters(count) {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  container.innerHTML = '';

  const scale   = parseFloat(document.getElementById('cp-floater-size')?.value || 1);
  const opacity = (parseInt(document.getElementById('cp-floaters')?.value || 70) / 100).toFixed(2);

  for (let i = 0; i < count; i++) {
    const div = document.createElement('div');
    div.className = 'floating-product';
    const baseSize = Math.floor(Math.random() * 42 + 48); // 48–90px
    const size = Math.round(baseSize * scale);
    div.dataset.baseSize = baseSize;
    const duration = (Math.random() * 14 + 12).toFixed(1);
    const delay    = (Math.random() * 20).toFixed(1);
    div.style.cssText = `
      width:${size}px; height:${size}px;
      left:${(Math.random() * 90 + 2).toFixed(1)}%;
      animation-duration:${duration}s;
      animation-delay:-${delay}s;
      opacity:${opacity};
    `;
    const img = document.createElement('img');
    img.src = ORTHO_IMAGES[i % ORTHO_IMAGES.length];
    img.alt = 'produit';
    img.loading = 'lazy';
    div.appendChild(img);
    container.appendChild(div);
  }
}

function rebuildFloaters() {
  const count = parseInt(document.getElementById('cp-floater-count')?.value || 16);
  buildFloaters(count);
}

// ── DOM READY ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // ── LOADER ──────────────────────────────────────────────
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('hidden');
  }, 1800);

  // ── STATUT PHARMACIE (OUVERT / FERMÉ) ────────────────────
  function updatePharmaStatus() {
    const el = document.getElementById('pharmaStatus');
    const textEl = document.getElementById('statusText');
    const hoursEl = document.getElementById('statusHours');
    if (!el) return;

    const now = new Date();
    const day = now.getDay(); // 0=dim, 1=lun...6=sam
    const h = now.getHours();
    const m = now.getMinutes();
    const time = h * 60 + m; // minutes depuis minuit

    let isOpen = false;
    let nextInfo = '';

    if (day >= 1 && day <= 5) {
      // Lundi-Vendredi : 9h00-12h30 et 15h30-20h00
      const matinStart = 9 * 60;       // 540
      const matinEnd = 12 * 60 + 30;   // 750
      const soirStart = 15 * 60 + 30;  // 930
      const soirEnd = 20 * 60;         // 1200

      if (time >= matinStart && time < matinEnd) {
        isOpen = true;
        nextInfo = 'Ferme à 12h30';
      } else if (time >= soirStart && time < soirEnd) {
        isOpen = true;
        nextInfo = 'Ferme à 20h00';
      } else if (time < matinStart) {
        nextInfo = 'Ouvre à 09h00';
      } else if (time >= matinEnd && time < soirStart) {
        nextInfo = 'Ouvre à 15h30';
      } else {
        nextInfo = 'Ouvre demain à 09h00';
      }
    } else if (day === 6) {
      // Samedi : 9h00-13h00
      const samStart = 9 * 60;
      const samEnd = 13 * 60;

      if (time >= samStart && time < samEnd) {
        isOpen = true;
        nextInfo = 'Ferme à 13h00';
      } else if (time < samStart) {
        nextInfo = 'Ouvre à 09h00';
      } else {
        nextInfo = 'Ouvre lundi à 09h00';
      }
    } else {
      // Dimanche — fermé
      nextInfo = 'Ouvre lundi à 09h00';
    }

    el.classList.remove('open', 'closed');
    el.classList.add(isOpen ? 'open' : 'closed');
    textEl.textContent = isOpen ? 'Ouvert' : 'Fermé';
    hoursEl.textContent = '· ' + nextInfo;
  }

  updatePharmaStatus();
  setInterval(updatePharmaStatus, 60000); // mise à jour chaque minute

  // ── NAVBAR SCROLL ────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    document.querySelector('.scroll-top')?.classList.toggle('visible', window.scrollY > 400);
  });

  // ── HAMBURGER MENU ───────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  hamburger?.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    mobileMenu.classList.contains('open')
      ? (spans[0].style.transform='rotate(45deg) translate(5px,6px)',
         spans[1].style.opacity='0',
         spans[2].style.transform='rotate(-45deg) translate(5px,-6px)')
      : (spans[0].style.transform='',spans[1].style.opacity='',spans[2].style.transform='');
  });
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  }));

  // ── SCROLL TO TOP ────────────────────────────────────────
  document.querySelector('.scroll-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── PHOTOS FLOTTANTES ────────────────────────────────────
  buildFloaters(16);

  // ── CHARGEMENT DES PRODUITS ──────────────────────────────
  renderComplements();
  renderCosmetiques();
  renderAppareils();
  renderDoppelherz();
  renderMarques();
  renderOrthopediques();
  renderMedicaments();
  renderEnfants();
  renderFemmes();
  renderDivers();
  renderOffres();

  // ── FILTRES ONGLETS ──────────────────────────────────────
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.tab-group');
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ── INTERSECTION OBSERVER ────────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el));

  // ── COMPTEUR STATS ───────────────────────────────────────
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const num = entry.target.querySelector('.stat-number');
        if (num && !num.dataset.counted) {
          num.dataset.counted = true;
          animateCounter(num, parseInt(num.dataset.target || num.textContent));
        }
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-box').forEach(el => statObserver.observe(el));

});

// ── SÉCURITÉ — SANITISATION ─────────────────────────────────

// Échappe les caractères HTML dangereux pour empêcher les injections XSS
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Valide qu'une URL est sûre (pas de javascript:, data:, etc.)
function sanitizeUrl(url) {
  if (!url) return '';
  const trimmed = url.trim().toLowerCase();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('images/')) {
    return url.trim();
  }
  return '';
}

// ── FONCTIONS RENDER ────────────────────────────────────────

function getImage(product) {
  return sanitizeUrl(product.imagePerso) || sanitizeUrl(product.image) || '';
}

function createProductCard(product, showPrice = true) {
  const img = getImage(product);
  const safeName = escapeHtml(product.nom);
  const safeMarque = escapeHtml(product.marque);
  const safeCat = escapeHtml(product.categorie);
  const safeDesc = escapeHtml(product.description);
  const safePrix = escapeHtml(product.prix);
  const safeAncienPrix = escapeHtml(product.ancienPrix);
  const safeBadge = escapeHtml(product.badge);

  const imgHtml = img
    ? `<img src="${img}" alt="${safeName}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
       <div class="photo-placeholder" style="display:none"><i class="fas fa-camera"></i><span>Photo à ajouter<br><small>${safeName}</small></span></div>`
    : placeholderHtml(safeName);

  const badgeHtml = product.badge
    ? `<span class="badge ${product.badge === 'PROMO' ? 'badge-promo' : 'badge-new'}">${safeBadge}</span>`
    : product.surOrdonnance
    ? `<span class="badge badge-rx"><i class="fas fa-prescription"></i> Ordonnance</span>`
    : '';

  const priceHtml = showPrice
    ? product.prix
      ? `<div class="price-bloc">
           <span class="price">${safePrix}</span>
           ${product.ancienPrix ? `<span class="old-price">${safeAncienPrix}</span>` : ''}
         </div>`
      : `<span class="price-empty">Prix sur demande</span>`
    : `<span class="price-empty">Renseignez-vous</span>`;

  const waMsg = encodeURIComponent(`Bonjour, je voudrais des informations sur: ${product.nom}`);

  return `
    <div class="product-card fade-in" onclick="openProductModal('${escapeHtml(product.id)}')" style="cursor:pointer">
      <div class="product-img-wrap">
        ${imgHtml}
        ${badgeHtml}
      </div>
      <div class="product-body">
        ${safeMarque || safeCat ? `<div class="product-brand">${safeMarque || safeCat}</div>` : ''}
        <div class="product-name">${safeName}</div>
        <div class="product-desc">${safeDesc}</div>
        <div class="product-price-row">
          ${priceHtml}
          <a href="https://wa.me/${escapeHtml(PHARMACIE_INFO.whatsapp)}?text=${waMsg}"
             target="_blank" rel="noopener noreferrer" class="btn-whatsapp-product" onclick="event.stopPropagation()">
            <i class="fab fa-whatsapp"></i> Commander
          </a>
        </div>
      </div>
    </div>`;
}

function placeholderHtml(nom) {
  const safe = escapeHtml(nom);
  return `<div class="photo-placeholder">
    <i class="fas fa-camera"></i>
    <span>Photo à ajouter<br><small>${safe}</small></span>
  </div>`;
}

function renderComplements() {
  const grid = document.getElementById('grid-complements');
  if (!grid || !PRODUCTS.complements) return;
  grid.innerHTML = PRODUCTS.complements.map(p => createProductCard(p, true)).join('');
  reObserve();
}

function renderCosmetiques() {
  const grid = document.getElementById('grid-cosmetiques');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.cosmetiques.map(p => createProductCard(p, true)).join('');
  reObserve();
}

function renderAppareils() {
  const grid = document.getElementById('grid-appareils');
  if (!grid || !PRODUCTS.appareils) return;
  grid.innerHTML = PRODUCTS.appareils.map(p => createProductCard(p, true)).join('');
  reObserve();
}

function renderDoppelherz() {
  const grid = document.getElementById('grid-doppelherz');
  if (!grid || !PRODUCTS.doppelherz) return;
  grid.innerHTML = PRODUCTS.doppelherz.map(p => createProductCard(p, true)).join('');
  reObserve();
}

function getGammeProducts(gamme) {
  const cats = ['cosmetiques','complements','doppelherz','appareils','orthopediques','medicaments','enfants','femmes','divers','cerave'];
  const products = [];
  cats.forEach(cat => {
    if (PRODUCTS[cat]) {
      PRODUCTS[cat].forEach(p => {
        const pMarque = p.marque || '';
        if (gamme.marques && gamme.marques.some(m => pMarque.includes(m) || m.includes(pMarque))) {
          products.push(p);
        }
      });
    }
  });
  return products;
}

function renderMarques() {
  const grid = document.getElementById('brands-grid');
  if (!grid || typeof GAMMES === 'undefined') return;
  grid.innerHTML = GAMMES.map(g => {
    const count = getGammeProducts(g).length;
    return `
    <div class="gamme-card fade-in" onclick="openGammeOverlay('${escapeHtml(g.id)}')">
      <div class="gamme-card-img">
        <img src="${sanitizeUrl(g.logo)}" alt="${escapeHtml(g.nom)}" loading="lazy">
      </div>
      <div class="gamme-card-body">
        <h3>${escapeHtml(g.nom)}</h3>
        <p>${escapeHtml(g.description)}</p>
        <div class="gamme-card-count"><i class="${g.icon || 'fas fa-capsules'}"></i> ${count} produit${count > 1 ? 's' : ''}</div>
        <span class="gamme-voir-plus">VOIR PLUS <i class="fas fa-arrow-right"></i></span>
      </div>
    </div>`;
  }).join('');
  reObserve();
}

function renderOrthopediques() {
  const grid = document.getElementById('grid-orthopediques');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.orthopediques.map(p => createProductCard(p, true)).join('');
  reObserve();
}

function renderMedicaments() {
  const grid = document.getElementById('grid-medicaments');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.medicaments.map(p => createProductCard(p, false)).join('');
  reObserve();
}

function renderEnfants() {
  const grid = document.getElementById('grid-enfants');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.enfants.map(p => createProductCard(p, true)).join('');
  reObserve();
}

function renderFemmes() {
  const grid = document.getElementById('grid-femmes');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.femmes.map(p => createProductCard(p, true)).join('');
  reObserve();
}

function renderDivers() {
  const grid = document.getElementById('grid-divers');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.divers.map(p => createProductCard(p, true)).join('');
  reObserve();
}

function renderOffres() {
  const cont = document.getElementById('offres-container');
  if (!cont) return;
  const actives = OFFRES.filter(o => o.actif);
  if (actives.length === 0) {
    cont.innerHTML = `
      <div class="offre-card offre-placeholder">
        <i class="fas fa-tag"></i>
        <p>Vos offres spéciales apparaîtront ici.<br>Activez-les dans le panneau admin.</p>
      </div>
      <div class="offre-card offre-placeholder">
        <i class="fas fa-percentage"></i>
        <p>Promotion cosmétiques — à configurer</p>
      </div>
      <div class="offre-card offre-placeholder">
        <i class="fas fa-gift"></i>
        <p>Pack spécial — à configurer</p>
      </div>`;
    return;
  }
  cont.innerHTML = actives.map(o => `
    <div class="offre-card fade-in">
      <span class="offre-badge-top">OFFRE SPÉCIALE</span>
      <h3>${escapeHtml(o.titre)}</h3>
      <p>${escapeHtml(o.description)}</p>
      <a href="https://wa.me/${escapeHtml(PHARMACIE_INFO.whatsapp)}?text=${encodeURIComponent('Bonjour, je voudrais en savoir plus sur: ' + o.titre)}"
         target="_blank" rel="noopener noreferrer" class="btn-offre">
        <i class="fab fa-whatsapp"></i> En profiter
      </a>
    </div>`).join('');
  reObserve();
}

function reObserve() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => obs.observe(el));
}

function animateCounter(el, target) {
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + (el.dataset.suffix || '+');
    if (current >= target) clearInterval(timer);
  }, 25);
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; document.body.appendChild(toast); }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ── GALERIE PHOTOS ──────────────────────────────────────────
(function() {
  if (typeof GALLERY_PHOTOS === 'undefined') return;

  const grid = document.getElementById('gallery-grid');
  const loadMoreBtn = document.getElementById('gallery-load-more');
  const countEl = document.getElementById('gallery-count');
  if (!grid) return;

  let currentFilter = 'all';
  let visibleCount = 24;
  const BATCH = 24;

  function getFiltered() {
    if (currentFilter === 'all') return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter(p => p.category === currentFilter);
  }

  function renderGallery() {
    const filtered = getFiltered();
    const toShow = filtered.slice(0, visibleCount);

    grid.innerHTML = toShow.map((photo, i) => `
      <div class="gallery-item fade-in" data-index="${GALLERY_PHOTOS.indexOf(photo)}">
        <img src="${photo.thumb}" data-full="${photo.src}" alt="${photo.caption}" loading="lazy">
        <div class="gallery-overlay"></div>
        <div class="gallery-label">${photo.caption}</div>
      </div>
    `).join('');

    if (countEl) {
      countEl.textContent = filtered.length + ' photo' + (filtered.length > 1 ? 's' : '') +
        (currentFilter !== 'all' ? ' dans cette catégorie' : ' au total');
    }

    if (loadMoreBtn) {
      loadMoreBtn.classList.toggle('hidden', visibleCount >= filtered.length);
    }

    reObserve();
  }

  // Filtres
  document.querySelectorAll('.gallery-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gallery-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      visibleCount = BATCH;
      renderGallery();
    });
  });

  // Voir plus
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleCount += BATCH;
      renderGallery();
    });
  }

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');
  const lbCounter = document.getElementById('lightbox-counter');
  let lbIndex = 0;
  let lbFiltered = [];

  function openLightbox(index) {
    lbFiltered = getFiltered();
    lbIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const photo = lbFiltered[lbIndex];
    if (!photo) return;
    lbImg.src = photo.src;
    lbImg.alt = photo.caption;
    if (lbCaption) lbCaption.textContent = photo.caption;
    if (lbCounter) lbCounter.textContent = (lbIndex + 1) + ' / ' + lbFiltered.length;
  }

  function lbPrev() { lbIndex = (lbIndex - 1 + lbFiltered.length) % lbFiltered.length; updateLightbox(); }
  function lbNext() { lbIndex = (lbIndex + 1) % lbFiltered.length; updateLightbox(); }

  grid.addEventListener('click', e => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    const globalIdx = parseInt(item.dataset.index);
    const filtered = getFiltered();
    const filteredIdx = filtered.indexOf(GALLERY_PHOTOS[globalIdx]);
    openLightbox(filteredIdx >= 0 ? filteredIdx : 0);
  });

  if (lightbox) {
    lightbox.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-backdrop')?.addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev')?.addEventListener('click', lbPrev);
    lightbox.querySelector('.lightbox-next')?.addEventListener('click', lbNext);
  }

  document.addEventListener('keydown', e => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbPrev();
    if (e.key === 'ArrowRight') lbNext();
  });

  // Swipe tactile
  let touchStartX = 0;
  lightbox?.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
  lightbox?.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) { diff > 0 ? lbPrev() : lbNext(); }
  });

  renderGallery();
})();

// ══════════════════════════════════════════════
//  OVERLAY PRODUITS PAR GAMME
// ══════════════════════════════════════════════
function openGammeOverlay(gammeId) {
  const gamme = GAMMES.find(g => g.id === gammeId);
  if (!gamme) return;
  const overlay = document.getElementById('gamme-overlay');
  const title = document.getElementById('gamme-overlay-title');
  const desc = document.getElementById('gamme-overlay-desc');
  const count = document.getElementById('gamme-overlay-count');
  const grid = document.getElementById('gamme-products-grid');

  const products = getGammeProducts(gamme);

  title.textContent = gamme.nom;
  desc.textContent = gamme.description;
  count.innerHTML = `<i class="${gamme.icon || 'fas fa-capsules'}"></i> ${products.length} produit${products.length > 1 ? 's' : ''} dans cette gamme`;
  grid.innerHTML = products.map(p => createProductCard(p, true)).join('');

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  overlay.scrollTop = 0;
}

(function() {
  const overlay = document.getElementById('gamme-overlay');
  const backBtn = document.getElementById('gamme-overlay-back');
  function closeGamme() { overlay.classList.remove('active'); document.body.style.overflow = ''; }
  backBtn?.addEventListener('click', closeGamme);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay?.classList.contains('active')) closeGamme(); });
})();

// ══════════════════════════════════════════════
//  MODAL DÉTAIL PRODUIT
// ══════════════════════════════════════════════
function openProductModal(productId) {
  const cats = ['cosmetiques','complements','doppelherz','appareils','orthopediques','medicaments','enfants','femmes','divers','cerave'];
  let product = null;
  for (const cat of cats) {
    if (PRODUCTS[cat]) {
      product = PRODUCTS[cat].find(p => p.id === productId);
      if (product) break;
    }
  }
  if (!product) return;

  const modal = document.getElementById('product-modal');
  const img = document.getElementById('pm-img');
  const badge = document.getElementById('pm-badge');
  const brand = document.getElementById('pm-brand');
  const name = document.getElementById('pm-name');
  const gamme = document.getElementById('pm-gamme');
  const desc = document.getElementById('pm-desc');
  const benefits = document.getElementById('pm-benefits');
  const benefitsSection = document.getElementById('pm-benefits-section');
  const usage = document.getElementById('pm-usage');
  const usageSection = document.getElementById('pm-usage-section');
  const composition = document.getElementById('pm-composition');
  const compositionSection = document.getElementById('pm-composition-section');
  const priceEl = document.getElementById('pm-price');
  const waBtn = document.getElementById('pm-whatsapp');

  img.src = getImage(product) || '';
  img.alt = product.nom;

  badge.className = 'pm-badge';
  badge.textContent = '';
  if (product.badge === 'NOUVEAU') { badge.classList.add('badge-new'); badge.textContent = 'NOUVEAU'; }
  else if (product.badge === 'PROMO') { badge.classList.add('badge-promo'); badge.textContent = 'PROMO'; }
  else if (product.surOrdonnance) { badge.classList.add('badge-rx'); badge.innerHTML = '<i class="fas fa-prescription"></i> Ordonnance'; }

  brand.textContent = product.marque || product.categorie || '';
  name.textContent = product.nom;
  gamme.textContent = product.gamme || '';
  gamme.style.display = product.gamme ? 'inline-block' : 'none';
  desc.textContent = product.description || '';

  // Benefits
  if (product.bienfaits && product.bienfaits.length) {
    benefitsSection.style.display = 'block';
    benefits.innerHTML = product.bienfaits.map(b => `<li>${escapeHtml(b)}</li>`).join('');
  } else {
    benefitsSection.style.display = 'none';
  }

  // Usage
  if (product.utilisation) {
    usageSection.style.display = 'block';
    usage.textContent = product.utilisation;
  } else {
    usageSection.style.display = 'none';
  }

  // Composition
  if (product.composition) {
    compositionSection.style.display = 'block';
    composition.textContent = product.composition;
  } else {
    compositionSection.style.display = 'none';
  }

  // Disponibilité
  const dispoEl = document.getElementById('pm-dispo');
  if (product.disponible === false) {
    dispoEl.className = 'pm-dispo sur-commande';
    dispoEl.textContent = 'Sur commande — contactez-nous';
  } else {
    dispoEl.className = 'pm-dispo en-stock';
    dispoEl.textContent = 'En stock — disponible en pharmacie';
  }

  // Date de péremption
  const peremptionEl = document.getElementById('pm-peremption');
  if (product.peremption) {
    peremptionEl.style.display = 'block';
    peremptionEl.innerHTML = '<i class="fas fa-calendar-check"></i> Péremption : ' + escapeHtml(product.peremption);
  } else {
    peremptionEl.style.display = 'none';
  }

  // Price
  if (product.prix) {
    priceEl.innerHTML = `<span class="price">${escapeHtml(product.prix)}</span>${product.ancienPrix ? `<span class="old-price">${escapeHtml(product.ancienPrix)}</span>` : ''}`;
  } else {
    priceEl.innerHTML = '<span class="price-empty">Prix sur demande</span>';
  }

  // WhatsApp
  const waMsg = encodeURIComponent(`Bonjour, je voudrais des informations sur: ${product.nom} (${product.marque})`);
  waBtn.href = `https://wa.me/${PHARMACIE_INFO.whatsapp}?text=${waMsg}`;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

(function() {
  const modal = document.getElementById('product-modal');
  const closeBtn = document.getElementById('product-modal-close');
  function closeModal() { modal.classList.remove('active'); document.body.style.overflow = ''; }
  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal?.classList.contains('active')) closeModal(); });
})();

// ══════════════════════════════════════════════
//  RECHERCHE PRODUITS (texte + image)
// ══════════════════════════════════════════════
(function() {
  const overlay    = document.getElementById('search-overlay');
  const openBtn    = document.getElementById('open-search');
  const closeBtn   = document.getElementById('close-search');
  const input      = document.getElementById('search-input');
  const clearBtn   = document.getElementById('search-clear');
  const resultsGrid = document.getElementById('search-results-grid');
  const resultsInfo = document.getElementById('search-results-info');
  const uploadInput = document.getElementById('search-upload');
  const cameraInput = document.getElementById('search-camera');
  const previewZone = document.getElementById('search-preview-zone');
  const previewImg  = document.getElementById('search-preview-img');
  const previewRemove = document.getElementById('search-preview-remove');

  if (!overlay || !openBtn) return;

  // Build flat product list from all categories
  const allProducts = [];
  if (typeof PRODUCTS !== 'undefined') {
    const cats = ['cosmetiques','complements','doppelherz','appareils','orthopediques','medicaments','enfants','femmes','divers','cerave'];
    cats.forEach(cat => {
      if (PRODUCTS[cat]) {
        PRODUCTS[cat].forEach(p => {
          allProducts.push({ ...p, _cat: cat });
        });
      }
    });
  }

  // Open / Close
  function openSearch() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input.focus(), 300);
  }
  function closeSearch() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    input.value = '';
    clearBtn.classList.remove('visible');
    resultsGrid.innerHTML = '';
    resultsInfo.innerHTML = '';
    hidePreview();
  }

  openBtn.addEventListener('click', openSearch);
  closeBtn.addEventListener('click', closeSearch);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeSearch();
  });

  // Search logic
  let debounceTimer;
  input.addEventListener('input', () => {
    clearBtn.classList.toggle('visible', input.value.length > 0);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => doSearch(input.value.trim()), 200);
  });
  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.classList.remove('visible');
    if (previewZone.style.display !== 'none') {
      showAllProducts();
    } else {
      resultsGrid.innerHTML = '';
      resultsInfo.innerHTML = '<span style="color:var(--texte-2)"><i class="fas fa-search" style="margin-right:6px"></i>Tapez un nom de produit pour commencer</span>';
    }
    input.focus();
  });

  function doSearch(query) {
    if (!query) {
      if (previewZone.style.display !== 'none') {
        showAllProducts();
      } else {
        resultsGrid.innerHTML = '';
        resultsInfo.innerHTML = '<span style="color:var(--texte-2)"><i class="fas fa-search" style="margin-right:6px"></i>Tapez un nom de produit pour commencer</span>';
      }
      return;
    }
    const q = query.toLowerCase();
    const results = allProducts.filter(p =>
      (p.nom && p.nom.toLowerCase().includes(q)) ||
      (p.marque && p.marque.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.gamme && p.gamme.toLowerCase().includes(q))
    );
    renderResults(results, query);
  }

  function renderResults(products, query) {
    if (products.length === 0) {
      resultsInfo.innerHTML = '<span class="no-result"><i class="fas fa-exclamation-circle" style="margin-right:6px"></i>Aucun produit trouvé pour "' + escapeHtml(query) + '" — Ce produit n\'est pas disponible dans notre pharmacie</span>';
      resultsGrid.innerHTML = '';
      return;
    }
    resultsInfo.innerHTML = '<span class="result-count">' + products.length + '</span> produit' + (products.length > 1 ? 's' : '') + ' trouvé' + (products.length > 1 ? 's' : '') + (query ? ' pour "<strong>' + escapeHtml(query) + '</strong>"' : '');
    resultsGrid.innerHTML = products.map(p => createProductCard(p, true)).join('');
  }

  function showAllProducts() {
    resultsInfo.innerHTML = '<span class="result-count">' + allProducts.length + '</span> produits — Comparez avec votre image ci-dessus';
    resultsGrid.innerHTML = allProducts.map(p => createProductCard(p, true)).join('');
  }

  // Image upload & camera
  function handleImage(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => {
      previewImg.src = e.target.result;
      previewZone.style.display = 'block';
      // Show all products so user can compare
      const q = input.value.trim();
      if (q) { doSearch(q); } else { showAllProducts(); }
    };
    reader.readAsDataURL(file);
  }

  function hidePreview() {
    previewZone.style.display = 'none';
    previewImg.src = '';
    uploadInput.value = '';
    cameraInput.value = '';
  }

  uploadInput.addEventListener('change', e => { if (e.target.files[0]) handleImage(e.target.files[0]); });
  cameraInput.addEventListener('change', e => { if (e.target.files[0]) handleImage(e.target.files[0]); });
  previewRemove.addEventListener('click', () => {
    hidePreview();
    if (!input.value.trim()) {
      resultsGrid.innerHTML = '';
      resultsInfo.innerHTML = '<span style="color:var(--texte-2)"><i class="fas fa-search" style="margin-right:6px"></i>Tapez un nom de produit pour commencer</span>';
    }
  });
})();

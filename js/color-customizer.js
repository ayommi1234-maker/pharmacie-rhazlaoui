// ============================================================
//  PERSONNALISATION COULEURS — HERO + NAVBAR + TICKER + PAGE
//  Pharmacie Rhazlaoui
// ============================================================

// Valeurs par défaut
const DEFAULTS = {
  c1:'#003D1F', c2:'#00C96B', c3:'#007A3D', cross:'#FFFFFF', text:'#FFFFFF', accent:'#D4AF37',
  caduceus:'#FFFFFF', floaters: 70, speed:'12s',
  navBg:'#FFFFFF', navLinks:'#555555', navBrand:'#007A3D', navBorder:'#00A651', navCross:'#00A651', navSub:'#D4AF37',
  tickerBg:'#007A3D', tickerText:'#FFFFFF', tickerIcon:'#D4AF37',
  pageMain:'#00A651', pageDark:'#007A3D', pageLight:'#E8F5EE', pageGrey:'#F5F7FA',
  pageAccent:'#D4AF37', pageText:'#1A1A2E', pageText2:'#555555',
  footerTop:'#001A0A', footerBot:'#003D1F',
};

const THEMES = {
  vert: {
    c1:'#003D1F', c2:'#00C96B', c3:'#007A3D', cross:'#FFFFFF', text:'#FFFFFF', accent:'#D4AF37', caduceus:'#FFFFFF',
    navBg:'#FFFFFF', navLinks:'#555555', navBrand:'#007A3D', navBorder:'#00A651', navCross:'#00A651', navSub:'#D4AF37',
    tickerBg:'#007A3D', tickerText:'#FFFFFF', tickerIcon:'#D4AF37',
    pageMain:'#00A651', pageDark:'#007A3D', pageLight:'#E8F5EE', pageGrey:'#F5F7FA',
    pageAccent:'#D4AF37', pageText:'#1A1A2E', pageText2:'#555555', footerTop:'#001A0A', footerBot:'#003D1F',
    sectionBg:'#FFFFFF', sectionAlt:'#F5F7FA', cardBg:'#FFFFFF',
  },
  bleu: {
    c1:'#0A2463', c2:'#1E90FF', c3:'#1565C0', cross:'#FFFFFF', text:'#FFFFFF', accent:'#64B5F6', caduceus:'#64B5F6',
    navBg:'#0A2463', navLinks:'#BBDEFB', navBrand:'#FFFFFF', navBorder:'#1E90FF', navCross:'#1E90FF', navSub:'#64B5F6',
    tickerBg:'#0A2463', tickerText:'#FFFFFF', tickerIcon:'#64B5F6',
    pageMain:'#1E90FF', pageDark:'#1565C0', pageLight:'#E3F2FD', pageGrey:'#EEF4FF',
    pageAccent:'#64B5F6', pageText:'#0A2463', pageText2:'#1565C0', footerTop:'#020D2E', footerBot:'#0A2463',
  },
  violet: {
    c1:'#1A1A2E', c2:'#7B2FBE', c3:'#4A1080', cross:'#FFFFFF', text:'#FFFFFF', accent:'#CE93D8', caduceus:'#CE93D8',
    navBg:'#1A1A2E', navLinks:'#CE93D8', navBrand:'#FFFFFF', navBorder:'#7B2FBE', navCross:'#7B2FBE', navSub:'#CE93D8',
    tickerBg:'#4A1080', tickerText:'#FFFFFF', tickerIcon:'#CE93D8',
    pageMain:'#7B2FBE', pageDark:'#4A1080', pageLight:'#F3E5F5', pageGrey:'#FAF0FF',
    pageAccent:'#CE93D8', pageText:'#1A1A2E', pageText2:'#4A1080', footerTop:'#0A0016', footerBot:'#1A1A2E',
  },
  rouge: {
    c1:'#7A0000', c2:'#C0392B', c3:'#9B1C1C', cross:'#FFFFFF', text:'#FFFFFF', accent:'#FFCDD2', caduceus:'#FFCDD2',
    navBg:'#7A0000', navLinks:'#FFCDD2', navBrand:'#FFFFFF', navBorder:'#C0392B', navCross:'#C0392B', navSub:'#FFCDD2',
    tickerBg:'#9B1C1C', tickerText:'#FFFFFF', tickerIcon:'#FFCDD2',
    pageMain:'#C0392B', pageDark:'#7A0000', pageLight:'#FFEBEE', pageGrey:'#FFF5F5',
    pageAccent:'#FFCDD2', pageText:'#1A0000', pageText2:'#7A0000', footerTop:'#1A0000', footerBot:'#7A0000',
  },
  noir: {
    c1:'#000000', c2:'#1A1A1A', c3:'#111', cross:'#00A651', text:'#FFFFFF', accent:'#D4AF37', caduceus:'#D4AF37',
    navBg:'#111111', navLinks:'#CCCCCC', navBrand:'#FFFFFF', navBorder:'#D4AF37', navCross:'#00A651', navSub:'#D4AF37',
    tickerBg:'#000000', tickerText:'#FFFFFF', tickerIcon:'#D4AF37',
    pageMain:'#D4AF37', pageDark:'#9A7D0A', pageLight:'#F9F3E3', pageGrey:'#F5F5F5',
    pageAccent:'#D4AF37', pageText:'#1A1A1A', pageText2:'#444444', footerTop:'#000000', footerBot:'#111111',
  },
  or: {
    c1:'#5D3A00', c2:'#D4AF37', c3:'#B5541B', cross:'#FFFFFF', text:'#FFFFFF', accent:'#FFF9C4', caduceus:'#FFF9C4',
    navBg:'#5D3A00', navLinks:'#FFF9C4', navBrand:'#FFFFFF', navBorder:'#D4AF37', navCross:'#D4AF37', navSub:'#FFF9C4',
    tickerBg:'#B5541B', tickerText:'#FFFFFF', tickerIcon:'#FFF9C4',
    pageMain:'#D4AF37', pageDark:'#B5541B', pageLight:'#FFF8E1', pageGrey:'#FFFDE7',
    pageAccent:'#D4AF37', pageText:'#3E2000', pageText2:'#5D3A00', footerTop:'#1A0E00', footerBot:'#5D3A00',
  },
  turquoise: {
    c1:'#005F73', c2:'#0A9396', c3:'#148F8F', cross:'#FFFFFF', text:'#FFFFFF', accent:'#94D2BD', caduceus:'#94D2BD',
    navBg:'#005F73', navLinks:'#94D2BD', navBrand:'#FFFFFF', navBorder:'#0A9396', navCross:'#0A9396', navSub:'#94D2BD',
    tickerBg:'#005F73', tickerText:'#FFFFFF', tickerIcon:'#94D2BD',
    pageMain:'#0A9396', pageDark:'#005F73', pageLight:'#E0F7F7', pageGrey:'#F0FAFA',
    pageAccent:'#94D2BD', pageText:'#003344', pageText2:'#005F73', footerTop:'#001520', footerBot:'#005F73',
  },
  emeraude: {
    c1:'#1B4332', c2:'#52B788', c3:'#2D6A4F', cross:'#FFFFFF', text:'#FFFFFF', accent:'#B7E4C7', caduceus:'#B7E4C7',
    navBg:'#1B4332', navLinks:'#B7E4C7', navBrand:'#FFFFFF', navBorder:'#52B788', navCross:'#52B788', navSub:'#B7E4C7',
    tickerBg:'#2D6A4F', tickerText:'#FFFFFF', tickerIcon:'#B7E4C7',
    pageMain:'#52B788', pageDark:'#2D6A4F', pageLight:'#D8F3DC', pageGrey:'#EEFAF2',
    pageAccent:'#B7E4C7', pageText:'#1B4332', pageText2:'#2D6A4F', footerTop:'#071C10', footerBot:'#1B4332',
  },
  blanc: {
    c1:'#F8F9FA', c2:'#E9ECEF', c3:'#DEE2E6', cross:'#00A651', text:'#1A1A2E', accent:'#007A3D', caduceus:'#00A651',
    navBg:'#FFFFFF', navLinks:'#555555', navBrand:'#007A3D', navBorder:'#00A651', navCross:'#00A651', navSub:'#D4AF37',
    tickerBg:'#F0F0F0', tickerText:'#333333', tickerIcon:'#00A651',
    pageMain:'#00A651', pageDark:'#007A3D', pageLight:'#E8F5EE', pageGrey:'#F5F7FA',
    pageAccent:'#D4AF37', pageText:'#1A1A2E', pageText2:'#555555', footerTop:'#001A0A', footerBot:'#003D1F',
  },
};

// ── Ouvrir/fermer ────────────────────────────────────────────
function toggleColorPanel() {
  document.getElementById('colorPanel').classList.toggle('open');
}
document.addEventListener('click', e => {
  const panel = document.getElementById('colorPanel');
  const btn = document.querySelector('.color-toggle-btn');
  if (panel?.classList.contains('open') && !panel.contains(e.target) && !btn?.contains(e.target)) {
    panel.classList.remove('open');
  }
});

// ── Appliquer un thème complet ───────────────────────────────
function applyTheme(name) {
  const t = THEMES[name];
  if (!t) return;
  const set = (id, v) => { const el = document.getElementById(id); if (el && v) el.value = v; };
  Object.keys(t).forEach(k => {
    const map = {
      c1:'cp-color1', c2:'cp-color2', c3:'cp-color3', cross:'cp-cross', text:'cp-text', accent:'cp-accent',
      caduceus:'cp-caduceus',
      navBg:'cp-nav-bg', navLinks:'cp-nav-links', navBrand:'cp-nav-brand', navBorder:'cp-nav-border',
      navCross:'cp-nav-cross', navSub:'cp-nav-sub',
      tickerBg:'cp-ticker-bg', tickerText:'cp-ticker-text', tickerIcon:'cp-ticker-icon',
      pageMain:'cp-page-main', pageDark:'cp-page-dark', pageLight:'cp-page-light', pageGrey:'cp-page-grey',
      pageAccent:'cp-page-accent', pageText:'cp-page-text', pageText2:'cp-page-text2',
      footerTop:'cp-footer-top', footerBot:'cp-footer-bot',
      sectionBg:'cp-section-bg', sectionAlt:'cp-section-alt', cardBg:'cp-card-bg',
    };
    if (map[k]) set(map[k], t[k]);
  });
  updateHexLabels();
  applyCustom();
  document.querySelectorAll('.theme-swatch').forEach(s => s.classList.remove('active-theme'));
  event?.currentTarget?.classList.add('active-theme');
}

// ── Appliquer toutes les couleurs ────────────────────────────
function applyCustom() {
  const v = id => document.getElementById(id)?.value || '';

  // ─ HERO ─
  const c1 = v('cp-color1'), c2 = v('cp-color2'), c3 = v('cp-color3');
  const cross = v('cp-cross'), text = v('cp-text'), accent = v('cp-accent');
  const caduceus = v('cp-caduceus');
  const floaterOpacity = (parseInt(document.getElementById('cp-floaters')?.value || 70) / 100).toFixed(2);
  const speed = document.getElementById('cp-speed')?.value || '12s';

  const hero = document.getElementById('hero');
  if (hero) hero.style.background = `linear-gradient(135deg, ${c1} 0%, ${c3} 40%, ${c2} 100%)`;

  // Caducée SVG — coloriser tous les paths/rects/ellipses/cercles
  const svg = document.getElementById('caduceus-svg');
  if (svg) {
    svg.querySelectorAll('path, rect, ellipse').forEach(el => {
      if (el.getAttribute('fill') && el.getAttribute('fill') !== 'none') el.setAttribute('fill', caduceus);
      if (el.getAttribute('stroke') && el.getAttribute('stroke') !== 'none') el.setAttribute('stroke', caduceus);
    });
    svg.querySelectorAll('circle').forEach((el, i) => {
      // Les petits cercles yeux gardent une couleur foncée
      if (parseFloat(el.getAttribute('r')) < 3) {
        el.setAttribute('fill', c1);
      } else if (el.getAttribute('fill') !== 'none') {
        el.setAttribute('fill', caduceus);
      }
    });
    svg.style.filter = `drop-shadow(0 0 18px ${caduceus}88) drop-shadow(0 0 40px ${c2}55)`;
  }

  // Loader
  const loader = document.getElementById('page-loader');
  if (loader) loader.style.background = c1;
  const loaderCross = document.querySelector('.loader-cross');
  if (loaderCross) loaderCross.style.background = text;

  // Logo 3D faces
  document.querySelectorAll('.logo-face-front, .logo-face-back').forEach(el => {
    el.style.background = `linear-gradient(135deg, ${c1}ee, ${c3}bb)`;
  });
  document.querySelectorAll('.logo-face-left, .logo-face-right').forEach(el => {
    el.style.background = hexToRgba(c1, 0.85);
  });
  document.querySelectorAll('.logo-main-text').forEach(el => el.style.color = text);
  document.querySelectorAll('.logo-sub-text').forEach(el => el.style.color = accent);
  document.querySelectorAll('.logo-side-text').forEach(el => el.style.color = hexToRgba(text, 0.8));

  const sub = document.querySelector('.hero-subtitle');
  if (sub) sub.style.color = hexToRgba(text, 0.9);

  document.querySelectorAll('.hero-badge').forEach(el => {
    el.style.background  = hexToRgba(text === '#FFFFFF' ? '#FFFFFF' : '#000000', 0.12);
    el.style.color       = text;
    el.style.borderColor = hexToRgba(text, 0.25);
  });
  document.querySelectorAll('.hero-badge i').forEach(el => el.style.color = accent);

  // Photos flottantes — opacité + taille
  const floaterScale = parseFloat(document.getElementById('cp-floater-size')?.value || 1);
  document.querySelectorAll('.floating-product').forEach(el => {
    el.style.opacity = floaterOpacity;
    const base = parseInt(el.dataset.baseSize || 60);
    const newSize = Math.round(base * floaterScale);
    el.style.width  = newSize + 'px';
    el.style.height = newSize + 'px';
  });

  const scene = document.querySelector('.logo-3d-scene');
  if (scene) scene.style.animationDuration = speed;

  const scrollEl = document.querySelector('.hero-scroll');
  if (scrollEl) scrollEl.style.color = hexToRgba(text, 0.7);

  // ─ STATUT PHARMACIE ─
  const statusOpen = v('cp-status-open') || '#25D366';
  const statusClosed = v('cp-status-closed') || '#FF4757';
  const statusEl = document.getElementById('pharmaStatus');
  if (statusEl) {
    if (statusEl.classList.contains('open')) {
      statusEl.style.background = hexToRgba(statusOpen, 0.2);
      statusEl.style.borderColor = hexToRgba(statusOpen, 0.5);
      const dot = statusEl.querySelector('.status-dot');
      if (dot) { dot.style.background = statusOpen; dot.style.boxShadow = `0 0 8px ${hexToRgba(statusOpen, 0.6)}`; }
    } else {
      statusEl.style.background = hexToRgba(statusClosed, 0.2);
      statusEl.style.borderColor = hexToRgba(statusClosed, 0.5);
      const dot = statusEl.querySelector('.status-dot');
      if (dot) { dot.style.background = statusClosed; dot.style.boxShadow = `0 0 8px ${hexToRgba(statusClosed, 0.6)}`; }
    }
  }
  // Mise à jour hex labels
  const hexOpen = document.getElementById('cp-hex-status-open');
  if (hexOpen) hexOpen.textContent = statusOpen.toUpperCase();
  const hexClosed = document.getElementById('cp-hex-status-closed');
  if (hexClosed) hexClosed.textContent = statusClosed.toUpperCase();

  // Le bouton palette est maintenant fixe — sa couleur suit --vert automatiquement

  // ─ NAVBAR ─
  const navBg = v('cp-nav-bg'), navLinks = v('cp-nav-links'), navBrand = v('cp-nav-brand');
  const navBorder = v('cp-nav-border'), navCross = v('cp-nav-cross'), navSub = v('cp-nav-sub');

  const navbar = document.getElementById('navbar');
  if (navbar) { navbar.style.background = navBg; navbar.style.borderBottomColor = navBorder; }
  document.querySelectorAll('.nav-links a').forEach(el => el.style.color = navLinks);
  injectRule('.nav-links a::after', `background: ${navBorder} !important`);
  const navLogoEl = document.querySelector('.nav-logo');
  if (navLogoEl) navLogoEl.style.color = navBrand;
  document.querySelectorAll('.nav-logo .sub').forEach(el => el.style.color = navSub);
  const crossIcon = document.querySelector('.nav-logo .cross-icon');
  if (crossIcon) crossIcon.style.background = navCross;
  document.querySelectorAll('.hamburger span').forEach(el => el.style.background = navBorder);

  // ─ TICKER ─
  const tickerBg = v('cp-ticker-bg'), tickerText = v('cp-ticker-text'), tickerIcon = v('cp-ticker-icon');
  const ticker = document.querySelector('.ticker-bar');
  if (ticker) ticker.style.background = tickerBg;
  document.querySelectorAll('.ticker-track span').forEach(el => el.style.color = tickerText);
  document.querySelectorAll('.ticker-track span i').forEach(el => el.style.color = tickerIcon);

  // ─ TOUTE LA PAGE — CSS Variables ─
  const pageMain   = v('cp-page-main');
  const pageDark   = v('cp-page-dark');
  const pageLight  = v('cp-page-light');
  const pageGrey   = v('cp-page-grey');
  const pageAccent = v('cp-page-accent');
  const pageText   = v('cp-page-text');
  const pageText2  = v('cp-page-text2');
  const footerTop  = v('cp-footer-top');
  const footerBot  = v('cp-footer-bot');

  const root = document.documentElement;
  const sectionBg  = v('cp-section-bg')  || '#FFFFFF';
  const sectionAlt = v('cp-section-alt') || '#F5F7FA';
  const cardBg     = v('cp-card-bg')     || '#FFFFFF';

  root.style.setProperty('--vert',        pageMain);
  root.style.setProperty('--vert-dark',   pageDark);
  root.style.setProperty('--vert-light',  pageLight);
  root.style.setProperty('--gris-clair',  pageGrey);
  root.style.setProperty('--or',          pageAccent);
  root.style.setProperty('--texte',       pageText);
  root.style.setProperty('--texte-2',     pageText2);
  root.style.setProperty('--section-bg',  sectionBg);
  root.style.setProperty('--section-alt', sectionAlt);
  root.style.setProperty('--card-bg',     cardBg);
  root.style.setProperty('--ombre',       `0 8px 32px ${hexToRgba(pageMain, 0.12)}`);

  // Body background
  document.body.style.background = sectionBg;

  // Footer gradient
  const footer = document.getElementById('footer');
  if (footer) footer.style.background = `linear-gradient(135deg, ${footerTop}, ${footerBot})`;

  // Scrollbar thumb
  injectRule('::-webkit-scrollbar-thumb', `background: ${pageMain} !important`);

  // Loader background (sync page color)
  if (loader) loader.style.background = pageDark || c1;

  updateHexLabels();
}

// ── Injecter règle CSS dynamique ─────────────────────────────
const _sheet = (() => { const s = document.createElement('style'); document.head.appendChild(s); return s.sheet; })();
const _rules = {};
function injectRule(selector, declarations) {
  if (_rules[selector] !== undefined) {
    try { _sheet.deleteRule(_rules[selector]); } catch(e) {}
  }
  const idx = _sheet.cssRules.length;
  try { _sheet.insertRule(`${selector} { ${declarations}; }`, idx); _rules[selector] = idx; } catch(e) {}
}

// ── Labels hex ───────────────────────────────────────────────
function updateHexLabels() {
  [
    ['cp-color1','cp-hex1'], ['cp-color2','cp-hex2'], ['cp-color3','cp-hex3'],
    ['cp-cross','cp-hex-cross'], ['cp-text','cp-hex-text'], ['cp-accent','cp-hex-accent'],
    ['cp-caduceus','cp-hex-caduceus'],
    ['cp-nav-bg','cp-hex-nav-bg'], ['cp-nav-links','cp-hex-nav-links'],
    ['cp-nav-brand','cp-hex-nav-brand'], ['cp-nav-border','cp-hex-nav-border'],
    ['cp-nav-cross','cp-hex-nav-cross'], ['cp-nav-sub','cp-hex-nav-sub'],
    ['cp-ticker-bg','cp-hex-ticker-bg'], ['cp-ticker-text','cp-hex-ticker-text'],
    ['cp-ticker-icon','cp-hex-ticker-icon'],
    ['cp-page-main','cp-hex-page-main'], ['cp-page-dark','cp-hex-page-dark'],
    ['cp-page-light','cp-hex-page-light'], ['cp-page-grey','cp-hex-page-grey'],
    ['cp-page-accent','cp-hex-page-accent'], ['cp-page-text','cp-hex-page-text'],
    ['cp-page-text2','cp-hex-page-text2'],
    ['cp-footer-top','cp-hex-footer-top'], ['cp-footer-bot','cp-hex-footer-bot'],
    ['cp-section-bg','cp-hex-section-bg'], ['cp-section-alt','cp-hex-section-alt'], ['cp-card-bg','cp-hex-card-bg'],
  ].forEach(([inputId, labelId]) => {
    const inp = document.getElementById(inputId);
    const lbl = document.getElementById(labelId);
    if (inp && lbl) lbl.textContent = inp.value.toUpperCase();
  });
}

// ── Sauvegarder ─────────────────────────────────────────────
function saveColors() {
  const v = id => document.getElementById(id)?.value || '';
  const state = {
    c1: v('cp-color1'), c2: v('cp-color2'), c3: v('cp-color3'),
    cross: v('cp-cross'), text: v('cp-text'), accent: v('cp-accent'),
    caduceus: v('cp-caduceus'),
    floaters: document.getElementById('cp-floaters')?.value || 70,
    floaterSize: document.getElementById('cp-floater-size')?.value || 1,
    floaterCount: document.getElementById('cp-floater-count')?.value || 16,
    speed: document.getElementById('cp-speed')?.value || '12s',
    navBg: v('cp-nav-bg'), navLinks: v('cp-nav-links'), navBrand: v('cp-nav-brand'),
    navBorder: v('cp-nav-border'), navCross: v('cp-nav-cross'), navSub: v('cp-nav-sub'),
    tickerBg: v('cp-ticker-bg'), tickerText: v('cp-ticker-text'), tickerIcon: v('cp-ticker-icon'),
    pageMain: v('cp-page-main'), pageDark: v('cp-page-dark'), pageLight: v('cp-page-light'),
    pageGrey: v('cp-page-grey'), pageAccent: v('cp-page-accent'), pageText: v('cp-page-text'),
    pageText2: v('cp-page-text2'), footerTop: v('cp-footer-top'), footerBot: v('cp-footer-bot'),
    sectionBg: v('cp-section-bg'), sectionAlt: v('cp-section-alt'), cardBg: v('cp-card-bg'),
  };
  localStorage.setItem('pharma_hero_colors', JSON.stringify(state));
  const msg = document.getElementById('cp-saved-msg');
  if (msg) { msg.style.display = 'block'; setTimeout(() => msg.style.display = 'none', 2500); }
}

// ── Réinitialiser ────────────────────────────────────────────
function resetColors() {
  localStorage.removeItem('pharma_hero_colors');
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
  const d = DEFAULTS;
  set('cp-color1', d.c1); set('cp-color2', d.c2); set('cp-color3', d.c3);
  set('cp-cross', d.cross); set('cp-text', d.text); set('cp-accent', d.accent);
  set('cp-caduceus', d.caduceus);
  set('cp-nav-bg', d.navBg); set('cp-nav-links', d.navLinks); set('cp-nav-brand', d.navBrand);
  set('cp-nav-border', d.navBorder); set('cp-nav-cross', d.navCross); set('cp-nav-sub', d.navSub);
  set('cp-ticker-bg', d.tickerBg); set('cp-ticker-text', d.tickerText); set('cp-ticker-icon', d.tickerIcon);
  set('cp-page-main', d.pageMain); set('cp-page-dark', d.pageDark); set('cp-page-light', d.pageLight);
  set('cp-page-grey', d.pageGrey); set('cp-page-accent', d.pageAccent); set('cp-page-text', d.pageText);
  set('cp-page-text2', d.pageText2); set('cp-footer-top', d.footerTop); set('cp-footer-bot', d.footerBot);
  set('cp-section-bg', '#FFFFFF'); set('cp-section-alt', '#F5F7FA'); set('cp-card-bg', '#FFFFFF');
  const f = document.getElementById('cp-floaters'); if (f) f.value = 70;
  const lf = document.getElementById('lbl-floaters'); if (lf) lf.textContent = '70%';
  const fs = document.getElementById('cp-floater-size'); if (fs) fs.value = 1;
  const lfs = document.getElementById('lbl-floater-size'); if (lfs) lfs.textContent = '1.0×';
  const fc = document.getElementById('cp-floater-count'); if (fc) fc.value = 16;
  const s = document.getElementById('cp-speed'); if (s) s.value = '12s';
  document.querySelectorAll('.theme-swatch').forEach(el => el.classList.remove('active-theme'));
  applyCustom();
}

// ── Charger depuis localStorage ───────────────────────────────
function loadSavedColors() {
  const saved = localStorage.getItem('pharma_hero_colors');
  if (!saved) return;
  try {
    const s = JSON.parse(saved);
    const set = (id, v) => { const el = document.getElementById(id); if (el && v) el.value = v; };
    set('cp-color1', s.c1); set('cp-color2', s.c2); set('cp-color3', s.c3);
    set('cp-cross', s.cross); set('cp-text', s.text); set('cp-accent', s.accent);
    set('cp-caduceus', s.caduceus);
    set('cp-nav-bg', s.navBg); set('cp-nav-links', s.navLinks); set('cp-nav-brand', s.navBrand);
    set('cp-nav-border', s.navBorder); set('cp-nav-cross', s.navCross); set('cp-nav-sub', s.navSub);
    set('cp-ticker-bg', s.tickerBg); set('cp-ticker-text', s.tickerText); set('cp-ticker-icon', s.tickerIcon);
    set('cp-page-main', s.pageMain); set('cp-page-dark', s.pageDark); set('cp-page-light', s.pageLight);
    set('cp-page-grey', s.pageGrey); set('cp-page-accent', s.pageAccent); set('cp-page-text', s.pageText);
    set('cp-page-text2', s.pageText2); set('cp-footer-top', s.footerTop); set('cp-footer-bot', s.footerBot);
    set('cp-section-bg', s.sectionBg); set('cp-section-alt', s.sectionAlt); set('cp-card-bg', s.cardBg);
    const f = document.getElementById('cp-floaters'); const lf = document.getElementById('lbl-floaters');
    if (f && s.floaters) { f.value = s.floaters; if (lf) lf.textContent = s.floaters + '%'; }
    const fs = document.getElementById('cp-floater-size'); const lfs = document.getElementById('lbl-floater-size');
    if (fs && s.floaterSize) { fs.value = s.floaterSize; if (lfs) lfs.textContent = parseFloat(s.floaterSize).toFixed(1) + '×'; }
    const fc = document.getElementById('cp-floater-count');
    if (fc && s.floaterCount) { fc.value = s.floaterCount; }
    const sp = document.getElementById('cp-speed'); if (sp && s.speed) sp.value = s.speed;
    applyCustom();
  } catch(e) {}
}

// ── Utilitaire hex → rgba ─────────────────────────────────────
function hexToRgba(hex, alpha) {
  if (!hex) return `rgba(0,0,0,${alpha})`;
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = parseInt(hex.substring(0,2), 16);
  const g = parseInt(hex.substring(2,4), 16);
  const b = parseInt(hex.substring(4,6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ── Init ─────────────────────────────────────────────────────
window.addEventListener('load', () => {
  loadSavedColors();
});

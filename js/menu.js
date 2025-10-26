// Menu móvel acessível e utilidades leves
(function () {

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
if (toggle && nav) {
const closeMenu = () => {
 nav.classList.remove('is-open');
 toggle.setAttribute('aria-expanded', 'false');
 toggle.setAttribute('aria-label', 'Abrir menu');
};
const openMenu = () => {
 nav.classList.add('is-open');
 toggle.setAttribute('aria-expanded', 'true');
 toggle.setAttribute('aria-label', 'Fechar menu');
};
toggle.addEventListener('click', () => {
 const expanded = toggle.getAttribute('aria-expanded') === 'true';
 expanded ? closeMenu() : openMenu();
});
document.addEventListener('keydown', (e) => {
 if (e.key === 'Escape') closeMenu();
});
// Fecha ao navegar via clique no link
nav.addEventListener('click', (e) => {
 const t = e.target;
 if (t && t.matches('a')) closeMenu();
});
}
// Ano atual no rodapé
const y = document.getElementById('year');
if (y) y.textContent = String(new Date().getFullYear());
// Segurança: links externos com noopener/noreferrer
try {
const origin = window.location.origin;
document.querySelectorAll('a[href^="http"]').forEach(a => {
 if (!a.href.startsWith(origin)) {
   const rel = new Set((a.rel || '').split(/\s+/).filter(Boolean));
   rel.add('noopener'); rel.add('noreferrer');
   a.rel = Array.from(rel).join(' ');
 }
});
} catch {}
})();
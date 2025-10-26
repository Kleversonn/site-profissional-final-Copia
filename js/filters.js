// Filtros por [data-filter] e cards [data-category]
(() => {

const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
const cards = Array.from(document.querySelectorAll('[data-category]'));
if (!filterButtons.length || !cards.length) return;
const setActive = (btn) => {
filterButtons.forEach(b => {
 const isActive = b === btn;
 b.classList.toggle('is-active', isActive);
 b.setAttribute('aria-pressed', String(isActive));
});
};
const applyFilter = (value) => {
cards.forEach(card => {
 const categories = (card.getAttribute('data-category') || '').toLowerCase();
 const show = value === 'all' || categories.split(/\s+/).includes(value);
 card.hidden = !show;
});
};
filterButtons.forEach(btn => {
btn.addEventListener('click', () => {
 const value = (btn.getAttribute('data-filter') || 'all').toLowerCase();
 setActive(btn);
 applyFilter(value);
});
});
})();
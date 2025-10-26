// Lazy-load para imagens com data-src/data-srcset usando IntersectionObserver
(() => {

if (!('IntersectionObserver' in window)) {
// Fallback: carrega tudo
document.querySelectorAll('img[data-src], source[data-srcset]').forEach(el => {
 if (el.tagName === 'IMG') el.src = el.getAttribute('data-src') || '';
 else el.srcset = el.getAttribute('data-srcset') || '';
});
return;
}
const onIntersect = (entries, observer) => {
entries.forEach(entry => {
 if (!entry.isIntersecting) return;
 const el = entry.target;
 if (el.tagName === 'IMG') {
   const img = el;
   const src = img.getAttribute('data-src');
   const srcset = img.getAttribute('data-srcset');
   if (src) img.src = src;
   if (srcset) img.srcset = srcset;
   img.removeAttribute('data-src'); img.removeAttribute('data-srcset');
 } else if (el.tagName === 'SOURCE') {
   const srcset = el.getAttribute('data-srcset');
   if (srcset) el.srcset = srcset;
   el.removeAttribute('data-srcset');
 }
 observer.unobserve(el);
});
};
const io = new IntersectionObserver(onIntersect, { rootMargin: '200px 0px' });
document.querySelectorAll('img[data-src], source[data-srcset]').forEach(el => io.observe(el));
})();
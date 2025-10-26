// Embed leve do YouTube com poster e carregamento on-demand
(() => {

const LITE_SELECTOR = '.yt-lite[data-id]';
const YT_BASE = 'https://www.youtube-nocookie.com';
const posters = (id) => [
'https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp',
'https://i.ytimg.com/vi/${id}/maxresdefault.jpg',
'https://i.ytimg.com/vi/${id}/hqdefault.jpg'
];
const initLite = (el) => {
const id = el.getAttribute('data-id');
if (!id) return;
const [p1, p2, p3] = posters(id);
// Define poster no ::before via style
el.style.setProperty('--yt-poster', url('${p1}'));
// Fallbacks progressivos
const testImg = new Image();
testImg.decoding = 'async';
testImg.onload = () => el.style.setProperty('--yt-poster', url('${testImg.src}'));
testImg.onerror = () => { /* ignora */ };
testImg.src = p2;
const style = document.createElement('style');
style.textContent = `.yt-lite::before { background-image: var(--yt-poster, url('${p3}')); }`;
document.head.appendChild(style);
const activate = () => {
 if (el.classList.contains('yt-activated')) return;
 el.classList.add('yt-activated');
 const iframe = document.createElement('iframe');
 iframe.setAttribute('title', 'YouTube video player');
 iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share');
 iframe.setAttribute('allowfullscreen', '');
 iframe.setAttribute('loading', 'eager');
 iframe.width = '560'; iframe.height = '315';
 iframe.src = `${YT_BASE}/embed/${id}?autoplay=1&rel=0`;
 el.replaceWith(iframe);
 iframe.focus();
};
el.addEventListener('click', activate);
el.addEventListener('keydown', (e) => {
 if (e.key === 'Enter' || e.key === ' ') {
   e.preventDefault(); activate();
 }
});
};
document.querySelectorAll(LITE_SELECTOR).forEach(initLite);
})();
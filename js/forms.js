// Netlify Forms: intercepta envio e exibe mensagem de sucesso
(() => {

const form = document.querySelector('form[data-netlify][name="contato"]');
if (!form) return;
const successEl = form.querySelector('.form-success');
const errorEl = form.querySelector('.form-error');
const honeypot = form.querySelector('input[name="bot-field"]');
const encode = (dataObj) =>
Object.keys(dataObj)
 .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(dataObj[k]))
 .join('&');
form.addEventListener('submit', async (e) => {
e.preventDefault();
if (honeypot && honeypot.value) return; // bot
const data = new FormData(form);
try {
 const resp = await fetch('/', {
   method: 'POST',
   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
   body: encode(Object.fromEntries(data))
 });
 if (resp.ok) {
   if (successEl) successEl.hidden = false;
   if (errorEl) errorEl.hidden = true;
   form.reset();
 } else {
   throw new Error('Falha no envio');
 }
} catch (err) {
 if (successEl) successEl.hidden = true;
 if (errorEl) errorEl.hidden = false;
}
});
})();
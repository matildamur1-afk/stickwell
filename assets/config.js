// Настройки лендинга. Пока поле пустое, соответствующая кнопка скрыта или показывает «скоро».
// Заполните после публикации — больше ничего на страницах менять не нужно.
const STICKWELL = {
  store: '',   // ссылка на расширение в Chrome Web Store, например https://chromewebstore.google.com/detail/stickwell/<id>
  email: 'stickwell.app@gmail.com',   // почта проекта
  issues: 'https://github.com/stickwell-app/stickwell-app.github.io/issues'   // GitHub Issues
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-store]').forEach(a => {
    if (STICKWELL.store) { a.href = STICKWELL.store; a.target = '_blank'; a.rel = 'noopener'; }
    else { a.textContent = a.dataset.soon; a.classList.add('soon'); a.removeAttribute('href'); a.setAttribute('aria-disabled', 'true'); }
  });
  // Раздел «Контакты»: строка показывается, только если соответствующее поле заполнено
  const row = (name, on) => document.querySelectorAll(`[data-row="${name}"]`).forEach(r => { r.hidden = !on; });
  row('mail', !!STICKWELL.email);
  row('issues', !!STICKWELL.issues);
  row('store', !!STICKWELL.store);
  document.querySelectorAll('[data-mail-text]').forEach(s => { s.textContent = STICKWELL.email; });
  document.querySelectorAll('[data-mail]').forEach(a => { if (STICKWELL.email) a.href = 'mailto:' + STICKWELL.email; });
  document.querySelectorAll('[data-issues]').forEach(a => { if (STICKWELL.issues) { a.href = STICKWELL.issues; a.target = '_blank'; a.rel = 'noopener'; } });
  document.querySelectorAll('[data-store-link]').forEach(a => { if (STICKWELL.store) { a.href = STICKWELL.store; a.target = '_blank'; a.rel = 'noopener'; } });
  document.querySelectorAll('[data-nocontact]').forEach(s => { s.hidden = !!(STICKWELL.email || STICKWELL.issues); });

  // «Скопировать» — кладёт адрес в буфер обмена; если браузер не даёт, выделяет адрес, чтобы скопировать вручную
  document.querySelectorAll('[data-copy]').forEach(b => {
    const label = b.textContent;
    b.addEventListener('click', async () => {
      const addr = b.parentElement.querySelector('[data-mail-text]');
      try {
        await navigator.clipboard.writeText(STICKWELL.email);
        b.textContent = b.dataset.copied;
        setTimeout(() => { b.textContent = label; }, 2000);
      } catch (e) {
        const r = document.createRange(); r.selectNodeContents(addr);
        const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
      }
    });
  });
});

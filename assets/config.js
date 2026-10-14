// Настройки лендинга. Пока поле пустое, соответствующая кнопка скрыта или показывает «скоро».
// Заполните после публикации — больше ничего на страницах менять не нужно.
const STICKWELL = {
  store: '',   // ссылка на расширение в Chrome Web Store, например https://chromewebstore.google.com/detail/stickwell/<id>
  email: '',   // почта проекта, например hello@example.com
  issues: 'https://github.com/matildamur1-afk/stickwell/issues'   // GitHub Issues
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-store]').forEach(a => {
    if (STICKWELL.store) { a.href = STICKWELL.store; a.target = '_blank'; a.rel = 'noopener'; }
    else { a.textContent = a.dataset.soon; a.classList.add('soon'); a.removeAttribute('href'); a.setAttribute('aria-disabled', 'true'); }
  });
  let any = false;
  document.querySelectorAll('[data-mail]').forEach(a => { if (STICKWELL.email) { a.href = 'mailto:' + STICKWELL.email; a.hidden = false; any = true; } });
  document.querySelectorAll('[data-issues]').forEach(a => { if (STICKWELL.issues) { a.href = STICKWELL.issues; a.target = '_blank'; a.rel = 'noopener'; a.hidden = false; any = true; } });
  document.querySelectorAll('[data-nocontact]').forEach(s => { s.hidden = any; });
});

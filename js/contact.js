/* AgroHarvest — Contact page interactions */

// Contact form
function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      form.querySelectorAll('input, textarea').forEach(el => {
        if (!el.value.trim() && el.hasAttribute('required')) {
          el.style.borderColor = 'var(--sun-amber)';
          setTimeout(() => el.style.borderColor = '', 2000);
        }
      });
      return;
    }
    success.classList.add('show');
    form.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  });
}

// Newsletter
function initNewsletter() {
  const form = document.getElementById('nlForm');
  const success = document.getElementById('nlSuccess');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    success.classList.add('show');
    form.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initNewsletter();
});

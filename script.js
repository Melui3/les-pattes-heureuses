const header = document.querySelector('.site-header');
const nav = document.querySelector('#navigation');
const toggle = document.querySelector('.menu-toggle');

function closeMenu() {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Ouvrir le menu');
}
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); }
});
document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
window.matchMedia('(min-width: 851px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 10);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if ('IntersectionObserver' in window) {
  const links = [...nav.querySelectorAll('a')];
  const activeObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => link.removeAttribute('aria-current'));
      links.find(link => link.hash === '#' + entry.target.id)?.setAttribute('aria-current', 'location');
    }
  }), { rootMargin: '-15% 0px -50% 0px', threshold: 0 });
  links.forEach(link => activeObserver.observe(document.querySelector(link.hash)));
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll('.about-image, .about-copy, .section-heading, .care-card, .team-bios article, .visit-steps li, .price-panel').forEach(element => {
      element.classList.add('reveal'); observer.observe(element);
    });
  }
}

const gallery = document.querySelector('#gallery-dialog');
document.querySelectorAll('[data-gallery]').forEach(button => button.addEventListener('click', () => {
  gallery.querySelector('img').src = button.dataset.gallery;
  gallery.querySelector('img').alt = button.querySelector('img').alt;
  gallery.querySelector('p').textContent = button.dataset.caption;
  gallery.showModal();
}));
gallery.querySelector('button').addEventListener('click', () => gallery.close());
gallery.addEventListener('click', event => {
  if (event.target === gallery) {
    const box = gallery.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) gallery.close();
  }
});

document.querySelectorAll('[data-reason]').forEach(link => link.addEventListener('click', () => {
  document.querySelector('#appointment-reason').value = link.dataset.reason;
  document.querySelector('#appointment-status').hidden = true;
}));
const dateInput = document.querySelector('#appointment-date');
const form = document.querySelector('#appointment-form');
const status = document.querySelector('#appointment-status');
function localToday() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}
function validateFields() {
  dateInput.min = localToday();
  dateInput.setCustomValidity('');
  const day = dateInput.value ? new Date(dateInput.value + 'T12:00:00').getDay() : null;
  if (day === 0) dateInput.setCustomValidity('Le cabinet est fermé le dimanche. Choisissez un autre jour.');
  if (day === 6 && form.elements.time.value === 'Après-midi') dateInput.setCustomValidity('Le samedi, le cabinet vous accueille uniquement le matin.');
  const phone = form.elements.phone;
  phone.setCustomValidity(phone.value && !/^[+\d ()\.\-]{8,22}$/.test(phone.value) ? 'Indiquez un numéro de téléphone valide.' : '');
}
validateFields();
form.addEventListener('input', () => { status.hidden = true; validateFields(); });
form.addEventListener('change', validateFields);
form.addEventListener('focusin', validateFields);
form.addEventListener('submit', event => {
  event.preventDefault(); validateFields(); if (!form.reportValidity()) return;
  const data = new FormData(form);
  const date = new Date(data.get('date') + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  status.textContent = `Votre récapitulatif est prêt — aucune demande envoyée.\n\n${data.get('name')} · ${data.get('phone')}\n${data.get('animal')} · ${data.get('reason')}\n${date} · ${data.get('time')}${data.get('message') ? '\n' + data.get('message') : ''}\n\nDémonstration : aucun créneau n’est réservé. Vous pouvez modifier vos informations ci-dessus.`;
  status.hidden = false;
  status.focus();
});

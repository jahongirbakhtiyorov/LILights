const burger = document.querySelector('.js-burger');
const mobileMenu = document.querySelector('.js-mobile-menu');
const mobileClose = document.querySelector('.js-mobile-close');

burger.addEventListener('click', function () {
  mobileMenu.classList.add('is-open');
  document.body.style.overflow = 'hidden';
});

mobileClose.addEventListener('click', function () {
  mobileMenu.classList.remove('is-open');
  document.body.style.overflow = '';
});

mobileMenu.addEventListener('click', function (e) {
  if (e.target === mobileMenu) {
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  }
});

document.addEventListener('DOMContentLoaded', function () {

  const items = document.querySelectorAll('.js-uslug-item');

  items.forEach(function (item) {
    const btn = item.querySelector('.js-uslug-btn');

    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('is-open');

      items.forEach(function (el) {
        el.classList.remove('is-open');
        el.querySelector('.js-uslug-btn').textContent = '+';
      });

      if (!isOpen) {
        item.classList.add('is-open');
        btn.textContent = '✕';
      }
    });
  });

});
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('js-contact-form');
  const inpName = document.querySelector('.js-inp-name');
  const inpEmail = document.querySelector('.js-inp-email');
  const inpMessage = document.querySelector('.js-inp-message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = inpName.value.trim();
    const email = inpEmail.value.trim();
    const message = inpMessage.value.trim();

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    form.reset();
  });
});
document.addEventListener('DOMContentLoaded', function () {

  const addBtns = document.querySelectorAll('.js-novinki-add');

  addBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const card = btn.closest('.js-novinki-item');
      const name = card.querySelector('.novinki__name').textContent.trim();
      const price = card.querySelector('.novinki__price').textContent.trim();
      console.log('[CART] Added:', { name, price });
    });
  });

  const detailBtns = document.querySelectorAll('.js-novinki-btn');

  detailBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const card = btn.closest('.js-novinki-item');
      const name = card.querySelector('.novinki__name').textContent.trim();
      console.log('[DETAIL] Clicked:', name);
    });
  });

  const catalogBtn = document.querySelector('.js-novinki-catalog');

  if (catalogBtn) {
    catalogBtn.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('[CATALOG] Go to catalog clicked');
    });
  }

});
const isMobile = () => window.innerWidth <= 768;

const counters = document.querySelectorAll('.podborka__item');
counters.forEach(item => {
  const minus = item.querySelector('.js-minus');
  const plus = item.querySelector('.js-plus');
  const val = item.querySelector('.js-counter-val');
  if (!minus || !plus || !val) return;

  minus.addEventListener('click', () => {
    let current = parseInt(val.textContent);
    if (current > 1) {
      val.textContent = current - 1;
    }
  });

  plus.addEventListener('click', () => {
    let current = parseInt(val.textContent);
    val.textContent = current + 1;
  });
});

document.querySelectorAll('.js-delete').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.podborka__item').remove();
  });
});

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('modal-overlay--active');
}

function closeAllModals() {
  document.querySelectorAll('.js-modal-overlay').forEach(m => m.classList.remove('modal-overlay--active'));
}

document.querySelector('.js-send-email')?.addEventListener('click', () => openModal('modal-email'));
document.querySelector('.js-send-calc')?.addEventListener('click', () => openModal('modal-calc'));

document.querySelectorAll('.js-modal-close').forEach(btn => {
  btn.addEventListener('click', closeAllModals);
});

document.querySelectorAll('.js-modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeAllModals();
  });
});

document.querySelector('.js-modal-submit-email')?.addEventListener('click', () => {
  const email = document.querySelector('.js-inp-email')?.value;
  console.log('Email podborka:', email);
  closeAllModals();
  openModal('modal-thanks');
});

document.querySelector('.js-modal-submit-calc')?.addEventListener('click', () => {
  const name = document.querySelector('.js-inp-name')?.value;
  const email = document.querySelector('.js-inp-email-calc')?.value;
  const phone = document.querySelector('.js-inp-phone')?.value;
  console.log('Calc form:', { name, email, phone });
  closeAllModals();
  openModal('modal-thanks');
});
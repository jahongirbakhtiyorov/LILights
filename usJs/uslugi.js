const isMobile = () => window.innerWidth <= 768;

const srvTabs = document.querySelectorAll('.js-srv-tab');
const srvContent = document.querySelector('.js-srv-content');

function srvActivateDesktop(tab) {
  srvTabs.forEach(t => t.classList.remove('services__tabs-item--active'));
  tab.classList.add('services__tabs-item--active');

  const panel = tab.querySelector('.js-srv-panel');
  srvContent.innerHTML = '';

  if (panel) {
    const clone = panel.cloneNode(true);
    clone.classList.add('services__panel--active');
    srvContent.appendChild(clone);
  }
}

function srvInitDesktop() {
  const activeTab = document.querySelector('.services__tabs-item--active');
  if (activeTab) srvActivateDesktop(activeTab);
}

function srvInitMobile() {
  srvContent.innerHTML = '';
  document.querySelectorAll('.js-srv-panel').forEach(p => p.classList.remove('services__panel--active'));
  const activePanel = document.querySelector('.services__tabs-item--active .js-srv-panel');
  if (activePanel) activePanel.classList.add('services__panel--active');
}

srvTabs.forEach(tab => {
  const btn = tab.querySelector('.js-srv-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (!isMobile()) {
      srvActivateDesktop(tab);
    } else {
      const panel = tab.querySelector('.js-srv-panel');
      const isActive = tab.classList.contains('services__tabs-item--active');

      srvTabs.forEach(t => {
        t.classList.remove('services__tabs-item--active');
        const p = t.querySelector('.js-srv-panel');
        if (p) p.classList.remove('services__panel--active');
      });

      if (!isActive) {
        tab.classList.add('services__tabs-item--active');
        if (panel) panel.classList.add('services__panel--active');
      }
    }
  });
});

window.addEventListener('resize', () => {
  if (!isMobile()) {
    srvInitDesktop();
  } else {
    srvInitMobile();
  }
});

if (!isMobile()) {
  srvInitDesktop();
} else {
  srvInitMobile();
}
const nashiItems = document.querySelectorAll('.js-nashi-item');
const nashiImgs = document.querySelectorAll('.js-nashi-img');

function createMobileImgs() {
  nashiItems.forEach(item => {
    if (item.querySelector('.nashi__mobile-img')) return;

    const key = item.dataset.nashi;
    const desktopImg = document.querySelector(`.js-nashi-img[data-nashi="${key}"]`);
    if (!desktopImg) return;

    const mobileImg = document.createElement('img');
    mobileImg.src = desktopImg.src;
    mobileImg.alt = desktopImg.alt;
    mobileImg.className = 'nashi__mobile-img';

    if (item.classList.contains('nashi__item--active')) {
      mobileImg.classList.add('nashi__mobile-img--active');
    }

    item.appendChild(mobileImg);
  });
}

function activate(key) {
  nashiItems.forEach(item => {
    item.classList.remove('nashi__item--active');
    const mImg = item.querySelector('.nashi__mobile-img');
    if (mImg) mImg.classList.remove('nashi__mobile-img--active');
  });

  nashiImgs.forEach(img => img.classList.remove('nashi__img--active'));

  const activeItem = document.querySelector(`.js-nashi-item[data-nashi="${key}"]`);
  const activeImg = document.querySelector(`.js-nashi-img[data-nashi="${key}"]`);

  if (activeItem) {
    activeItem.classList.add('nashi__item--active');
    const mImg = activeItem.querySelector('.nashi__mobile-img');
    if (mImg) mImg.classList.add('nashi__mobile-img--active');
  }

  if (activeImg) activeImg.classList.add('nashi__img--active');
}

nashiItems.forEach(item => {
  const btn = item.querySelector('.js-nashi-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const key = item.dataset.nashi;

    if (isMobile()) {
      const isActive = item.classList.contains('nashi__item--active');

      nashiItems.forEach(i => {
        i.classList.remove('nashi__item--active');
        const mImg = i.querySelector('.nashi__mobile-img');
        if (mImg) mImg.classList.remove('nashi__mobile-img--active');
      });

      if (!isActive) {
        item.classList.add('nashi__item--active');
        const mImg = item.querySelector('.nashi__mobile-img');
        if (mImg) mImg.classList.add('nashi__mobile-img--active');
      }
    } else {
      activate(key);
    }
  });
});

window.addEventListener('resize', () => {
  if (!isMobile()) {
    initDesktop();
  } else {
    initMobile();
    createMobileImgs();
  }
});

if (!isMobile()) {
  initDesktop();
} else {
  initMobile();
  createMobileImgs();
}
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

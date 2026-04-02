const isMobile = () => window.innerWidth <= 768;

const tabs = document.querySelectorAll('.js-tab');
const content = document.querySelector('.js-content');

function activateDesktop(tab) {
  tabs.forEach(t => t.classList.remove('about__tabs-item--active'));
  tab.classList.add('about__tabs-item--active');

  const panel = tab.querySelector('.js-panel');
  content.innerHTML = '';

  if (panel) {
    const clone = panel.cloneNode(true);
    clone.classList.add('about__panel--active');
    content.appendChild(clone);
  }
}

function initDesktop() {
  const activeTab = document.querySelector('.about__tabs-item--active');
  if (activeTab) activateDesktop(activeTab);
}

function initMobile() {
  content.innerHTML = '';
  document.querySelectorAll('.js-panel').forEach(p => p.classList.remove('about__panel--active'));
  const activePanel = document.querySelector('.about__tabs-item--active .js-panel');
  if (activePanel) activePanel.classList.add('about__panel--active');
}

tabs.forEach(tab => {
  const btn = tab.querySelector('.js-tab-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (!isMobile()) {
      activateDesktop(tab);
    } else {
      const panel = tab.querySelector('.js-panel');
      const isActive = tab.classList.contains('about__tabs-item--active');

      tabs.forEach(t => {
        t.classList.remove('about__tabs-item--active');
        const p = t.querySelector('.js-panel');
        if (p) p.classList.remove('about__panel--active');
      });

      if (!isActive) {
        tab.classList.add('about__tabs-item--active');
        if (panel) panel.classList.add('about__panel--active');
      }
    }
  });
});

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
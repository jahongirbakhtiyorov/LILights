

const isMobile = () => window.innerWidth <= 768;

const thumbItems = document.querySelectorAll('.js-thumb-item');
const thumbBtns = document.querySelectorAll('.js-thumb-btn');
const mainImg = document.querySelector('.js-main-img');
const arrUp = document.querySelector('.js-arr-up');
const arrDown = document.querySelector('.js-arr-down');
let thumbOffset = 0;
const thumbVisible = 5;

thumbBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    thumbItems.forEach(t => t.classList.remove('product__thumb-item--active'));
    thumbItems[i].classList.add('product__thumb-item--active');
    const img = btn.querySelector('.product__thumb-img');
    if (img && mainImg) mainImg.src = img.src;
  });
});

if (arrUp) {
  arrUp.addEventListener('click', () => {
    if (thumbOffset > 0) {
      thumbOffset--;
      updateThumbs();
    }
  });
}

if (arrDown) {
  arrDown.addEventListener('click', () => {
    if (thumbOffset < thumbItems.length - thumbVisible) {
      thumbOffset++;
      updateThumbs();
    }
  });
}

function updateThumbs() {
  thumbItems.forEach((item, i) => {
    item.style.display = (i >= thumbOffset && i < thumbOffset + thumbVisible) ? 'flex' : 'none';
  });
}

updateThumbs();

const optBtns = document.querySelectorAll('.js-opt-btn');

optBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.closest('.product__option-btns');
    if (!group) return;
    group.querySelectorAll('.js-opt-btn').forEach(b => b.classList.remove('product__opt-btn--active'));
    btn.classList.add('product__opt-btn--active');
  });
});

const prodTabs = document.querySelectorAll('.js-prod-tab');
const prodPanels = document.querySelectorAll('.js-prod-panel');

function prodActivateDesktop(tab) {
  prodTabs.forEach(t => t.classList.remove('product__tabs-item--active'));
  tab.classList.add('product__tabs-item--active');
  const key = tab.dataset.prod;
  prodPanels.forEach(p => p.classList.remove('product__panel--active'));
  const active = document.querySelector(`.js-prod-panel[data-prod="${key}"]`);
  if (active) active.classList.add('product__panel--active');
}

prodTabs.forEach(tab => {
  const btn = tab.querySelector('.js-prod-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (!isMobile()) {
      prodActivateDesktop(tab);
    } else {
      const key = tab.dataset.prod;
      const panel = document.querySelector(`.js-prod-panel[data-prod="${key}"]`);
      const isActive = tab.classList.contains('product__tabs-item--active');

      prodTabs.forEach(t => {
        t.classList.remove('product__tabs-item--active');
        const p = document.querySelector(`.js-prod-panel[data-prod="${t.dataset.prod}"]`);
        if (p) p.classList.remove('product__panel--active');
      });

      if (!isActive) {
        tab.classList.add('product__tabs-item--active');
        if (panel) panel.classList.add('product__panel--active');
      }
    }
  });
});

function initProdDesktop() {
  const activeTab = document.querySelector('.product__tabs-item--active');
  if (activeTab) prodActivateDesktop(activeTab);
}

function initProdMobile() {
  const activePanel = document.querySelector('.product__tabs-item--active .js-prod-panel');
  prodPanels.forEach(p => p.classList.remove('product__panel--active'));
  if (activePanel) activePanel.classList.add('product__panel--active');
}

window.addEventListener('resize', () => {
  if (!isMobile()) {
    document.querySelector('.product__tabs-content').style.display = '';
    initProdDesktop();
  } else {
    document.querySelector('.product__tabs-content').style.display = 'none';
  }
});

if (!isMobile()) {
  initProdDesktop();
}
document.querySelectorAll('.js-add-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    this.classList.toggle('modifications__add-btn--active');
  });
});
 
document.querySelectorAll('.js-mobile-trigger').forEach(function(trigger) {
  trigger.addEventListener('click', function() {
    var item = this.closest('.js-mobile-item');
    var isOpen = item.classList.contains('is-open');
 
    document.querySelectorAll('.js-mobile-item').forEach(function(el) {
      el.classList.remove('is-open');
      el.querySelector('.modifications__mobile-arrow').innerHTML = '&#8250;';
    });
 
    if (!isOpen) {
      item.classList.add('is-open');
      item.querySelector('.modifications__mobile-arrow').innerHTML = '&#8964;';
    }
  });
});
 
document.querySelector('.js-show-more') && document.querySelector('.js-show-more').addEventListener('click', function(e) {
  e.preventDefault();
  var list = document.querySelector('.modifications__mobile-list');
  var newItems = [
    { name: 'LINE A 50-22W-840-BK', power: '22', color: 'Черный', size: '20x15x10', flux: '1800', angle: '130.00', eff: '130.00', temp: '4000', cri: '80+', ctrl: 'no', price: '3900' },
    { name: 'LINE A 50-30W-930-GR', power: '30', color: 'Серый', size: '25x18x12', flux: '2100', angle: '140.00', eff: '145.00', temp: '3000', cri: '90+', ctrl: 'yes', price: '4500' }
  ];
  newItems.forEach(function(d) {
    var li = document.createElement('li');
    li.className = 'modifications__mobile-item list__item js-mobile-item';
    li.innerHTML =
      '<button class="modifications__mobile-trigger btn js-mobile-trigger" type="button">' +
        '<span class="modifications__mobile-name">' + d.name + '</span>' +
        '<span class="modifications__mobile-arrow">&#8250;</span>' +
      '</button>' +
      '<div class="modifications__mobile-body">' +
        '<ul class="modifications__mobile-props list">' +
          '<li class="modifications__mobile-prop list__item"><span class="modifications__mobile-prop-label">Мощность</span><span class="modifications__mobile-prop-value">' + d.power + '</span></li>' +
          '<li class="modifications__mobile-prop list__item"><span class="modifications__mobile-prop-label">Цвет корпуса</span><span class="modifications__mobile-prop-value">' + d.color + '</span></li>' +
          '<li class="modifications__mobile-prop list__item"><span class="modifications__mobile-prop-label">Габариты [ВхДхШ]</span><span class="modifications__mobile-prop-value">' + d.size + '</span></li>' +
          '<li class="modifications__mobile-prop list__item"><span class="modifications__mobile-prop-label">Световой поток LED [лкм]</span><span class="modifications__mobile-prop-value">' + d.flux + '</span></li>' +
          '<li class="modifications__mobile-prop list__item"><span class="modifications__mobile-prop-label">Угол рассеивания</span><span class="modifications__mobile-prop-value">' + d.angle + '</span></li>' +
          '<li class="modifications__mobile-prop list__item"><span class="modifications__mobile-prop-label">Эффективность LW/W</span><span class="modifications__mobile-prop-value">' + d.eff + '</span></li>' +
          '<li class="modifications__mobile-prop list__item"><span class="modifications__mobile-prop-label">Цветовая температура</span><span class="modifications__mobile-prop-value">' + d.temp + '</span></li>' +
          '<li class="modifications__mobile-prop list__item"><span class="modifications__mobile-prop-label">CRI/Ra</span><span class="modifications__mobile-prop-value">' + d.cri + '</span></li>' +
          '<li class="modifications__mobile-prop list__item"><span class="modifications__mobile-prop-label">Управление светом</span><span class="modifications__mobile-prop-value">' + d.ctrl + '</span></li>' +
        '</ul>' +
        '<div class="modifications__mobile-footer">' +
          '<span class="modifications__mobile-price">Цена&nbsp;&nbsp;' + d.price + '</span>' +
          '<div class="modifications__mobile-add">' +
            '<span class="modifications__mobile-add-label">Добавить в подборку</span>' +
            '<button class="modifications__add-btn btn js-add-btn" type="button" aria-label="Добавить в подборку"><span class="modifications__add-plus">+</span></button>' +
          '</div>' +
        '</div>' +
      '</div>';
    list.appendChild(li);
 
    li.querySelector('.js-mobile-trigger').addEventListener('click', function() {
      var item = this.closest('.js-mobile-item');
      var isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.js-mobile-item').forEach(function(el) {
        el.classList.remove('is-open');
        el.querySelector('.modifications__mobile-arrow').innerHTML = '&#8250;';
      });
      if (!isOpen) {
        item.classList.add('is-open');
        item.querySelector('.modifications__mobile-arrow').innerHTML = '&#8964;';
      }
    });
 
    li.querySelector('.js-add-btn').addEventListener('click', function() {
      this.classList.toggle('modifications__add-btn--active');
    });
  });
 
  this.style.display = 'none';
});const burger = document.querySelector('.js-burger');
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

const dstTabs = document.querySelectorAll('.js-dst-tab');
const dstPanels = document.querySelectorAll('.js-dst-panel');

function dstActivateDesktop(tab) {
  dstTabs.forEach(t => t.classList.remove('dostavka__tabs-item--active'));
  tab.classList.add('dostavka__tabs-item--active');
  const key = tab.dataset.dst;
  dstPanels.forEach(p => p.classList.remove('dostavka__panel--active'));
  const active = document.querySelector(`.js-dst-panel[data-dst="${key}"]`);
  if (active) active.classList.add('dostavka__panel--active');
}

dstTabs.forEach(tab => {
  const btn = tab.querySelector('.js-dst-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (!isMobile()) {
      dstActivateDesktop(tab);
    } else {
      const key = tab.dataset.dst;
      const panel = document.querySelector(`.js-dst-panel[data-dst="${key}"]`);
      const isActive = tab.classList.contains('dostavka__tabs-item--active');

      dstTabs.forEach(t => {
        t.classList.remove('dostavka__tabs-item--active');
        const p = document.querySelector(`.js-dst-panel[data-dst="${t.dataset.dst}"]`);
        if (p) p.classList.remove('dostavka__panel--active');
      });

      if (!isActive) {
        tab.classList.add('dostavka__tabs-item--active');
        if (panel) panel.classList.add('dostavka__panel--active');
      }
    }
  });
});

document.querySelectorAll('.js-dst-submit').forEach(btn => {
  btn.addEventListener('click', () => {
    const form = btn.closest('.dostavka__form');
    const name = form?.querySelector('.js-inp-dst-name')?.value;
    const phone = form?.querySelector('.js-inp-dst-phone')?.value;
    console.log('Dostavka form:', { name, phone });
    openModal('modal-dst-thanks');
  });
});

window.addEventListener('resize', () => {
  if (!isMobile()) {
    const activeTab = document.querySelector('.dostavka__tabs-item--active');
    if (activeTab) dstActivateDesktop(activeTab);
  }
});

if (!isMobile()) {
  const activeTab = document.querySelector('.dostavka__tabs-item--active');
  if (activeTab) dstActivateDesktop(activeTab);
}
/* AgroHarvest — Member dashboard interactions */

// Harvest box customization
function initBoxCustomization() {
  const items = document.querySelectorAll('.pick-item');
  if (!items.length) return;
  items.forEach(item => {
    const cb = item.querySelector('input[type="checkbox"]');
    cb.addEventListener('change', () => {
      item.classList.toggle('checked', cb.checked);
      updateBoxSummary();
    });
  });
}

function updateBoxSummary() {
  const checked = document.querySelectorAll('.pick-item.checked').length;
  const summary = document.querySelector('.bs-left');
  if (summary) summary.innerHTML = `<span>${checked}</span> items selected · <span>$${(checked * 5).toFixed(2)}</span> this week`;
}

document.addEventListener('DOMContentLoaded', () => {
  initBoxCustomization();
});

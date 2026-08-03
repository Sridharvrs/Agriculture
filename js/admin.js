/* AgroHarvest — Admin dashboard interactions */

// User filter tabs
function initUserFilters() {
  const btns = document.querySelectorAll('.uf-btn');
  const rows = document.querySelectorAll('#userTableBody tr');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.ufilter;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      rows.forEach(row => {
        const role = row.dataset.urole;
        row.style.display = (filter === 'all' || role === filter) ? '' : 'none';
      });
    });
  });
}

// Animate admin bar chart
function initAdminChart() {
  const chart = document.querySelector('.admin-chart');
  if (!chart) return;
  const bars = chart.querySelectorAll('.ac-bar');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        bars.forEach((bar, i) => {
          const h = bar.style.getPropertyValue('--h');
          bar.style.setProperty('--h', '0%');
          setTimeout(() => bar.style.setProperty('--h', h), i * 100);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  obs.observe(chart);
}

document.addEventListener('DOMContentLoaded', () => {
  initUserFilters();
  initAdminChart();
});

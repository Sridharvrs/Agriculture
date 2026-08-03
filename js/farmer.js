/* AgroHarvest — Farmer dashboard interactions */

// Animate bar chart on view
function initBarChart() {
  const chart = document.querySelector('.bar-chart');
  if (!chart) return;
  const bars = chart.querySelectorAll('.bc-bar');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        bars.forEach((bar, i) => {
          const h = bar.style.height;
          bar.style.height = '0';
          setTimeout(() => { bar.style.height = h; }, i * 100);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  obs.observe(chart);
}

document.addEventListener('DOMContentLoaded', initBarChart);

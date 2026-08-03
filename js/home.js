/* AgroHarvest — Home page interactions */

// Animated counter for stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-big strong, .hero-stats .stat strong');
  counters.forEach(el => {
    const text = el.textContent;
    const num = parseInt(text.replace(/[^0-9]/g, ''), 10);
    if (isNaN(num)) return;
    const suffix = text.replace(/[0-9]/g, '');
    let current = 0;
    const step = Math.max(1, Math.ceil(num / 50));
    const tick = () => {
      current += step;
      if (current >= num) {
        el.textContent = num + suffix;
      } else {
        el.textContent = current + suffix;
        requestAnimationFrame(tick);
      }
    };
    tick();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Trigger counters once hero stats are visible
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    animateCounters();
  }
  const statsBanner = document.querySelector('.stats-banner');
  if (statsBanner) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCounters(); obs.disconnect(); }
      });
    }, { threshold: 0.3 });
    obs.observe(statsBanner);
  }
});

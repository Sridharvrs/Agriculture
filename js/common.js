/* ============================================================
   Stackly — Shared JavaScript (Navbar, Drawer, Footer, Reveal)
   ============================================================ */

// Active page detection
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// Mobile drawer
function initDrawer() {
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close');
  if (!hamburger || !drawer) return;

  const open = () => {
    drawer.classList.add('open');
    overlay.classList.add('show');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}

// Reveal on scroll
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => obs.observe(r));
}

// Inject footer dynamically (shared across pages)
function injectFooter() {
  const slots = document.querySelectorAll('[data-footer]');
  if (!slots.length) return;
  const year = new Date().getFullYear();
  slots.forEach(slot => {
    slot.innerHTML = `
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="nav-brand">
    <img src="/images/logoimg.webp" alt="Stackly Logo" class="nav-logo">
</a>
          <p>Cultivating tomorrow with sustainable, tech-driven agriculture. From soil to harvest, we grow goodness.</p>
          <div class="footer-social">
            <a href="error.html"><i class="fa-brands fa-facebook-f"></i></a>

            <a href="error.html"><i class="fa-brands fa-instagram"></i></a>

            <a href="error.html"><i class="fa-brands fa-x-twitter"></i></a>

            <a href="error.html"><i class="fa-brands fa-linkedin-in"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <a href="index.html" data-nav>Home</a>
          <a href="about.html" data-nav>About</a>
          <a href="services.html" data-nav>Services</a>
          <a href="gallery.html" data-nav>Gallery</a>
          <a href="contact.html" data-nav>Contact</a>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <a href="error.html">Crop Farming</a>
          <a href="error.html">Livestock</a>
          <a href="error.html">Greenhouse</a>
          <a href="error.html">Agri-Tech</a>
          <a href="error.html">Organic</a>
        </div>
        <div class="footer-col">
          <h4>Get in Touch</h4>
          <a href="contact.html">123 Greenfield Road</a>
          <a href="contact.html">info@Stackly.com</a>
          <a href="contact.html">+91 9865452312</a>
          <form class="footer-news-form">

        <input
            type="email"
            placeholder="Enter your email"
            required
        >

        <button type="submit">
            Subscribe
        </button>

    </form>
        </div>
      </div>
      <div class="footer-bottom">
        © ${year} Stackly. Growing a greener future, one field at a time.
      </div>
    `;
  });
}

// Role selector persistence (used by login page)
function getRole() {
  return localStorage.getItem('agro_role') || null;
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initNavbarScroll();
  injectFooter();
  initDrawer();
  initReveal();
});

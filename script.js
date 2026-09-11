document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. HEADER: muda estilo ao rolar a página ---------- */
  const header = document.getElementById('header');

  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll();

  /* ---------- 2. MENU HAMBÚRGUER (mobile) ---------- */
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');

  function toggleMenu() {
    const isOpen = navMobile.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  // Fecha o menu mobile ao clicar em qualquer link
  document.querySelectorAll('.nav-mobile__link, .nav-mobile a.btn').forEach(link => {
    link.addEventListener('click', () => {
      if (navMobile.classList.contains('open')) toggleMenu();
    });
  });

  /* ---------- 3. FADE-IN AO ROLAR (Intersection Observer) ---------- */
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  fadeElements.forEach(el => observer.observe(el));

  /* ---------- 4. LINK ATIVO NO MENU CONFORME A SEÇÃO VISÍVEL ---------- */
  const sections = document.querySelectorAll('main section[id], .hero[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function setActiveLink() {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  /* ---------- 5. ANO AUTOMÁTICO NO RODAPÉ ---------- */
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

});

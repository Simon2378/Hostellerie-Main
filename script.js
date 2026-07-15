// =============================================
// HOSTELLERIE DE LA SANAGA — SITE SCRIPTS
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile menu toggle ----
  var menuToggle = document.getElementById('menuToggle');
  var mainNav = document.getElementById('mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
      menuToggle.classList.toggle('open');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
      });
    });
  }

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---- Back to top button ----
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Footer year ----
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Booking availability button (demo action) ----
  var checkBtn = document.getElementById('checkAvailability');
  if (checkBtn) {
    checkBtn.addEventListener('click', function () {
      var checkin = document.getElementById('checkin').value;
      var checkout = document.getElementById('checkout').value;
      if (!checkin || !checkout) {
        alert('Merci de sélectionner une date d\'arrivée et de départ.');
        return;
      }
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ---- Contact form (mailto handoff) ----
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var isEn = document.documentElement.lang === 'en';
      var fields = contactForm.querySelectorAll('input, textarea');
      var name = fields[0] ? fields[0].value.trim() : '';
      var email = fields[1] ? fields[1].value.trim() : '';
      var subject = fields[2] ? fields[2].value.trim() : '';
      var message = fields[3] ? fields[3].value.trim() : '';

      var mailSubject = subject || (isEn ? 'Message from the website' : 'Message depuis le site web');
      var nameLabel = isEn ? 'Name' : 'Nom';
      var mailBody = nameLabel + ': ' + name + '\nEmail: ' + email + '\n\n' + message;

      var mailtoLink = 'mailto:hostelleriedelasanaga@ymail.com'
        + '?subject=' + encodeURIComponent(mailSubject)
        + '&body=' + encodeURIComponent(mailBody);

      window.location.href = mailtoLink;
    });
  }

  // ---- Scroll reveal animations (fade in from left/right/up) ----
  var revealEls = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
  if (revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  // ---- Language switcher dropdown ----
  var langSwitcher = document.getElementById('langSwitcher');
  if (langSwitcher) {
    var langCurrent = langSwitcher.querySelector('.lang-current');
    langCurrent.addEventListener('click', function (e) {
      e.stopPropagation();
      langSwitcher.classList.toggle('open');
    });
    document.addEventListener('click', function () {
      langSwitcher.classList.remove('open');
    });
  }

  // ---- Room photo gallery lightbox ----
  var galleryImages = [];
  var galleryIndex = 0;
  var lightbox = null;

  function buildLightbox() {
    if (lightbox) return lightbox;
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML =
      '<button class="lightbox-close" aria-label="Fermer">&times;</button>' +
      '<button class="lightbox-prev" aria-label="Précédent">&#10094;</button>' +
      '<img class="lightbox-img" src="" alt="">' +
      '<button class="lightbox-next" aria-label="Suivant">&#10095;</button>' +
      '<div class="lightbox-counter"></div>';
    document.body.appendChild(lightbox);

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeGallery);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeGallery(); });
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function () { showGalleryImage(galleryIndex - 1); });
    lightbox.querySelector('.lightbox-next').addEventListener('click', function () { showGalleryImage(galleryIndex + 1); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowLeft') showGalleryImage(galleryIndex - 1);
      if (e.key === 'ArrowRight') showGalleryImage(galleryIndex + 1);
    });
    return lightbox;
  }

  function showGalleryImage(index) {
    galleryIndex = (index + galleryImages.length) % galleryImages.length;
    lightbox.querySelector('.lightbox-img').src = galleryImages[galleryIndex];
    lightbox.querySelector('.lightbox-counter').textContent = (galleryIndex + 1) + ' / ' + galleryImages.length;
  }

  function openGallery(images, startIndex) {
    buildLightbox();
    galleryImages = images;
    showGalleryImage(startIndex || 0);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeGallery() {
    if (lightbox) lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-gallery]').forEach(function (el) {
    var images = el.getAttribute('data-gallery').split(',').map(function (s) { return s.trim(); });
    el.addEventListener('click', function () { openGallery(images, 0); });
  });

  // ---- Sticky header shadow on scroll ----
  var header = document.getElementById('siteHeader');
  window.addEventListener('scroll', function () {
    if (header) header.style.boxShadow = window.scrollY > 10
      ? '0 4px 16px rgba(0,0,0,0.1)'
      : '0 2px 12px rgba(0,0,0,0.06)';
  });

});

// =============================================
// HOSTELLERIE DE LA SANAGA — SITE SCRIPTS
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile menu toggle ----
  var menuToggle = document.getElementById('menuToggle');
  var mainNav = document.getElementById('mainNav');
  var navBackdrop = document.getElementById('navBackdrop');
  if (menuToggle && mainNav) {
    function openMobileNav() {
      mainNav.classList.add('open');
      menuToggle.classList.add('open');
      if (navBackdrop) navBackdrop.classList.add('open');
      document.body.classList.add('nav-open');
    }
    function closeMobileNav() {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('open');
      if (navBackdrop) navBackdrop.classList.remove('open');
      document.body.classList.remove('nav-open');
    }

    menuToggle.addEventListener('click', function () {
      if (mainNav.classList.contains('open')) { closeMobileNav(); } else { openMobileNav(); }
    });

    if (navBackdrop) navBackdrop.addEventListener('click', closeMobileNav);

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
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
  var contactModal = document.getElementById('contactModalOverlay');

  if (contactForm && contactModal) {
    var modalMain = document.getElementById('contactModalMain');
    var modalEmailOptions = document.getElementById('contactModalEmailOptions');
    var modalEmailToggle = document.getElementById('modalEmailToggle');
    var modalEmailBack = document.getElementById('modalEmailBack');
    var modalClose = document.getElementById('contactModalClose');

    function getFormValues() {
      var fields = contactForm.querySelectorAll('input, textarea');
      return {
        name: fields[0] ? fields[0].value.trim() : '',
        email: fields[1] ? fields[1].value.trim() : '',
        subject: fields[2] ? fields[2].value.trim() : '',
        message: fields[3] ? fields[3].value.trim() : ''
      };
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var isEn = document.documentElement.lang === 'en';
      var v = getFormValues();
      var subject = v.subject || (isEn ? 'Message from the website' : 'Message depuis le site web');
      var nameLabel = isEn ? 'Name' : 'Nom';
      var body = nameLabel + ': ' + v.name + '\nEmail: ' + v.email;
      if (v.message) body += '\n\n' + v.message;

      var toAddress = 'hostelleriedelasanaga@gmail.com';

      document.getElementById('modalWhatsapp').href =
        'https://wa.me/237692266713?text=' + encodeURIComponent(body);
      document.getElementById('modalPhone').href = 'tel:+237692266713';
      document.getElementById('modalGmail').href =
        'https://mail.google.com/mail/?view=cm&fs=1&to=' + toAddress + '&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      document.getElementById('modalOutlook').href =
        'https://outlook.live.com/mail/0/deeplink/compose?to=' + toAddress + '&subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      document.getElementById('modalOtherMail').href =
        'mailto:' + toAddress + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

      modalEmailOptions.classList.remove('open');
      modalMain.classList.add('open');
      contactModal.classList.add('open');
    });

    modalEmailToggle.addEventListener('click', function () {
      modalMain.classList.remove('open');
      modalEmailOptions.classList.add('open');
    });
    modalEmailBack.addEventListener('click', function () {
      modalEmailOptions.classList.remove('open');
      modalMain.classList.add('open');
    });
    modalClose.addEventListener('click', function () { contactModal.classList.remove('open'); });
    contactModal.addEventListener('click', function (e) { if (e.target === contactModal) contactModal.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') contactModal.classList.remove('open'); });
  }

  // ---- Restaurant "Reserve a table" popup ----
  var reserveTableBtn = document.getElementById('reserveTableBtn');
  var reserveTableModal = document.getElementById('reserveTableModalOverlay');
  if (reserveTableBtn && reserveTableModal) {
    var reserveTableClose = document.getElementById('reserveTableModalClose');
    reserveTableBtn.addEventListener('click', function (e) {
      e.preventDefault();
      reserveTableModal.classList.add('open');
    });
    reserveTableClose.addEventListener('click', function () { reserveTableModal.classList.remove('open'); });
    reserveTableModal.addEventListener('click', function (e) { if (e.target === reserveTableModal) reserveTableModal.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') reserveTableModal.classList.remove('open'); });
  }

  // ---- Seminars "Request a Quote" popup ----
  var devisBtn = document.getElementById('devisBtn');
  var devisModal = document.getElementById('devisModalOverlay');
  if (devisBtn && devisModal) {
    var devisClose = document.getElementById('devisModalClose');
    devisBtn.addEventListener('click', function (e) {
      e.preventDefault();
      devisModal.classList.add('open');
    });
    devisClose.addEventListener('click', function () { devisModal.classList.remove('open'); });
    devisModal.addEventListener('click', function (e) { if (e.target === devisModal) devisModal.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') devisModal.classList.remove('open'); });
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
    el.addEventListener('click', function () {
      var shownImg = el.querySelector('img.active') || el.querySelector('img');
      var startIndex = 0;
      if (shownImg) {
        var shownSrc = shownImg.getAttribute('src').trim();
        var found = images.findIndex(function (src) { return src === shownSrc || shownSrc.indexOf(src) !== -1 || src.indexOf(shownSrc) !== -1; });
        if (found !== -1) startIndex = found;
      }
      openGallery(images, startIndex);
    });
  });

  // ---- Jump straight to a room's photos when arriving via #room-... link ----
  if (window.location.hash) {
    var targetRoom = document.querySelector(window.location.hash + '[data-gallery]');
    if (targetRoom) {
      setTimeout(function () {
        targetRoom.scrollIntoView({ behavior: 'smooth', block: 'center' });
        var images = targetRoom.getAttribute('data-gallery').split(',').map(function (s) { return s.trim(); });
        openGallery(images, 0);
      }, 300);
    }
  }

  // ---- Hero image carousel ----
  var heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    var heroIndex = 0;
    setInterval(function () {
      heroSlides[heroIndex].classList.remove('active');
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add('active');
    }, 5000);
  }

  // ---- Room page main photo carousel (auto-rotates, thumbnails stay put) ----
  var roomHeroSlides = document.querySelectorAll('.room-hero-slide');
  if (roomHeroSlides.length > 1) {
    var roomHeroIndex = 0;
    setInterval(function () {
      roomHeroSlides[roomHeroIndex].classList.remove('active');
      roomHeroIndex = (roomHeroIndex + 1) % roomHeroSlides.length;
      roomHeroSlides[roomHeroIndex].classList.add('active');
    }, 3000);
  }

  // ---- Sub-page banner photo carousel (nos-chambres.html etc.) ----
  var bannerSlides = document.querySelectorAll('.page-banner-slide');
  if (bannerSlides.length > 1) {
    var bannerIndex = 0;
    setInterval(function () {
      bannerSlides[bannerIndex].classList.remove('active');
      bannerIndex = (bannerIndex + 1) % bannerSlides.length;
      bannerSlides[bannerIndex].classList.add('active');
    }, 4000);
  }

  // ---- Room booking card: pre-fill dates into contact links ----
  var roomBookingCard = document.querySelector('.room-booking-card');
  if (roomBookingCard) {
    var rIn = document.getElementById('roomCheckin');
    var rOut = document.getElementById('roomCheckout');
    var waLink = roomBookingCard.querySelector('.contact-whatsapp');
    var emailLink = roomBookingCard.querySelector('.contact-email');
    var callLink = roomBookingCard.querySelector('.contact-call');
    var roomName = roomBookingCard.getAttribute('data-room-name') || '';
    var isEn = document.documentElement.lang === 'en';

    function formatDate(value) {
      if (!value) return '';
      var parts = value.split('-');
      return parts.length === 3 ? parts[2] + '/' + parts[1] + '/' + parts[0] : value;
    }

    function updateContactLinks() {
      var checkin = formatDate(rIn ? rIn.value : '');
      var checkout = formatDate(rOut ? rOut.value : '');
      var hasDates = checkin && checkout;

      var waMsg = isEn
        ? 'Hello, I would like to book the ' + roomName + '.'
        : 'Bonjour, je souhaite réserver la ' + roomName + '.';
      if (hasDates) {
        waMsg += isEn
          ? (' Check-in: ' + checkin + ', Check-out: ' + checkout + '.')
          : (' Arrivée : ' + checkin + ', Départ : ' + checkout + '.');
      }
      if (waLink) waLink.href = 'https://wa.me/237692266713?text=' + encodeURIComponent(waMsg);

      if (emailLink) {
        var subject = (isEn ? 'Booking request - ' : 'Demande de réservation - ') + roomName;
        var body = waMsg;
        emailLink.href = 'mailto:hostelleriedelasanaga@ymail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      }
    }

    if (rIn) rIn.addEventListener('change', updateContactLinks);
    if (rOut) rOut.addEventListener('change', updateContactLinks);
    updateContactLinks();
  }

  // ---- Sticky header shadow on scroll ----
  var header = document.getElementById('siteHeader');
  window.addEventListener('scroll', function () {
    if (header) header.style.boxShadow = window.scrollY > 10
      ? '0 4px 16px rgba(0,0,0,0.1)'
      : '0 2px 12px rgba(0,0,0,0.06)';
  });

});

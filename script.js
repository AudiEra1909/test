document.addEventListener('DOMContentLoaded', function () {
  // Topbar background on scroll
  var topbar = document.getElementById('topbar');
  var toggleTopbar = function () {
    if (window.scrollY > 40) {
      topbar.classList.add('scrolled');
    } else {
      topbar.classList.remove('scrolled');
    }
  };
  toggleTopbar();
  window.addEventListener('scroll', toggleTopbar, { passive: true });

  // Mobile menu
  var burger = document.getElementById('burger');
  var nav = document.getElementById('mainnav');
  burger.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // Gallery lightbox
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbClose = document.getElementById('lbClose');

  document.querySelectorAll('.g-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var full = item.getAttribute('data-full');
      var alt = item.querySelector('img').getAttribute('alt');
      lbImg.setAttribute('src', full);
      lbImg.setAttribute('alt', alt);
      lightbox.classList.add('open');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    lbImg.setAttribute('src', '');
  }
  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
});
  // Wysyłka formularza kontaktowego przez Web3Forms (bez przeładowania strony)
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wysyłanie...';

      var formData = new FormData(contactForm);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success) {
            submitBtn.textContent = 'Wysłano ✓';
            contactForm.reset();
          } else {
            submitBtn.textContent = 'Błąd — spróbuj ponownie';
          }
        })
        .catch(function () {
          submitBtn.textContent = 'Błąd — spróbuj ponownie';
        })
        .finally(function () {
          setTimeout(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }, 3000);
        });
    });
  }

(function () {
  'use strict';
  document.getElementById('year').textContent = new Date().getFullYear();

  var toggle = document.querySelector('.nav-toggle'), nav = document.getElementById('nav');
  toggle.addEventListener('click', function () {
    toggle.setAttribute('aria-expanded', String(nav.classList.toggle('open')));
  });

  // Scroll reveal
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.card, .chips li, .two > *, .page-head .wrap, form').forEach(function (el, i) {
      el.classList.add('reveal'); el.style.setProperty('--i', i % 3); io.observe(el);
    });
  }

  // Contact form -> opens email app (replace the address below)
  var form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements, ok = true;
    ['name', 'email', 'message'].forEach(function (k) {
      var v = f[k].value.trim(), good = v && (k !== 'email' || /^\S+@\S+\.\S+$/.test(v));
      f[k].setAttribute('aria-invalid', good ? 'false' : 'true'); if (!good) ok = false;
    });
    var note = document.getElementById('form-note');
    if (!ok) { note.textContent = 'Please complete all fields with a valid email.'; return; }
    window.location.href = 'mailto:you@example.com?subject=' + encodeURIComponent('Message from ' + f.name.value) +
      '&body=' + encodeURIComponent(f.message.value + '\n\n' + f.email.value);
    note.textContent = 'Opening your email app…';
  });
})();

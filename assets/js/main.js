/**
 * Blackfriars Barber Co. – shared behaviour
 * - Mobile nav: slide-in drawer, overlay, Esc to close, focus management
 * - Contact form: prevent default, show success message, log JSON to console
 */

(function () {
  'use strict';

  var trigger = document.getElementById('nav-trigger');
  var overlay = document.getElementById('nav-overlay');
  var drawer = document.getElementById('nav-drawer');

  function openNav() {
    if (!trigger || !overlay || !drawer) return;
    trigger.setAttribute('aria-expanded', 'true');
    overlay.classList.add('is-open');
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    var firstLink = drawer.querySelector('a');
    if (firstLink) firstLink.focus();
    document.body.style.overflow = 'hidden';
    overlay.addEventListener('click', closeNav);
    document.addEventListener('keydown', onNavKeydown);
  }

  function closeNav() {
    if (!trigger || !overlay || !drawer) return;
    trigger.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('is-open');
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    overlay.removeEventListener('click', closeNav);
    document.removeEventListener('keydown', onNavKeydown);
    if (trigger) trigger.focus();
  }

  function onNavKeydown(e) {
    if (e.key === 'Escape') closeNav();
  }

  if (trigger) {
    trigger.addEventListener('click', function () {
      if (trigger.getAttribute('aria-expanded') === 'true') closeNav();
      else openNav();
    });
  }

  /* Contact form: static submit, success message, log JSON */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameEl = form.querySelector('#name') || form.querySelector('[name="name"]');
      var emailEl = form.querySelector('#email') || form.querySelector('[name="email"]');
      var messageEl = form.querySelector('#message') || form.querySelector('[name="message"]');
      var name = nameEl ? nameEl.value.trim() : '';
      var email = emailEl ? emailEl.value.trim() : '';
      var message = messageEl ? messageEl.value.trim() : '';
      var payload = { name: name, email: email, message: message };
      console.log(JSON.stringify(payload));
      var success = document.getElementById('form-success');
      if (success) success.classList.add('is-visible');
    });
  }
})();

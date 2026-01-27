/**
 * Blackfriars Barber Co. – gallery
 * - Filter by data-category: all / cuts / fades / beards / shop
 * - Lightbox: open on thumb click, prev/next buttons, Esc to close, arrow keys to navigate
 * - Thumbnails use loading="lazy" (set in HTML)
 */

(function () {
  'use strict';

  var grid = document.getElementById('gallery-grid');
  var items = grid ? grid.querySelectorAll('.gallery-item') : [];
  var filterBtns = document.querySelectorAll('.gallery-filters button[data-filter]');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');
  var lightboxPrev = document.getElementById('lightbox-prev');
  var lightboxNext = document.getElementById('lightbox-next');
  var currentIndex = 0;
  var visibleItems = [];

  function getVisibleItems() {
    var cat = document.querySelector('.gallery-filters button.is-active');
    var category = cat ? cat.getAttribute('data-filter') : 'all';
    if (category === 'all') return Array.prototype.slice.call(items);
    return Array.prototype.slice.call(items).filter(function (el) {
      return el.getAttribute('data-category') === category;
    });
  }

  function filterGallery(category) {
    var i, el, show;
    for (i = 0; i < items.length; i++) {
      el = items[i];
      show = category === 'all' || el.getAttribute('data-category') === category;
      el.style.display = show ? '' : 'none';
    }
    for (i = 0; i < filterBtns.length; i++) {
      filterBtns[i].classList.toggle('is-active', filterBtns[i].getAttribute('data-filter') === category);
    }
    visibleItems = getVisibleItems();
  }

  for (var b = 0; b < filterBtns.length; b++) {
    filterBtns[b].addEventListener('click', function () {
      filterGallery(this.getAttribute('data-filter'));
    });
  }

  visibleItems = getVisibleItems();

  function openLightbox(index) {
    var list = visibleItems.length ? visibleItems : Array.prototype.slice.call(items);
    var safeIndex = Math.max(0, Math.min(index, list.length - 1));
    currentIndex = safeIndex;
    var node = list[safeIndex];
    if (!node || !lightboxImg) return;
    var src = node.getAttribute('href') || (node.querySelector('img') && node.querySelector('img').getAttribute('src'));
    var alt = (node.querySelector('img') && node.querySelector('img').getAttribute('alt')) || '';
    lightboxImg.setAttribute('src', src);
    lightboxImg.setAttribute('alt', alt);
    if (lightbox) {
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      if (lightboxClose) lightboxClose.focus();
      document.addEventListener('keydown', onLightboxKeydown);
    }
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.removeEventListener('keydown', onLightboxKeydown);
    }
  }

  function onLightboxKeydown(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { openLightbox(currentIndex - 1); e.preventDefault(); }
    if (e.key === 'ArrowRight') { openLightbox(currentIndex + 1); e.preventDefault(); }
  }

  if (grid) {
    grid.addEventListener('click', function (e) {
      var item = e.target.closest('.gallery-item');
      if (!item) return;
      e.preventDefault();
      var list = visibleItems.length ? visibleItems : Array.prototype.slice.call(items);
      var idx = list.indexOf(item);
      openLightbox(idx >= 0 ? idx : 0);
    });
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', function () { openLightbox(currentIndex - 1); });
  if (lightboxNext) lightboxNext.addEventListener('click', function () { openLightbox(currentIndex + 1); });
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
})();

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const year = document.querySelector('#year');
const galleryItems = [...document.querySelectorAll('.gallery-item')];
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCounter = document.querySelector('.lightbox-counter');
const closeButton = document.querySelector('.lightbox-close');
const prevButton = document.querySelector('.lightbox-prev');
const nextButton = document.querySelector('.lightbox-next');

let visibleItems = [...galleryItems];
let currentIndex = 0;

if (year) year.textContent = new Date().getFullYear();

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  nav?.classList.toggle('is-open', !isOpen);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  });
});

function openLightbox(index) {
  if (!visibleItems.length) return;
  currentIndex = (index + visibleItems.length) % visibleItems.length;
  const item = visibleItems[currentIndex];
  const src = item.dataset.image;
  const alt = item.dataset.alt || '';

  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightboxCounter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(visibleItems.length).padStart(2, '0')}`;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-locked');
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-locked');
}

function moveLightbox(direction) {
  openLightbox(currentIndex + direction);
}

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const index = visibleItems.indexOf(item);
    if (index >= 0) openLightbox(index);
  });
});

closeButton.addEventListener('click', closeLightbox);
prevButton.addEventListener('click', () => moveLightbox(-1));
nextButton.addEventListener('click', () => moveLightbox(1));

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('is-open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') moveLightbox(-1);
  if (event.key === 'ArrowRight') moveLightbox(1);
});

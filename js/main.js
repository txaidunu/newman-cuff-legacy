/* Newman Cuff Legacy — interactions */

document.addEventListener('DOMContentLoaded', () => {
  // Progress bar
  const progressBar = document.getElementById('progressBar');
  const nav = document.getElementById('nav');

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';

    if (scrollTop > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      if (navLinks.style.display === 'flex') {
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(10,22,40,0.97)';
        navLinks.style.flexDirection = 'column';
        navLinks.style.padding = '1.5rem';
        navLinks.style.gap = '1.25rem';
        navLinks.style.borderBottom = '1px solid rgba(201,168,76,0.15)';
      }
    });
  }

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // All images that should open in lightbox
  document.querySelectorAll('img').forEach(img => {
    // Skip if it's a tiny icon or something, but here all content images are fair game
    if (img.closest('.nav') || img.closest('.hero-scroll')) return;

    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      const caption = img.alt || img.closest('figure')?.querySelector('figcaption')?.textContent || '';
      openLightbox(img.src, caption);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Smooth reveal on scroll (simple intersection observer)
  const reveals = document.querySelectorAll(
    '.section-header, .story-block, .glamour-card, .sig-card, .archive-item, .artifact-showcase, .silence-content, .joannie-bio, .inquire-box, .final-quote'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition = 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)';
    observer.observe(el);
  });
});

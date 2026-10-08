// Год в футере
document.getElementById('year').textContent = new Date().getFullYear();

// Появление элементов при скролле
const revealEls = document.querySelectorAll('.reveal');

// Небольшая задержка между соседними элементами, чтобы выглядело плавнее
revealEls.forEach((el, i) => {
  el.style.setProperty('--delay', (i % 4) * 90 + 'ms');
});

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el) => io.observe(el));

// Лёгкий параллакс для декоративных элементов при прокрутке
const decos = document.querySelectorAll('.deco');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const y = window.scrollY;
      decos.forEach((d, i) => {
        const speed = 0.04 + (i % 4) * 0.02;
        d.style.translate = `0 ${-y * speed}px`;
      });
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

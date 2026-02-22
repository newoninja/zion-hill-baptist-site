const currentPath = window.location.pathname.split('/').pop() || 'index.html';

for (const link of document.querySelectorAll('.nav-link')) {
  const href = link.getAttribute('href');
  if (href === currentPath) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
}

for (const yearNode of document.querySelectorAll('[data-year]')) {
  yearNode.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  },
  {
    threshold: 0.12,
  }
);

for (const node of document.querySelectorAll('.reveal')) {
  observer.observe(node);
}

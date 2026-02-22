const currentPath = window.location.pathname.split('/').pop() || 'index.html';

for (const yearNode of document.querySelectorAll('[data-year]')) {
  yearNode.textContent = new Date().getFullYear();
}

for (const navLink of document.querySelectorAll('.nav-link')) {
  const href = navLink.getAttribute('href');
  if (href === currentPath) {
    navLink.classList.add('active');
    navLink.setAttribute('aria-current', 'page');
  }
}

const nav = document.querySelector('#primary-nav');
const toggle = document.querySelector('[data-menu-toggle]');

if (nav && toggle) {
  const closeNav = () => {
    nav.dataset.open = 'false';
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const opening = nav.dataset.open !== 'true';
    nav.dataset.open = opening ? 'true' : 'false';
    toggle.setAttribute('aria-expanded', opening ? 'true' : 'false');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNav();
    }
  });

  for (const link of nav.querySelectorAll('a')) {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 980px)').matches) {
        closeNav();
      }
    });
  }
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.14 }
  );

  for (const node of document.querySelectorAll('.reveal')) {
    observer.observe(node);
  }
}

const welcomeModal = document.querySelector('[data-first-visit-modal]');
if (welcomeModal) {
  const wasDismissed = localStorage.getItem('zhbcWelcomeDismissed') === 'true';
  if (!wasDismissed) {
    welcomeModal.dataset.open = 'true';
  }

  for (const dismissButton of welcomeModal.querySelectorAll('[data-close-modal]')) {
    dismissButton.addEventListener('click', () => {
      welcomeModal.dataset.open = 'false';
      localStorage.setItem('zhbcWelcomeDismissed', 'true');
    });
  }
}

const sermonSearch = document.querySelector('[data-sermon-search]');
const filterButtons = Array.from(document.querySelectorAll('[data-sermon-filter]'));
const sermonItems = Array.from(document.querySelectorAll('.sermon-item[data-tags]'));
const noResults = document.querySelector('[data-no-sermon-results]');

const runSermonFilter = () => {
  if (!sermonItems.length) {
    return;
  }

  const query = sermonSearch ? sermonSearch.value.trim().toLowerCase() : '';
  const activeFilter = filterButtons.find((button) => button.classList.contains('active'))?.dataset.sermonFilter || 'all';
  let visibleCount = 0;

  for (const item of sermonItems) {
    const searchable = `${item.dataset.title || ''} ${item.dataset.tags || ''}`.toLowerCase();
    const matchesText = query.length === 0 || searchable.includes(query);
    const matchesFilter = activeFilter === 'all' || (item.dataset.tags || '').toLowerCase().includes(activeFilter.toLowerCase());
    const visible = matchesText && matchesFilter;

    item.hidden = !visible;
    if (visible) {
      visibleCount += 1;
    }
  }

  if (noResults) {
    noResults.hidden = visibleCount !== 0;
  }
};

if (sermonSearch) {
  sermonSearch.addEventListener('input', runSermonFilter);
}

for (const button of filterButtons) {
  button.addEventListener('click', () => {
    for (const item of filterButtons) {
      item.classList.remove('active');
    }
    button.classList.add('active');
    runSermonFilter();
  });
}

runSermonFilter();

const allAudio = Array.from(document.querySelectorAll('audio'));
for (const audio of allAudio) {
  audio.addEventListener('play', () => {
    for (const other of allAudio) {
      if (other !== audio) {
        other.pause();
      }
    }
  });
}

for (const rateButton of document.querySelectorAll('.rate-button[data-audio-target][data-rate]')) {
  rateButton.addEventListener('click', () => {
    const audio = document.getElementById(rateButton.dataset.audioTarget || '');
    if (!audio) {
      return;
    }

    audio.playbackRate = Number(rateButton.dataset.rate);

    for (const peer of document.querySelectorAll(`.rate-button[data-audio-target='${audio.id}']`)) {
      peer.classList.remove('active');
    }

    rateButton.classList.add('active');
  });
}

(function () {
  const carousel = document.getElementById('carousel');
  const prevBtn = document.getElementById('carPrev');
  const nextBtn = document.getElementById('carNext');
  const dotsWrap = document.getElementById('carouselDots');
  if (!carousel) return;

  const cards = Array.from(carousel.children);

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to project ' + (i + 1));
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      cards[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function cardWidth() {
    return cards[0].getBoundingClientRect().width + 19; // width + gap
  }

  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -cardWidth(), behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: cardWidth(), behavior: 'smooth' });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = cards.indexOf(entry.target);
          dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        }
      });
    },
    { root: carousel, threshold: 0.6 }
  );
  cards.forEach((c) => observer.observe(c));

  // Read more / show less toggles
  document.querySelectorAll('.card-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const body = btn.closest('.card-body');
      const teaser = body.querySelector('.card-teaser');
      const full = body.querySelector('.card-full');
      const expanded = btn.getAttribute('aria-expanded') === 'true';

      if (expanded) {
        full.hidden = true;
        teaser.hidden = false;
        btn.textContent = 'Read more';
        btn.setAttribute('aria-expanded', 'false');
      } else {
        full.hidden = false;
        teaser.hidden = true;
        btn.textContent = 'Show less';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

(function initHousingDetailPrototype() {
  const imageEl = document.querySelector('[data-carousel-image]');
  const prevButton = document.querySelector('[data-prev]');
  const nextButton = document.querySelector('[data-next]');

  const images = [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80'
  ];

  let currentIndex = 0;

  function renderCarousel() {
    if (!imageEl) return;
    imageEl.setAttribute('src', images[currentIndex]);
  }

  prevButton?.addEventListener('click', function handlePrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    renderCarousel();
  });

  nextButton?.addEventListener('click', function handleNext() {
    currentIndex = (currentIndex + 1) % images.length;
    renderCarousel();
  });

  const dayButtons = Array.from(document.querySelectorAll('.calendar-day.available'));
  const checkinEl = document.querySelector('[data-checkin]');
  const checkoutEl = document.querySelector('[data-checkout]');
  const totalEl = document.querySelector('[data-total]');

  let checkin = null;
  let checkout = null;
  const nightlyPrice = 220;

  function updateSummary() {
    if (checkinEl) checkinEl.textContent = checkin ?? 'Não selecionado';
    if (checkoutEl) checkoutEl.textContent = checkout ?? 'Não selecionado';

    const nights = checkin && checkout ? Math.max(Number(checkout) - Number(checkin), 1) : 0;
    if (totalEl) totalEl.textContent = String(nights * nightlyPrice);
  }

  dayButtons.forEach(function setupDayButton(button) {
    button.addEventListener('click', function handleDaySelection() {
      const day = button.textContent?.trim();
      if (!day) return;

      if (!checkin || (checkin && checkout)) {
        checkin = day;
        checkout = null;
      } else {
        checkout = day;
      }

      dayButtons.forEach(function clearState(item) {
        item.classList.remove('selected');
      });

      button.classList.add('selected');
      updateSummary();
    });
  });

  updateSummary();
})();

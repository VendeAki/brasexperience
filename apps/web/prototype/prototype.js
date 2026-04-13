(function initHousingDetailPrototype() {
  const imageEl = document.querySelector('[data-carousel-image]');
  const prevButton = document.querySelector('[data-prev]');
  const nextButton = document.querySelector('[data-next]');

  if (!imageEl) return;

  const images = [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80'
  ];

  let currentIndex = 0;

  function renderCarousel() {
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

(function initPartnerDetailPrototype() {
  const requestForm = document.querySelector('[data-request-form]');
  const testimonialForm = document.querySelector('[data-testimonial-form]');
  const feedback = document.querySelector('[data-request-feedback]');
  const tenureEl = document.querySelector('[data-provider-tenure]');
  const reviewsList = document.querySelector('[data-reviews-list]');
  const ratingEl = document.querySelector('[data-provider-rating]');

  if (!requestForm) return;

  const createdAt = new Date('2023-08-01T00:00:00');
  const now = new Date();
  const months = (now.getFullYear() - createdAt.getFullYear()) * 12 + (now.getMonth() - createdAt.getMonth());

  if (tenureEl) {
    tenureEl.textContent = `${Math.max(months, 1)} meses`;
  }

  let ratings = [5, 4, 5];

  function updateAverageRating() {
    if (!ratingEl) return;
    const average = ratings.reduce((acc, value) => acc + value, 0) / ratings.length;
    ratingEl.textContent = average.toFixed(1);
  }

  requestForm.addEventListener('submit', function handleRequest(event) {
    event.preventDefault();
    const formData = new FormData(requestForm);
    const date = formData.get('serviceDate');
    const time = formData.get('serviceTime');
    const point = formData.get('meetingPoint');

    if (feedback) {
      feedback.textContent = `Solicitação enviada para ${date} às ${time}. Ponto de encontro: ${point}.`;
    }

    requestForm.reset();
  });

  testimonialForm?.addEventListener('submit', function handleTestimonial(event) {
    event.preventDefault();
    const formData = new FormData(testimonialForm);
    const name = String(formData.get('name') ?? 'Usuário');
    const rating = Number(formData.get('rating') ?? 5);
    const comment = String(formData.get('comment') ?? '');

    const safeRating = Math.min(Math.max(rating, 1), 5);
    ratings = [safeRating, ...ratings].slice(0, 10);
    updateAverageRating();

    if (reviewsList) {
      const item = document.createElement('article');
      item.className = 'review-item';
      item.innerHTML = `<p><strong>${name}</strong> • ⭐ ${safeRating} • agora</p><p>${comment}</p>`;
      reviewsList.prepend(item);
    }

    testimonialForm.reset();
  });

  updateAverageRating();
})();

(function initHostingListCarousels() {
  const carousels = Array.from(document.querySelectorAll('[data-hosting-carousel]'));
  if (!carousels.length) return;

  carousels.forEach(function setupCarousel(root) {
    const imageEl = root.querySelector('[data-hosting-image]');
    const prevBtn = root.querySelector('[data-hosting-prev]');
    const nextBtn = root.querySelector('[data-hosting-next]');
    const dotsRoot = root.querySelector('[data-hosting-dots]');

    if (!imageEl || !prevBtn || !nextBtn || !dotsRoot) return;

    const rawImages = root.getAttribute('data-images') ?? '[]';
    let images = [];

    try {
      images = JSON.parse(rawImages);
    } catch (_error) {
      images = [];
    }

    if (!images.length) return;

    let index = 0;

    function render() {
      imageEl.setAttribute('src', images[index]);
      Array.from(dotsRoot.children).forEach(function updateDot(dot, dotIndex) {
        dot.classList.toggle('active', dotIndex === index);
      });
    }

    images.forEach(function createDot(_, dotIndex) {
      const dot = document.createElement('button');
      dot.className = 'hosting-dot';
      dot.type = 'button';
      dot.addEventListener('click', function selectDot() {
        index = dotIndex;
        render();
      });
      dotsRoot.appendChild(dot);
    });

    prevBtn.addEventListener('click', function prev() {
      index = (index - 1 + images.length) % images.length;
      render();
    });

    nextBtn.addEventListener('click', function next() {
      index = (index + 1) % images.length;
      render();
    });

    render();
  });
})();

(function initLoginPrototype() {
  const loginForm = document.querySelector('[data-login-form]');
  const feedback = document.querySelector('[data-login-feedback]');
  if (!loginForm) return;

  const defaultEmail = 'teste@brasexperiencie.com';
  const defaultPassword = '123456';

  loginForm.addEventListener('submit', function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const email = String(formData.get('email') ?? '').trim().toLowerCase();
    const password = String(formData.get('password') ?? '');

    if (email === defaultEmail && password === defaultPassword) {
      localStorage.setItem('bras.session', JSON.stringify({ email, loggedAt: new Date().toISOString() }));
      if (feedback) feedback.textContent = 'Login de teste realizado com sucesso!';
      return;
    }

    if (feedback) feedback.textContent = 'Credenciais inválidas. Use as credenciais padrão exibidas na tela.';
  });
})();

(function initStoresSelectionPrototype() {
  const addButtons = Array.from(document.querySelectorAll('[data-add-store]'));
  const feedback = document.querySelector('[data-store-feedback]');
  if (!addButtons.length) return;

  function getRoute() {
    const stored = localStorage.getItem('bras.route.stores');
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch (_error) {
      return [];
    }
  }

  function setRoute(route) {
    localStorage.setItem('bras.route.stores', JSON.stringify(route));
  }

  addButtons.forEach(function bindButton(button) {
    button.addEventListener('click', function addStore() {
      const card = button.closest('.store-card');
      if (!card) return;

      const store = {
        id: card.getAttribute('data-store-id'),
        name: card.getAttribute('data-store-name'),
        address: card.getAttribute('data-store-address')
      };

      const route = getRoute();
      const exists = route.some(function find(item) {
        return item.id === store.id;
      });

      if (!exists) {
        route.push(store);
        setRoute(route);
      }

      if (feedback) feedback.textContent = `${store.name} adicionada ao roteiro.`;
    });
  });
})();

(function initRoutePagePrototype() {
  const routeList = document.querySelector('[data-route-list]');
  const clearButton = document.querySelector('[data-clear-route]');
  if (!routeList) return;

  function readRoute() {
    const stored = localStorage.getItem('bras.route.stores');
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch (_error) {
      return [];
    }
  }

  function renderRoute() {
    const stores = readRoute();
    routeList.innerHTML = '';

    if (!stores.length) {
      routeList.innerHTML = '<li>Nenhuma loja adicionada ainda.</li>';
      return;
    }

    stores.forEach(function renderStore(store, index) {
      const item = document.createElement('li');
      item.textContent = `${index + 1}. ${store.name} — ${store.address}`;
      routeList.appendChild(item);
    });
  }

  clearButton?.addEventListener('click', function clearRoute() {
    localStorage.removeItem('bras.route.stores');
    renderRoute();
  });

  renderRoute();
})();

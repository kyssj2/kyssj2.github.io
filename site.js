(() => {
  const dialog = document.querySelector('[data-search-dialog]');
  const openButton = document.querySelector('[data-search-open]');
  const closeButton = document.querySelector('[data-search-close]');
  const input = document.querySelector('[data-search-input]');
  const results = document.querySelector('[data-search-results]');

  if (!dialog || !openButton || !closeButton || !input || !results) return;

  const entries = [
    { title: 'ChatGPT vs Claude en 2026', category: 'Guides IA', url: '/guides-ia/chatgpt-vs-claude-2026/', keywords: 'chatgpt claude intelligence artificielle assistant ia comparatif abonnement' },
    { title: '7 outils IA gratuits à tester', category: 'Guides IA', url: '/guides-ia/outils-ia-gratuits/', keywords: 'outils ia gratuits intelligence artificielle gratuit productivite' },
    { title: 'Meilleur casque à moins de 50 €', category: 'Tech', url: '/tech/casque-moins-de-50-euros/', keywords: 'casque audio bluetooth filaire 50 euros achat tech' },
    { title: 'Guides IA', category: 'Catégorie', url: '/guides-ia/', keywords: 'ia intelligence artificielle guides assistants' },
    { title: 'Logiciels', category: 'Catégorie', url: '/logiciels/', keywords: 'logiciels applications outils programmes' },
    { title: 'Tech', category: 'Catégorie', url: '/tech/', keywords: 'tech technologie matériel achat produits' },
    { title: 'Bons plans', category: 'Catégorie', url: '/bons-plans/', keywords: 'bons plans promotions réductions économies prix' },
    { title: 'Notre méthode', category: 'ChoixTech', url: '/methodologie/', keywords: 'méthode indépendance sources comparatifs critères affiliation' },
    { title: 'À propos', category: 'ChoixTech', url: '/a-propos/', keywords: 'à propos choixtech mission éditorial' },
    { title: 'Transparence', category: 'ChoixTech', url: '/transparence/', keywords: 'transparence affiliation indépendance commissions' }
  ];

  const normalize = (value) => value
    .toLocaleLowerCase('fr')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const render = (query = '') => {
    const normalizedQuery = normalize(query.trim());
    const filtered = normalizedQuery
      ? entries.filter((entry) => normalize(`${entry.title} ${entry.category} ${entry.keywords}`).includes(normalizedQuery))
      : entries.slice(0, 7);

    results.innerHTML = '';

    if (!filtered.length) {
      const empty = document.createElement('p');
      empty.className = 'search-empty';
      empty.textContent = 'Aucun résultat. Essayez par exemple « IA », « casque » ou « logiciels ».';
      results.appendChild(empty);
      return;
    }

    filtered.forEach((entry) => {
      const link = document.createElement('a');
      link.className = 'search-result';
      link.href = entry.url;

      const text = document.createElement('span');
      const title = document.createElement('strong');
      const meta = document.createElement('small');
      const arrow = document.createElement('span');

      title.textContent = entry.title;
      meta.textContent = entry.category;
      arrow.className = 'search-result-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';

      text.append(title, meta);
      link.append(text, arrow);
      results.appendChild(link);
    });
  };

  const openSearch = () => {
    render(input.value);
    dialog.showModal();
    document.body.classList.add('search-open');
    window.setTimeout(() => input.focus(), 30);
  };

  const closeSearch = () => {
    dialog.close();
    document.body.classList.remove('search-open');
    openButton.focus();
  };

  openButton.addEventListener('click', openSearch);
  closeButton.addEventListener('click', closeSearch);
  input.addEventListener('input', (event) => render(event.target.value));

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeSearch();
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('search-open');
  });

  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (!dialog.open) openSearch();
    }
  });
})();

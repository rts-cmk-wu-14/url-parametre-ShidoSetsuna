(() => {
  const STORAGE_KEY = "Favorites";

  const getSaved = () =>
    new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));

  const save = (set) =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));

  const applyState = (el, saved = getSaved()) => {
    if (!el || !el.dataset?.id) return;
    if (saved.has(el.dataset.id)) el.classList.add("Favorited");
    else el.classList.remove("Favorited");
  };

  // 1) Delegated click handler (works for existing + future hearts)
  document.addEventListener("click", (e) => {
    const el = e.target.closest(".favoriteIcon");
    if (!el || !el.dataset?.id) return;

    const saved = getSaved();
    const isFav = el.classList.toggle("Favorited");
    if (isFav) saved.add(el.dataset.id);
    else saved.delete(el.dataset.id);
    save(saved);
  });

  // 2) Apply saved state to any hearts currently in DOM
  document.querySelectorAll(".favoriteIcon").forEach((el) => applyState(el));

  // 3) Observe future DOM additions and apply saved state when hearts appear
  const observer = new MutationObserver((mutations) => {
    const saved = getSaved();
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches?.(".favoriteIcon")) applyState(node, saved);
        node
          .querySelectorAll?.(".favoriteIcon")
          .forEach((el) => applyState(el, saved));
      }
    }
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();

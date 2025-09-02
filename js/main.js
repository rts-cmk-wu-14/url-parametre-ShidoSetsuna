(() => {
  const STORAGE_KEY = "Favorites";

  const getSaved = () =>
    new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));

  const save = (set) =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));

  const applyState = (el, saved = getSaved()) => {
    // If element or the elements id doesnt exist, exit
    if (!el || !el.dataset?.id) return;
    // If the localstorage item has the elements id, we give that element the class
    // Favorited
    if (saved.has(el.dataset.id)) el.classList.add("Favorited");
    // Otherwise we remove the Favorited class (although probably not there anyway)
    else el.classList.remove("Favorited");
  };

  // 1) Delegated click handler (works for existing + future hearts)
  document.addEventListener("click", (e) => {
    //el equal to the closest .favoriteIcon class when we click
    const el = e.target.closest(".favoriteIcon");
    // If element or the elements id doesnt exist, exit
    if (!el || !el.dataset?.id) return;

    const saved = getSaved();
    const isFav = el.classList.toggle("Favorited");
    // If the element has the class Favorited, add it to localstorage
    if (isFav) saved.add(el.dataset.id);
    // Otherwise remove it from localstorage
    else saved.delete(el.dataset.id);
    // update localstorage
    save(saved);
  });

  // 2) Apply saved state to any hearts currently in DOM
  document.querySelectorAll(".favoriteIcon").forEach((el) => applyState(el));

  // 3) Observe future DOM additions and apply saved state when hearts appear
  const observer = new MutationObserver((mutations) => {
    // Grab the current favorites from localStorage as a Set
    const saved = getSaved();

    // Loop over each "mutation record" (each describes a change in the DOM)
    for (const m of mutations) {
      // Loop over every node that was added in this mutation
      for (const node of m.addedNodes) {
        // Skip if it's not an Element (could be text, comments, etc.)
        if (!(node instanceof Element)) continue;

        // If the new node itself is a heart icon, restore its state
        if (node.matches?.(".favoriteIcon")) applyState(node, saved);

        // If the new node is a container with heart icons inside,
        // find all of them and restore their state as well
        node
          .querySelectorAll?.(".favoriteIcon")
          .forEach((el) => applyState(el, saved));
      }
    }
  });

  // Tell the observer what to watch
  observer.observe(document.documentElement, {
    childList: true, // watch for direct children being added/removed
    subtree: true, // also watch *all descendants* (deep changes)
  });
})();

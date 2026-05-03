(function () {
  const body = document.body;
  const navToggle = document.querySelector(".nav-toggle");
  const sidebar = document.querySelector(".site-sidebar");
  const search = document.querySelector("#site-search");
  const chunks = Array.from(document.querySelectorAll(".doc-chunk"));
  const navLinks = Array.from(document.querySelectorAll(".nav-list a"));
  const noResults = document.querySelector(".no-results");
  const atlasSearch = document.querySelector("#atlas-search");
  const atlasFamily = document.querySelector("#atlas-family");
  const atlasTempo = document.querySelector("#atlas-tempo");
  const atlasCards = Array.from(document.querySelectorAll(".atlas-card"));
  const atlasEmpty = document.querySelector(".atlas-empty");

  if (navToggle && sidebar) {
    navToggle.addEventListener("click", () => {
      const open = !body.classList.contains("nav-open");
      body.classList.toggle("nav-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    });

    sidebar.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLAnchorElement) {
        body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && search && document.activeElement !== search) {
      event.preventDefault();
      search.focus();
    }
    if (event.key === "Escape" && search && document.activeElement === search) {
      search.value = "";
      filterSections("");
      search.blur();
    }
  });

  function normalize(value) {
    return value.toLowerCase().replace(/\s+/g, " ").trim();
  }

  function filterSections(query) {
    const needle = normalize(query);
    let visible = 0;
    chunks.forEach((chunk) => {
      const haystack = normalize(chunk.textContent || "");
      const match = !needle || haystack.includes(needle);
      chunk.classList.toggle("is-hidden-by-search", !match);
      if (match) visible += 1;
    });
    if (noResults) noResults.hidden = visible !== 0;
  }

  if (search) {
    search.addEventListener("input", () => filterSections(search.value));
  }

  function filterAtlas() {
    const query = atlasSearch ? normalize(atlasSearch.value || "") : "";
    const family = atlasFamily ? atlasFamily.value : "";
    const tempo = atlasTempo ? atlasTempo.value : "";
    let visible = 0;
    atlasCards.forEach((card) => {
      const matchesQuery = !query || normalize(card.dataset.search || card.textContent || "").includes(query);
      const matchesFamily = !family || card.dataset.family === family;
      const matchesTempo = !tempo || card.dataset.tempo === tempo;
      const match = matchesQuery && matchesFamily && matchesTempo;
      card.classList.toggle("is-hidden-by-filter", !match);
      if (match) visible += 1;
    });
    if (atlasEmpty) atlasEmpty.hidden = visible !== 0;
  }

  [atlasSearch, atlasFamily, atlasTempo].forEach((control) => {
    if (control) control.addEventListener("input", filterAtlas);
    if (control) control.addEventListener("change", filterAtlas);
  });

  document.querySelectorAll(".copy-button").forEach((button) => {
    button.addEventListener("click", async () => {
      const panel = button.closest(".code-panel");
      const code = panel ? panel.querySelector("code") : null;
      if (!code) return;
      const text = code.textContent || "";
      try {
        await navigator.clipboard.writeText(text);
        const previous = button.textContent;
        button.textContent = "Copied";
        window.setTimeout(() => {
          button.textContent = previous;
        }, 1100);
      } catch (error) {
        button.textContent = "Select";
      }
    });
  });

  if ("IntersectionObserver" in window) {
    const byHash = new Map(navLinks.map((link) => [link.hash, link]));
    const headings = Array.from(document.querySelectorAll("section[id], .hero[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const hash = "#" + visible.target.id;
        navLinks.forEach((link) => link.classList.toggle("is-active", link === byHash.get(hash)));
      },
      { rootMargin: "-12% 0px -70% 0px", threshold: [0.05, 0.2, 0.45] }
    );
    headings.forEach((heading) => observer.observe(heading));
  }
})();

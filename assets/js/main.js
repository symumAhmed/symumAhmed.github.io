(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const progress = document.querySelector(".progress");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
      menuButton.textContent = isOpen ? "Close" : "Menu";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
        menuButton.textContent = "Menu";
      });
    });
  }

  const updateProgress = () => {
    if (!progress) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = percentage + "%";
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = new Date().getFullYear();
})();


  // Interactive knowledge constellation: lightweight CSS 3D, no external library.
  const scene = document.querySelector(".knowledge-scene");
  if (scene) {
    const detailTitle = scene.querySelector(".scene-detail strong");
    const detailText = scene.querySelector(".scene-detail span");
    const nodes = [...scene.querySelectorAll(".knowledge-node")];
    nodes.forEach((node) => node.addEventListener("click", () => {
      nodes.forEach((item) => item.classList.remove("active"));
      node.classList.add("active");
      if (detailTitle) detailTitle.textContent = node.dataset.topic || "Research focus";
      if (detailText) detailText.textContent = node.dataset.detail || "";
    }));
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scene.addEventListener("pointermove", (event) => {
        const rect = scene.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        scene.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      });
      scene.addEventListener("pointerleave", () => { scene.style.transform = ""; });
    }
  }

  // Selectable thesis/publication stack.
  const archiveStack = document.querySelector(".book-stack");
  if (archiveStack) {
    const books = [...archiveStack.querySelectorAll(".stack-book")];
    const kind = document.getElementById("archive-kind");
    const year = document.getElementById("archive-year");
    const title = document.getElementById("archive-title");
    const summary = document.getElementById("archive-summary");
    const meta = document.getElementById("archive-meta");
    const link = document.getElementById("archive-link");
    books.forEach((book) => book.addEventListener("click", () => {
      books.forEach((item) => {
        item.classList.remove("is-selected");
        item.setAttribute("aria-pressed", "false");
      });
      book.classList.add("is-selected");
      book.setAttribute("aria-pressed", "true");
      if (kind) kind.textContent = book.dataset.kind || "";
      if (year) year.textContent = book.dataset.year || "";
      if (title) title.textContent = book.dataset.title || "";
      if (summary) summary.textContent = book.dataset.summary || "";
      if (meta) meta.textContent = book.dataset.meta || "";
      if (link) {
        if (book.dataset.url) {
          link.href = book.dataset.url;
          link.textContent = book.dataset.link || "Read publication";
          link.hidden = false;
          link.target = "_blank";
          link.rel = "noopener";
        } else {
          link.hidden = true;
          link.removeAttribute("href");
        }
      }
    }));
  }

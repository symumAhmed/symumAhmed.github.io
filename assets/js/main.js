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


(() => {
 const root=document.documentElement, toggle=document.querySelector(".theme-toggle");
 const saved=localStorage.getItem("portfolio-theme");
 root.dataset.theme=saved||(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");
 const paint=()=>{if(!toggle)return;const light=root.dataset.theme==="light";toggle.setAttribute("aria-label",light?"Switch to dark theme":"Switch to light theme");toggle.querySelector(".theme-label").textContent=light?"Dark":"Light";toggle.querySelector(".theme-icon").textContent=light?"☾":"☼";};
 paint();toggle?.addEventListener("click",()=>{root.dataset.theme=root.dataset.theme==="light"?"dark":"light";localStorage.setItem("portfolio-theme",root.dataset.theme);paint();});
})();

(() => {
 const items=[...document.querySelectorAll(".idea-bubble")];
 if(!("IntersectionObserver" in window)){items.forEach(item=>item.classList.add("visible"));return;}
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
 }),{threshold:.18,rootMargin:"0px 0px -8% 0px"});
 items.forEach((item,index)=>{item.style.transitionDelay=(index%2) ? "110ms" : "0ms";observer.observe(item);});
})();


// Sticky research explorer: synchronize the fixed visual with the topic in view.
(() => {
  const topics = [...document.querySelectorAll("[data-research-topic]")];
  const visuals = [...document.querySelectorAll("[data-research-visual]")];
  if (!topics.length || !visuals.length) return;

  const counter = document.getElementById("research-counter");
  const kicker = document.getElementById("research-active-kicker");
  const title = document.getElementById("research-active-title");
  const description = document.getElementById("research-active-description");
  const progress = document.getElementById("research-progress-fill");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const activate = (index) => {
    const topic = topics[index];
    if (!topic) return;
    topics.forEach((item, i) => {
      const active = i === index;
      item.classList.toggle("is-active", active);
      const status = item.querySelector(".topic-status");
      if (status) status.textContent = active ? "CURRENT FOCUS" : "EXPLORE";
    });
    visuals.forEach((visual, i) => visual.classList.toggle("is-active", i === index));
    if (counter) counter.textContent = String(index + 1).padStart(2, "0") + " — " + String(topics.length).padStart(2, "0");
    if (kicker) kicker.textContent = topic.querySelector(".topic-index")?.textContent || "";
    if (title) title.textContent = topic.querySelector("h3")?.textContent || "";
    if (description) description.textContent = topic.querySelector("p")?.textContent || "";
    if (progress) progress.style.width = ((index + 1) / topics.length * 100) + "%";
  };

  if (!("IntersectionObserver" in window)) {
    activate(0);
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (visible.length) {
      const index = topics.indexOf(visible[0].target);
      if (index >= 0) activate(index);
    }
  }, {
    root: null,
    rootMargin: "-38% 0px -38% 0px",
    threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
  });
  topics.forEach(topic => observer.observe(topic));
  activate(0);
})();

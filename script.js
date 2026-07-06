const nav = document.querySelector("#site-nav");
const navToggle = document.querySelector(".menu-toggle");
const siteHeader = document.querySelector(".site-header");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateHeaderState() {
  if (!siteHeader) {
    return;
  }

  siteHeader.classList.toggle("scrolled", window.scrollY > 16);
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  document.documentElement.classList.add("motion-ready");

  const revealItems = document.querySelectorAll(
    [
      ".trust-strip div",
      ".section-heading",
      ".split-grid > *",
      ".cabinet-points article",
      ".service-card",
      ".animal-grid article",
      ".gallery-grid figure",
      ".equipment-grid article",
      ".team-card",
      ".reviews-summary",
      ".review-card",
      ".price-table",
      ".appointment-layout > *",
      ".faq-list details",
      ".contact-info article",
      ".contact-layout > .form-card",
      ".map-panel",
      ".footer-main",
      ".footer-trust article",
      ".footer-bottom",
    ].join(", ")
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.08,
    }
  );

  revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
    revealObserver.observe(item);
  });
}

const appointmentDate = document.querySelector("#appointment-date");
const today = new Date().toISOString().slice(0, 10);

if (appointmentDate) {
  appointmentDate.min = today;
}

function bindForm(formSelector, statusSelector, successMessage) {
  const form = document.querySelector(formSelector);
  const status = document.querySelector(statusSelector);

  if (!form || !status) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.classList.add("was-submitted");

    if (!form.checkValidity()) {
      status.textContent = "Merci de compléter les champs obligatoires.";
      status.className = "form-status error";
      form.reportValidity();
      return;
    }

    status.textContent = successMessage;
    status.className = "form-status success";
    form.reset();
    form.classList.remove("was-submitted");

    if (appointmentDate) {
      appointmentDate.min = today;
    }
  });
}

bindForm(
  "#appointment-form",
  "#appointment-status",
  "Demande envoyée. Le cabinet vous rappelle pour confirmer le créneau."
);

bindForm(
  "#contact-form",
  "#contact-status",
  "Message prêt à être transmis. Merci, nous revenons vers vous rapidement."
);

(() => {
  const body = document.body;
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const menuClose = document.querySelector("[data-menu-close]");

  const setHeaderState = () => {
    if (!header) return;
    const addClass = window.scrollY > 40;
    header.classList.toggle("is-scrolled", addClass);
  };

  const closeMobileMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.hidden = true;
    body.classList.remove("menu-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  };

  const openMobileMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.hidden = false;
    body.classList.add("menu-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
    }
  };

  window.addEventListener("scroll", setHeaderState, { passive: true });
  window.addEventListener("load", setHeaderState);
  document.addEventListener("DOMContentLoaded", setHeaderState);

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      if (mobileMenu.hidden) {
        openMobileMenu();
      } else {
        closeMobileMenu();
      }
    });
  }

  if (menuClose) {
    menuClose.addEventListener("click", closeMobileMenu);
  }

  if (mobileMenu) {
    mobileMenu.addEventListener("click", (event) => {
      if (event.target === mobileMenu) {
        closeMobileMenu();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  const smoothScroll = (id) => {
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    closeMobileMenu();
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  document.querySelectorAll("[data-scroll]").forEach((element) => {
    element.addEventListener("click", (event) => {
      const id = element.getAttribute("data-scroll");
      if (!id) return;
      const tagName = element.tagName.toLowerCase();
      if (tagName === "a") {
        event.preventDefault();
      }
      smoothScroll(id);
    });
  });

  const setupBeforeAfter = (container) => {
    const beforeWrapper = container.querySelector(".before-after__before");
    const divider = container.querySelector(".before-after__divider");
    const labelBefore = container.querySelector(".before-after__label--before");
    const labelAfter = container.querySelector(".before-after__label--after");
    const category = container.querySelector(".before-after__category");

    if (!beforeWrapper || !divider) return;

    const beforeLabel = container.dataset.beforeLabel || "Vorher";
    const afterLabel = container.dataset.afterLabel || "Nachher";
    const categoryLabel = container.dataset.category || "";

    if (labelBefore) labelBefore.textContent = beforeLabel;
    if (labelAfter) labelAfter.textContent = afterLabel;
    if (category) category.textContent = categoryLabel;

    let isDragging = false;
    let position = 50;
    let activePointerId = null;

    const updatePosition = (clientX) => {
      const rect = container.getBoundingClientRect();
      const offset = ((clientX - rect.left) / rect.width) * 100;
      position = Math.max(0, Math.min(100, offset));
      container.style.setProperty("--position", `${position}%`);
      divider.setAttribute("aria-valuenow", Math.round(position).toString());
    };

    const startDrag = (event) => {
      isDragging = true;
      updatePosition(event.clientX ?? event.touches?.[0]?.clientX ?? 0);
      divider.classList.add("is-active");
      divider.focus();
    };

    const endDrag = () => {
      isDragging = false;
      divider.classList.remove("is-active");
      if (
        activePointerId !== null &&
        divider.hasPointerCapture?.(activePointerId)
      ) {
        try {
          divider.releasePointerCapture(activePointerId);
        } catch {
          /* ignore release errors */
        }
        activePointerId = null;
      }
    };

    const handlePointerMove = (event) => {
      if (!isDragging) return;
      const clientX = event.clientX ?? event.touches?.[0]?.clientX ?? 0;
      updatePosition(clientX);
    };

    divider.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      try {
        divider.setPointerCapture(event.pointerId);
      } catch {
        /* ignore capture errors */
      }
      activePointerId = event.pointerId;
      startDrag(event);
    });

    divider.addEventListener("pointermove", handlePointerMove);
    divider.addEventListener("pointerup", endDrag);
    divider.addEventListener("pointercancel", endDrag);

    divider.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        const delta = event.key === "ArrowLeft" ? -5 : 5;
        position = Math.max(0, Math.min(100, position + delta));
        container.style.setProperty("--position", `${position}%`);
        divider.setAttribute("aria-valuenow", Math.round(position).toString());
      }
    });

    container.addEventListener("pointerdown", (event) => {
      if (event.target === divider) return;
      startDrag(event);
    });

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerup", endDrag);
    container.addEventListener("pointerleave", endDrag);
  };

  document.querySelectorAll(".before-after").forEach(setupBeforeAfter);

  const calculatorForm = document.querySelector("[data-calculator]");
  if (calculatorForm) {
    const feedback = calculatorForm.querySelector("[data-calculator-feedback]");
    const resultBox = calculatorForm.querySelector("[data-calculator-result]");
    const valuePlaceholder = calculatorForm.querySelector("[data-calculator-value]");

    const serviceCosts = {
      painting: 25,
      flooring: 40,
      bathroom: 80,
      kitchen: 90,
      drywall: 35,
      electrical: 50,
    };

    const scopeMultipliers = {
      small: 0.7,
      partial: 1.0,
      full: 1.4,
    };

    const timelineMultipliers = {
      flexible: 0.9,
      normal: 1.0,
      urgent: 1.3,
    };

    calculatorForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(calculatorForm);
      const services = formData.getAll("services");
      const area = parseFloat(formData.get("area"));
      const scope = formData.get("scope");
      const timeline = formData.get("timeline");

      if (!services.length || Number.isNaN(area) || !scope || !timeline) {
        feedback.textContent = "Bitte füllen Sie alle Felder aus.";
        feedback.classList.add("is-error");
        feedback.classList.remove("is-success");
        resultBox.hidden = true;
        return;
      }

      const baseCost = services.reduce(
        (total, serviceId) => total + (serviceCosts[serviceId] || 0),
        0,
      );

      if (!baseCost) {
        feedback.textContent =
          "Bitte wählen Sie mindestens eine Leistung für die Berechnung aus.";
        feedback.classList.add("is-error");
        feedback.classList.remove("is-success");
        resultBox.hidden = true;
        return;
      }

      const estimate = Math.round(
        baseCost *
          area *
          (scopeMultipliers[scope] || 1) *
          (timelineMultipliers[timeline] || 1),
      );

      feedback.textContent = "Berechnung erfolgreich durchgeführt.";
      feedback.classList.remove("is-error");
      feedback.classList.add("is-success");

      if (valuePlaceholder) {
        valuePlaceholder.textContent = `${new Intl.NumberFormat("de-DE").format(
          estimate,
        )} €`;
      }

      if (resultBox) {
        resultBox.hidden = false;
      }
    });
  }

  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    const feedback = contactForm.querySelector("[data-contact-feedback]");
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        if (feedback) {
          feedback.textContent = "Bitte füllen Sie alle Pflichtfelder korrekt aus.";
          feedback.classList.add("is-error");
          feedback.classList.remove("is-success");
        }
        return;
      }

      const formData = new FormData(contactForm);
      const fields = ["name", "email", "phone", "service", "message"];
      const missing = fields.some((field) => {
        const value = (formData.get(field) || "").toString().trim();
        return value.length === 0;
      });

      if (missing) {
        if (feedback) {
          feedback.textContent = "Bitte füllen Sie alle Pflichtfelder aus.";
          feedback.classList.add("is-error");
          feedback.classList.remove("is-success");
        }
        return;
      }

      contactForm.reset();
      if (feedback) {
        feedback.textContent =
          "Vielen Dank für Ihre Anfrage! Wir melden uns in Kürze bei Ihnen.";
        feedback.classList.remove("is-error");
        feedback.classList.add("is-success");
      }
    });
  }

  const newsletterForm = document.querySelector("[data-newsletter]");
  if (newsletterForm) {
    const feedback = document.querySelector("[data-newsletter-feedback]");
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!newsletterForm.checkValidity()) {
        newsletterForm.reportValidity();
        if (feedback) {
          feedback.textContent = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
          feedback.classList.add("is-error");
          feedback.classList.remove("is-success");
        }
        return;
      }
      const formData = new FormData(newsletterForm);
      const email = (formData.get("email") || "").toString().trim();

      if (!email) {
        if (feedback) {
          feedback.textContent = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
          feedback.classList.add("is-error");
          feedback.classList.remove("is-success");
        }
        return;
      }

      newsletterForm.reset();
      if (feedback) {
        feedback.textContent = "Vielen Dank! Sie erhalten in Kürze eine Bestätigung.";
        feedback.classList.remove("is-error");
        feedback.classList.add("is-success");
      }
    });
  }
})();

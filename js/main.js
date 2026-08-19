/* ============================================================
   Crucible Consulting — progressive enhancement
   Nothing here is required for content, navigation, or the
   contact route to work. With JavaScript disabled, every
   element is visible and every link still functions.
   ============================================================ */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---- 1. Scroll-reveal -------------------------------------
     Elements carry the .reveal class. They are only hidden when
     <html> has .js-enabled (set inline in the head). Here we add
     .is-visible as they enter the viewport, with a light stagger
     handled in CSS via [data-delay]. */
  function initReveal() {
    var revealEls = Array.prototype.slice.call(
      document.querySelectorAll(".reveal")
    );
    if (!revealEls.length) return;

    // If reduced motion or no observer support, show immediately.
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---- 2. Header scrolled state ----------------------------- */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var ticking = false;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }

  /* ---- 3. Mobile navigation --------------------------------- */
  function initNav() {
    var nav = document.querySelector(".nav");
    var toggle = document.querySelector(".nav__toggle");
    if (!nav || !toggle) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute(
        "aria-label",
        open ? "Close menu" : "Open menu"
      );
    }

    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    // Close on link activation.
    nav.querySelectorAll(".nav__links a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });

    // Close on Escape and return focus to the toggle.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Close on outside click.
    document.addEventListener("click", function (e) {
      if (
        nav.classList.contains("is-open") &&
        !nav.contains(e.target)
      ) {
        setOpen(false);
      }
    });

    // Reset when leaving mobile width.
    window.matchMedia("(min-width: 861px)").addEventListener("change", function (m) {
      if (m.matches) setOpen(false);
    });
  }

  /* ---- 4. Contact form -------------------------------------
     The form posts to a form service endpoint configured in the
     markup (Web3Forms). With JavaScript disabled it submits
     normally and the service shows its own confirmation page.
     This enhancement posts it in the background instead, so the
     visitor stays on the page and gets an inline status message.
     If the endpoint is missing or the request fails, it composes
     a pre-filled email, so a submit is never silently lost. */
  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;

    var status = form.querySelector(".form__status");
    var button = form.querySelector("button[type='submit']");
    var endpoint = form.getAttribute("action") || "";
    var to = form.getAttribute("data-mailto") || "tom@crucible.consulting";
    var isPlaceholder =
      endpoint === "" || endpoint.indexOf("YOUR_FORM_ID") !== -1;
    var canPostInBackground =
      "fetch" in window && "FormData" in window && "Promise" in window;

    function setStatus(text, state) {
      if (!status) return;
      status.textContent = text;
      status.classList.toggle("form__status--ok", state === "ok");
      status.classList.toggle("form__status--error", state === "error");
    }

    function mailtoFallback(note) {
      var name = (form.querySelector("#name") || {}).value || "";
      var email = (form.querySelector("#email") || {}).value || "";
      var message = (form.querySelector("#message") || {}).value || "";

      var subject = "Enquiry via crucible.consulting";
      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n\n" +
        message;

      var href =
        "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = href;
      setStatus(
        (note || "Opening your email app.") +
          " If nothing happens, write to " + to + ".",
        "error"
      );
    }

    form.addEventListener("submit", function (e) {
      // No endpoint configured: compose an email instead of posting.
      if (isPlaceholder) {
        e.preventDefault();
        mailtoFallback();
        return;
      }

      // Older browser: let it post normally to the endpoint.
      if (!canPostInBackground) return;

      e.preventDefault();
      if (button) button.disabled = true;
      setStatus("Sending your message.", null);

      fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      })
        .then(function (res) {
          return res.json().catch(function () { return { success: res.ok }; });
        })
        .then(function (result) {
          if (result && result.success) {
            form.reset();
            setStatus(
              "Thank you. Your message has been sent, and Tom will reply personally.",
              "ok"
            );
          } else {
            mailtoFallback("That did not send.");
          }
        })
        .catch(function () {
          mailtoFallback("That did not send.");
        })
        .then(function () {
          if (button) button.disabled = false;
        });
    });
  }

  /* ---- init ------------------------------------------------- */
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    initReveal();
    initHeader();
    initNav();
    initContactForm();
  });
})();

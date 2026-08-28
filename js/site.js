/* ============================================================================
   MerriMade — behaviour
   Reads the content in data.js and renders it. Every page loads this file;
   each renderer looks for its target element and quietly does nothing if the
   current page doesn't have one.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------- helpers */

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /** Escape a content string before it goes into innerHTML. */
  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /** "$8" — or the unit line alone when a product is priced on request. */
  function money(value) {
    if (value === null || value === undefined) return "On request";
    return "$" + (Number.isInteger(value) ? value : value.toFixed(2));
  }

  /* Candy pastels for the placeholder tiles — pink, magenta, lilac, sky,
     mint, butter, caramel. A tray of them looks like a tray of cake pops. */
  const TILE_HUES = [338, 316, 275, 202, 162, 46, 22];

  /** Stable hue per product, so tiles differ run-to-run but never clash. */
  function hueFor(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) % 997;
    return TILE_HUES[hash % TILE_HUES.length];
  }

  function initials(name) {
    return name
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0] || "")
      .join("")
      .toUpperCase();
  }

  /** Rough, friendly relative date — "3 weeks ago", "last year". */
  function timeAgo(isoDate) {
    const then = new Date(isoDate + "T12:00:00");
    if (Number.isNaN(then.getTime())) return "";
    const days = Math.round((Date.now() - then.getTime()) / 86400000);
    if (days < 1) return "today";
    if (days < 7) return days + (days === 1 ? " day ago" : " days ago");
    if (days < 31) {
      const w = Math.round(days / 7);
      return w + (w === 1 ? " week ago" : " weeks ago");
    }
    if (days < 365) {
      const m = Math.max(1, Math.round(days / 30));
      return m + (m === 1 ? " month ago" : " months ago");
    }
    const y = Math.round(days / 365);
    return y <= 1 ? "last year" : y + " years ago";
  }

  const STAR_PATH =
    "M12 2.5l2.9 5.88 6.6.96-4.75 4.63 1.12 6.53L12 17.4l-5.87 3.1 1.12-6.53" +
    "L2.5 9.34l6.6-.96z";

  /** Row of five stars, `filled` of them coloured. */
  function starsHTML(filled, size) {
    let out = '<span class="stars' + (size === "lg" ? " stars--lg" : "") + '" aria-hidden="true">';
    for (let i = 1; i <= 5; i++) {
      out +=
        '<svg viewBox="0 0 24 24" fill="currentColor"' +
        (i <= filled ? "" : ' class="star--empty"') +
        '><path d="' + STAR_PATH + '"/></svg>';
    }
    return out + "</span>";
  }

  /** A real photo if the product has one, otherwise a generated tile. */
  function tileHTML(item, alt) {
    if (item.image) {
      return (
        '<div class="tile"><img src="images/' + esc(item.image) +
        '" alt="' + esc(alt) + '" loading="lazy" decoding="async"></div>'
      );
    }
    return (
      '<div class="tile tile--placeholder" style="--hue:' + hueFor(item.id || item.name) +
      '" role="img" aria-label="' + esc(alt) + '">' +
      '<span class="tile__initial" aria-hidden="true">' + esc(item.name[0]) + "</span></div>"
    );
  }

  const STATUS_LABEL = {
    available: "Taking orders",
    preorder: "Made to order",
    "sold-out": "Out of season"
  };

  const productById = (id) => PRODUCTS.find((p) => p.id === id);

  /* --------------------------------------------------------- product cards */

  function productCardHTML(p) {
    const tags = (p.tags || [])
      .map((t) => '<span class="badge">' + esc(t) + "</span>")
      .join("");

    return (
      '<article class="card" data-status="' + esc(p.status) + '" id="' + esc(p.id) + '">' +
        tileHTML(p, p.name) +
        '<div class="card__body">' +
          '<div class="card__head">' +
            "<h3>" + esc(p.name) + "</h3>" +
            '<span class="card__price">' + esc(money(p.price)) + "</span>" +
          "</div>" +
          '<p class="card__unit">' + esc(p.unit) + "</p>" +
          '<p class="card__blurb">' + esc(p.blurb) + "</p>" +
          (tags ? '<div class="badges">' + tags + "</div>" : "") +
          '<p class="status status--' + esc(p.status) + '">' +
            esc(STATUS_LABEL[p.status] || p.status) +
          "</p>" +
        "</div>" +
      "</article>"
    );
  }

  /** Home page: the handful of products flagged `featured`. */
  function renderFeatured() {
    const target = $("#featured-grid");
    if (!target) return;
    target.innerHTML = PRODUCTS.filter((p) => p.featured).map(productCardHTML).join("");
  }

  /** Products page: full grid, category chips, live text search, URL sync. */
  function renderProductsPage() {
    const grid = $("#product-grid");
    if (!grid) return;

    const chipBar  = $("#category-chips");
    const searchEl = $("#product-search");
    const countEl  = $("#result-count");

    const params = new URLSearchParams(location.search);
    let activeCategory = params.get("category") || "all";
    if (activeCategory !== "all" && !CATEGORIES.some((c) => c.id === activeCategory)) {
      activeCategory = "all";
    }
    let query = "";

    if (chipBar) {
      chipBar.innerHTML = [{ id: "all", label: "Everything" }, ...CATEGORIES]
        .map(
          (c) =>
            '<button type="button" class="chip" data-category="' + esc(c.id) +
            '" aria-pressed="false">' + esc(c.label) + "</button>"
        )
        .join("");

      chipBar.addEventListener("click", (e) => {
        const btn = e.target.closest(".chip");
        if (!btn) return;
        activeCategory = btn.dataset.category;
        const url = new URL(location.href);
        if (activeCategory === "all") url.searchParams.delete("category");
        else url.searchParams.set("category", activeCategory);
        history.replaceState(null, "", url);
        paint();
      });
    }

    if (searchEl) {
      searchEl.addEventListener("input", () => {
        query = searchEl.value.trim().toLowerCase();
        paint();
      });
    }

    function matches(p) {
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      if (!query) return true;
      const haystack = [p.name, p.blurb, p.unit, ...(p.tags || [])].join(" ").toLowerCase();
      return haystack.includes(query);
    }

    function paint() {
      $$(".chip", chipBar).forEach((btn) => {
        btn.setAttribute("aria-pressed", String(btn.dataset.category === activeCategory));
      });

      const found = PRODUCTS.filter(matches);

      grid.innerHTML = found.length
        ? found.map(productCardHTML).join("")
        : "";

      const empty = $("#product-empty");
      if (empty) empty.hidden = found.length > 0;

      if (countEl) {
        countEl.textContent =
          found.length === PRODUCTS.length
            ? PRODUCTS.length + " treats"
            : found.length + (found.length === 1 ? " treat" : " treats") + " of " + PRODUCTS.length;
      }
    }

    paint();
  }

  /* ---------------------------------------------------------------- reviews */

  function reviewCardHTML(r) {
    const p = r.product ? productById(r.product) : null;
    return (
      '<article class="review">' +
        starsHTML(r.rating) +
        '<span class="sr-only">' + r.rating + " out of 5 stars</span>" +
        '<p class="review__text">' + esc(r.text) + "</p>" +
        (p
          ? '<p class="review__product">On <a href="products.html#' + esc(p.id) + '">' +
            esc(p.name) + "</a></p>"
          : "") +
        '<div class="review__foot">' +
          '<span class="avatar" aria-hidden="true">' + esc(initials(r.name)) + "</span>" +
          '<span class="review__who">' +
            '<span class="review__name">' + esc(r.name) + "</span>" +
            '<span class="review__when">' +
              esc(r.location ? r.location + " · " : "") + esc(timeAgo(r.date)) +
            "</span>" +
          "</span>" +
        "</div>" +
      "</article>"
    );
  }

  function sortedReviews() {
    return REVIEWS.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  function renderReviews() {
    const all = sortedReviews();

    const strip = $("#review-strip");
    if (strip) strip.innerHTML = all.slice(0, 4).map(reviewCardHTML).join("");

    const full = $("#review-grid");
    if (full) full.innerHTML = all.map(reviewCardHTML).join("");
  }

  function renderRatingSummary() {
    const box = $("#rating-summary");
    if (!box || !REVIEWS.length) return;

    const total = REVIEWS.reduce((sum, r) => sum + r.rating, 0);
    const avg = total / REVIEWS.length;
    const fiveStar = REVIEWS.filter((r) => r.rating === 5).length;

    box.innerHTML =
      '<span class="rating-summary__score">' + avg.toFixed(1) + "</span>" +
      "<div>" +
        starsHTML(Math.round(avg), "lg") +
        '<p class="rating-summary__meta">' +
          "Average of " + REVIEWS.length + " reviews · " +
          fiveStar + " of them five stars" +
        "</p>" +
      "</div>";
  }

  /* Small stat used on the home page hero ("4.9 from 8 reviews"). */
  function renderHeroProof() {
    const el = $("#hero-rating");
    if (!el || !REVIEWS.length) return;
    const avg = REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length;
    el.innerHTML =
      starsHTML(Math.round(avg)) +
      "<span>" + avg.toFixed(1) + " from " + REVIEWS.length + " reviews</span>";
    el.style.display = "inline-flex";
    el.style.alignItems = "center";
    el.style.gap = "0.5rem";
  }

  /* ------------------------------------------------------------ review form */

  /* A static site can't store submissions, so the form composes an email in
     the visitor's own mail app. Honest, zero-infrastructure, and the baker
     gets the review in a place they already check. */
  function initReviewForm() {
    const form = $("#review-form");
    if (!form) return;

    const ratingBox = $(".rating-input", form);
    if (ratingBox) {
      form.addEventListener("change", (e) => {
        if (e.target.name === "rating") ratingBox.dataset.value = e.target.value;
      });
    }

    const select = $("#review-product", form);
    if (select) {
      select.innerHTML =
        '<option value="">Not about one thing in particular</option>' +
        PRODUCTS.map((p) => '<option value="' + esc(p.name) + '">' + esc(p.name) + "</option>").join("");
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const rating = data.get("rating");
      const body = [
        "Name: " + (data.get("name") || ""),
        "Town: " + (data.get("location") || ""),
        "Rating: " + (rating ? rating + "/5" : "not given"),
        "Treat: " + (data.get("product") || "not specified"),
        "",
        data.get("text") || ""
      ].join("\n");

      window.location.href =
        "mailto:" + SITE.email +
        "?subject=" + encodeURIComponent("Review for " + SITE.name) +
        "&body=" + encodeURIComponent(body);

      const done = $("#review-form-done");
      if (done) done.hidden = false;
    });
  }

  /* ----------------------------------------------------------- site chrome */

  function initHeader() {
    const header = $(".site-header");
    const nav = $("#primary-nav");
    const toggle = $(".nav-toggle");

    if (header) {
      const onScroll = () => header.setAttribute("data-stuck", String(window.scrollY > 8));
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (nav && toggle) {
      const setOpen = (open) => {
        nav.dataset.open = String(open);
        toggle.setAttribute("aria-expanded", String(open));
      };
      setOpen(false);

      toggle.addEventListener("click", () => setOpen(nav.dataset.open !== "true"));
      nav.addEventListener("click", (e) => {
        if (e.target.closest("a")) setOpen(false);
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && nav.dataset.open === "true") {
          setOpen(false);
          toggle.focus();
        }
      });
      // A resize past the breakpoint should never leave a stale open state.
      window.addEventListener("resize", () => {
        if (window.innerWidth > 820) setOpen(false);
      });
    }

    // Mark the current page in the nav.
    const here = location.pathname.split("/").pop() || "index.html";
    $$("#primary-nav a[href]").forEach((a) => {
      const target = a.getAttribute("href").split("#")[0];
      if (target && target === here) a.setAttribute("aria-current", "page");
    });
  }

  function initFooterContact() {
    $$("[data-site-email]").forEach((el) => {
      el.textContent = SITE.email;
      if (el.tagName === "A") el.href = "mailto:" + SITE.email;
    });
    $$("[data-site-phone]").forEach((el) => {
      el.textContent = SITE.phone;
      if (el.tagName === "A") el.href = "tel:" + SITE.phone.replace(/[^\d+]/g, "");
    });
    $$("[data-site-year]").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* Several pages show the hours in more than one place (footer + contact
     block), so this is an attribute rather than an id. */
  function renderHours() {
    const markup = SITE.hours
      .map((h) => "<div><dt>" + esc(h.day) + "</dt><dd>" + esc(h.time) + "</dd></div>")
      .join("");
    $$("[data-hours]").forEach((list) => { list.innerHTML = markup; });
  }

  function initReveal() {
    const items = $$("[data-reveal]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    items.forEach((el) => io.observe(el));
  }

  /* ------------------------------------------------------------------ boot */

  function boot() {
    initHeader();
    initFooterContact();
    renderHours();
    renderFeatured();
    renderProductsPage();
    renderReviews();
    renderRatingSummary();
    renderHeroProof();
    initReviewForm();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

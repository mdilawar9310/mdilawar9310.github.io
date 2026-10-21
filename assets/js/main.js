(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var PLAY_URL = "https://play.google.com/store/apps/details?id=";
  var apps = window.APPS || [];

  // ---- Footer year ----
  document.getElementById("year").textContent = new Date().getFullYear();

  // ---- Theme toggle ----
  var root = document.documentElement;
  var themeBtn = document.querySelector(".theme-toggle");
  function applyThemeLabel() {
    var dark = root.getAttribute("data-theme") !== "light";
    themeBtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    document.querySelector('meta[name="theme-color"]').setAttribute("content", dark ? "#0d0f14" : "#f7f6f2");
  }
  try {
    if (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: light)").matches) {
      root.setAttribute("data-theme", "light");
    }
  } catch (e) {}
  applyThemeLabel();
  themeBtn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    applyThemeLabel();
  });

  // ---- Mobile nav ----
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.getElementById("nav-links");
  function closeNav() {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }
  navToggle.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  navLinks.addEventListener("click", function (e) { if (e.target.tagName === "A") closeNav(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });

  // ---- Header border on scroll ----
  var header = document.querySelector(".site-header");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Render app cards ----
  var grid = document.getElementById("apps-grid");
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    for (var k in attrs) {
      if (k === "text") n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    (children || []).forEach(function (c) { n.appendChild(c); });
    return n;
  }
  apps.forEach(function (app, appIndex) {
    var base = "assets/apps/" + app.slug + "/";
    var shots = [];
    for (var i = 1; i <= app.shots; i++) {
      var btn = el("button", {
        type: "button", "class": "shot-btn",
        "data-app": appIndex, "data-shot": i - 1,
        "aria-label": "Enlarge " + app.name + " screenshot " + i
      }, [el("img", {
        src: base + "shot-" + i + ".webp", loading: "lazy", decoding: "async",
        width: "300", height: "567", alt: app.name + " screenshot " + i
      })]);
      shots.push(btn);
    }
    var labels = [el("span", { "class": "tag", text: app.tag })];
    if (app.stat) labels.unshift(el("span", { "class": "stat-badge", text: app.stat }));
    var body = [
      el("div", { "class": "app-top" }, [
        el("img", { "class": "app-icon", src: base + "icon.webp", width: "64", height: "64", loading: "lazy", alt: app.name + " app icon" }),
        el("div", {}, [el("h3", { text: app.name }), el("div", { "class": "app-labels" }, labels)])
      ]),
      el("p", { "class": "app-desc", text: app.description })
    ];
    if (app.meta) body.push(el("p", { "class": "app-meta", text: app.meta }));
    if (app.tags) {
      body.push(el("ul", { "class": "app-tags", "aria-label": "Tags" },
        app.tags.map(function (t) { return el("li", { text: t }); })));
    }
    body.push(el("div", { "class": "app-shots" }, shots));
    var card = el("article", { "class": "app-card reveal" + (app.featured ? " is-featured" : ""), "data-type": app.type }, body.concat([
      el("a", {
        "class": "play-link", href: PLAY_URL + app.package, target: "_blank", rel: "noopener",
        "aria-label": "Get " + app.name + " on Google Play"
      }, [el("img", { src: "assets/img/google-play-badge.png", width: "150", height: "58", alt: "Get it on Google Play", loading: "lazy" })])
    ]));
    grid.appendChild(card);
  });

  // ---- Filters ----
  var filters = document.querySelectorAll(".filter");
  filters.forEach(function (f) {
    f.addEventListener("click", function () {
      var type = f.getAttribute("data-filter");
      filters.forEach(function (o) {
        var on = o === f;
        o.classList.toggle("is-active", on);
        o.setAttribute("aria-pressed", String(on));
      });
      grid.querySelectorAll(".app-card").forEach(function (c) {
        c.hidden = !(type === "all" || c.getAttribute("data-type") === type);
        c.classList.add("visible");
      });
    });
  });

  // ---- Lightbox ----
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lb-img");
  var lbCap = document.getElementById("lb-caption");
  var current = { app: 0, shot: 0 }, lastFocus = null;

  function showShot() {
    var app = apps[current.app];
    lbImg.src = "assets/apps/" + app.slug + "/shot-" + (current.shot + 1) + ".webp";
    lbImg.alt = app.name + " screenshot " + (current.shot + 1);
    lbCap.textContent = app.name + " · " + (current.shot + 1) + " / " + app.shots;
  }
  function openLb(appIdx, shotIdx) {
    current = { app: appIdx, shot: shotIdx };
    lastFocus = document.activeElement;
    showShot();
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lb.querySelector(".lb-close").focus();
  }
  function closeLb() {
    lb.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  function step(d) {
    var n = apps[current.app].shots;
    current.shot = (current.shot + d + n) % n;
    showShot();
  }
  grid.addEventListener("click", function (e) {
    var b = e.target.closest(".shot-btn");
    if (b) openLb(+b.getAttribute("data-app"), +b.getAttribute("data-shot"));
  });
  lb.querySelector(".lb-close").addEventListener("click", closeLb);
  lb.querySelector(".lb-prev").addEventListener("click", function () { step(-1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { step(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "Tab") {
      var f = lb.querySelectorAll("button");
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // ---- Active nav link ----
  var links = navLinks.querySelectorAll("a");
  var sections = Array.prototype.map.call(links, function (a) { return document.querySelector(a.getAttribute("href")); });

  // ---- Reveal on scroll + nav highlight ----
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (r) { io.observe(r); });

    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { if (s) navIo.observe(s); });
  } else {
    reveals.forEach(function (r) { r.classList.add("visible"); });
  }
})();

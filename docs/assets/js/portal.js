(function () {
  "use strict";

  var body = document.body;
  var navRoot = body.getAttribute("data-nav-root") || "";
  var DESKTOP_NAV_MQ = window.matchMedia("(min-width: 1024px)");
  var MOBILE_NAV_MQ = window.matchMedia("(max-width: 1023px)");

  var TOGGLE_HTML =
    '<span class="portal-nav-toggle__bars" aria-hidden="true"><span></span><span></span><span></span></span>' +
    '<span class="portal-nav-toggle__label">Menu</span>';

  var PAGE_TO_NAV = {
    "index.html": "index.html",
    "modalidades.html": "modalidades.html",
    "produto.html": "produto.html",
    "mercado.html": "mercado.html",
    "download.html": "download.html",
    "primeiros-passos.html": "download.html",
    "demonstracao.html": "demonstracao.html",
    "transparencia.html": "transparencia.html",
    "comparacao.html": "comparacao.html",
    "rust-tauri.html": "wiki/index.html",
    "wiki/index.html": "wiki/index.html",
    "wiki/projeto-pdv.html": "wiki/index.html"
  };
  // Não há mais duplicatas no nav — PAGE_TO_NAV_LABEL removido.

  function currentFile() {
    var path = window.location.pathname || "";
    var parts = path.split("/").filter(function (p) { return p.length > 0; });
    var file = parts.length ? parts[parts.length - 1] : "";
    if (!file || file.indexOf(".html") === -1) {
      return "index.html";
    }
    if (parts.length >= 2 && parts[parts.length - 2] === "wiki") {
      return "wiki/" + file;
    }
    return file;
  }

  function resolveHref(href) {
    if (!href || href.charAt(0) === "#") return href;
    if (/^https?:/i.test(href)) return href;
    if (href.indexOf("..") === 0 || href.indexOf("/") !== -1) {
      return href;
    }
    if (!navRoot) return href;
    return navRoot + href;
  }

  function navLinkKey(href) {
    if (!href || href.charAt(0) === "#" || /^https?:/i.test(href)) return null;
    var path = href.split("#")[0];
    if (path.indexOf("./") === 0) {
      path = path.slice(2);
    }
    if (navRoot && path.indexOf(navRoot) === 0) {
      path = path.slice(navRoot.length);
    }
    if (!path || path === "./") return "index.html";
    return path;
  }

  function setActiveNav() {
    var file = currentFile();
    var activeHref = PAGE_TO_NAV[file];
    if (!activeHref) return;

    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".portal-nav a[href]"));
    navLinks.forEach(function (link) {
      link.removeAttribute("aria-current");
    });

    var activeAssigned = false;
    navLinks.forEach(function (link) {
      var key = navLinkKey(link.getAttribute("href") || "");
      if (!key) {
        return;
      }
      if (!activeAssigned && key === activeHref) {
        link.setAttribute("aria-current", "page");
        activeAssigned = true;
      }
    });
  }

  function enhanceNavLinks() {
    document.querySelectorAll(".portal-nav a[href]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (href && href.charAt(0) !== "#" && !/^https?:/i.test(href)) {
        link.setAttribute("href", resolveHref(href));
      }
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href").slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  function closeMobileNav(nav, inner, btn) {
    inner.classList.remove("portal-nav-inner--open");
    if (btn) {
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Abrir menu de navegação");
      var label = btn.querySelector(".portal-nav-toggle__label");
      if (label) label.textContent = "Menu";
    }
    body.classList.remove("portal-nav-open");
  }

  function openMobileNav(inner, btn) {
    inner.classList.add("portal-nav-inner--open");
    if (btn) {
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Fechar menu de navegação");
      var label = btn.querySelector(".portal-nav-toggle__label");
      if (label) label.textContent = "Fechar";
    }
    body.classList.add("portal-nav-open");
  }

  function ensureMobileNavToggle(nav, inner) {
    var btn = nav.querySelector(".portal-nav-toggle");
    if (!btn) {
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = "portal-nav-toggle";
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Abrir menu de navegação");
      btn.innerHTML = TOGGLE_HTML;
      nav.insertBefore(btn, inner);
    } else if (!btn.querySelector(".portal-nav-toggle__bars")) {
      btn.innerHTML = TOGGLE_HTML;
    }

    if (!inner.id) inner.id = "portal-nav-links";
    btn.setAttribute("aria-controls", "portal-nav-links");
    return btn;
  }

  function initMobileNavToggle() {
    var nav = document.querySelector(".portal-nav");
    if (!nav) return;

    var inner = nav.querySelector(".portal-nav-inner");
    if (!inner) return;

    var btn = ensureMobileNavToggle(nav, inner);

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (inner.classList.contains("portal-nav-inner--open")) {
        closeMobileNav(nav, inner, btn);
      } else {
        openMobileNav(inner, btn);
      }
    });

    inner.querySelectorAll('a[href]:not([href^="#"])').forEach(function (link) {
      link.addEventListener("click", function () {
        closeMobileNav(nav, inner, btn);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMobileNav(nav, inner, btn);
    });

    body.addEventListener("click", function (e) {
      if (!body.classList.contains("portal-nav-open")) return;
      if (nav.contains(e.target)) return;
      closeMobileNav(nav, inner, btn);
    });

    MOBILE_NAV_MQ.addEventListener("change", function (e) {
      if (!e.matches) closeMobileNav(nav, inner, btn);
    });
    DESKTOP_NAV_MQ.addEventListener("change", function () {
      closeMobileNav(nav, inner, btn);
    });

    closeMobileNav(nav, inner, btn);
  }

  function enhanceExternalLinks() {
    document.querySelectorAll('a[href^="http://"], a[href^="https://"]').forEach(function (link) {
      var rel = (link.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
      if (rel.indexOf("noopener") === -1) rel.push("noopener");
      if (rel.indexOf("noreferrer") === -1) rel.push("noreferrer");
      link.setAttribute("rel", rel.join(" "));
    });
  }

  function wireOfficialDownloads() {
    var root = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : {};
    var R = root.CaraCoreRustReleases;
    var url = (R && R.RELEASES_LATEST) || "https://github.com/chmulato/caracore-pdv-releases/releases/latest";
    document.querySelectorAll("[data-official-download]").forEach(function (link) {
      link.href = url;
      link.setAttribute("rel", "noopener noreferrer");
      link.setAttribute("target", "_blank");
    });
  }

  enhanceNavLinks();
  enhanceExternalLinks();
  wireOfficialDownloads();
  setActiveNav();
  initSmoothScroll();
  initMobileNavToggle();
})();

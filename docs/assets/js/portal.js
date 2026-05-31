(function () {
  "use strict";

  var body = document.body;
  var navRoot = body.getAttribute("data-nav-root") || "";
  var DESKTOP_NAV_MQ = window.matchMedia("(min-width: 1024px)");

  var PAGE_TO_NAV = {
    "index.html": "index.html",
    "produto.html": "produto.html",
    "mercado.html": "mercado.html",
    "download.html": "download.html",
    "primeiros-passos.html": "download.html",
    "transparencia.html": "transparencia.html",
    "wiki/index.html": "wiki/index.html",
    "wiki/projeto-pdv.html": "wiki/index.html"
  };

  function currentFile() {
    var path = window.location.pathname || "";
    var parts = path.split("/").filter(function (p) { return p.length > 0; });
    var file = parts.length ? parts[parts.length - 1] : "";
    if (!file || file.indexOf(".html") === -1) {
      return "index.html";
    }
    return file;
  }

  function resolveHref(href) {
    if (!href || href.charAt(0) === "#") return href;
    if (/^https?:/i.test(href)) return href;
    if (!navRoot || href.indexOf("..") === 0 || href.indexOf("/") !== -1) {
      return href;
    }
    return navRoot + href;
  }

  function setActiveNav() {
    var file = currentFile();
    var activeHref = PAGE_TO_NAV[file];
    if (!activeHref) return;

    document.querySelectorAll(".portal-nav a[href]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) === "#") return;
      var name = href.split("/").pop().split("#")[0];
      if (name === activeHref) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
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
      btn.textContent = "Menu";
    }
    body.classList.remove("portal-nav-open");
  }

  function openMobileNav(inner, btn) {
    inner.classList.add("portal-nav-inner--open");
    if (btn) {
      btn.setAttribute("aria-expanded", "true");
      btn.textContent = "Fechar";
    }
    body.classList.add("portal-nav-open");
  }

  function initMobileNavToggle() {
    var nav = document.querySelector(".portal-nav");
    if (!nav || nav.querySelector(".portal-nav-toggle")) return;

    var inner = nav.querySelector(".portal-nav-inner");
    if (!inner) return;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "portal-nav-toggle";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "portal-nav-links");
    btn.setAttribute("aria-label", "Abrir menu de navegação");
    btn.textContent = "Menu";

    inner.id = "portal-nav-links";

    btn.addEventListener("click", function () {
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

    DESKTOP_NAV_MQ.addEventListener("change", function (e) {
      if (e.matches) closeMobileNav(nav, inner, btn);
    });

    nav.insertBefore(btn, inner);
  }

  function enhanceExternalLinks() {
    document.querySelectorAll('a[href^="http://"], a[href^="https://"]').forEach(function (link) {
      var rel = (link.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
      if (rel.indexOf("noopener") === -1) rel.push("noopener");
      if (rel.indexOf("noreferrer") === -1) rel.push("noreferrer");
      link.setAttribute("rel", rel.join(" "));
    });
  }

  enhanceNavLinks();
  enhanceExternalLinks();
  setActiveNav();
  initSmoothScroll();
  initMobileNavToggle();
})();

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

  function resolveAsset(path) {
    if (!path) return path;
    if (/^https?:/i.test(path)) return path;
    return (navRoot || "") + path;
  }

  function initEvolutionStatus() {
    if (document.querySelector("[data-evo-seed-injected]")) return;

    if (!document.querySelector('link[href*="evolution-status"]')) {
      var styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = resolveAsset("assets/css/evolution-status.css");
      document.head.appendChild(styleLink);
    }

    var nav = document.querySelector(".portal-nav");
    if (nav && !document.querySelector(".evo-seed-store-banner")) {
      var banner = document.createElement("section");
      banner.className = "evo-seed-store-banner";
      banner.setAttribute("aria-label", "Aviso loja SEED");
      banner.innerHTML =
        '<p class="evo-seed-store-label">Loja SEED · fase startup</p>' +
        '<p class="evo-seed-store-text">' +
        "<strong>Esta vitrine ainda não tem subdomínio próprio</strong> (ex.: pdv-rust.caracore.com.br). " +
        "Enquanto isso, a loja oficial da iniciativa <strong>Rust + Tauri</strong> fica em <strong>GitHub Pages</strong>. " +
        "Baixe somente pelos <a href=\"" +
        resolveAsset("download.html") +
        "\">releases oficiais</a> ou " +
        '<a href="https://github.com/chmulato/caracore-rust-pdv-releases/releases" rel="noopener noreferrer">GitHub</a>. ' +
        'A linha madura Java continua em <a href="https://pdv.caracore.com.br/" rel="noopener noreferrer">pdv.caracore.com.br</a>. ' +
        'Matriz: <a href="https://www.caracore.com.br/delivery/pdv-rust/" rel="noopener noreferrer">caracore.com.br</a>.' +
        "</p>";
      nav.insertAdjacentElement("afterend", banner);
    }

    if (!document.querySelector(".evo-beta-wrap")) {
      var badgeWrap = document.createElement("div");
      badgeWrap.className = "evo-beta-wrap";
      badgeWrap.setAttribute("aria-hidden", "true");
      badgeWrap.innerHTML =
        '<span class="evo-beta-badge" title="Loja em fase SEED">' +
        "Seed" +
        '<span class="evo-beta-tooltip">' +
        "Loja em fase SEED (startup): vitrine temporária em GitHub Pages, sem subdomínio Cara Core ainda. " +
        "Downloads apenas via releases oficiais. Piloto Windows v0.1.0." +
        "</span></span>";
      body.appendChild(badgeWrap);
    }

    var portalFooter = document.querySelector(".portal-footer");
    if (portalFooter && !document.querySelector(".evo-roadmap-footer")) {
      var roadmap = document.createElement("footer");
      roadmap.className = "evo-roadmap-footer";
      roadmap.setAttribute("role", "contentinfo");
      roadmap.innerHTML =
        '<div class="evo-roadmap-inner">' +
        '<p class="evo-roadmap-title">Roadmap da loja SEED</p>' +
        "<ul class=\"evo-roadmap-list\">" +
        '<li>Subdomínio próprio (pdv-rust.caracore.com.br) <span class="evo-roadmap-tag">em planejamento</span></li>' +
        '<li>Release piloto v0.1.0 publicada <span class="evo-roadmap-tag">Windows pt-BR</span></li>' +
        '<li>Piloto assistido com lojas selecionadas</li>' +
        '<li>Linha Java madura: <a href="https://pdv.caracore.com.br/" style="color:var(--evo-emerald-500)" rel="noopener noreferrer">pdv.caracore.com.br</a></li>' +
        "</ul></div>";
      portalFooter.insertAdjacentElement("beforebegin", roadmap);
    }

    if (!document.querySelector(".evo-feedback-fab")) {
      var fab = document.createElement("div");
      fab.className = "evo-feedback-fab";
      fab.innerHTML =
        '<a href="mailto:suporte@caracore.com.br" class="evo-feedback-btn" aria-label="Fale conosco por e-mail">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
        " Fale conosco" +
        "</a>";
      body.appendChild(fab);
    }

    body.setAttribute("data-evo-seed-injected", "true");
  }

  enhanceNavLinks();
  enhanceExternalLinks();
  initEvolutionStatus();
  setActiveNav();
  initSmoothScroll();
  initMobileNavToggle();
})();

/**
 * @jest-environment jsdom
 *
 * Testes unitários — seleção azul no menu de navegação
 * Valida dois contratos:
 *   1. CSS  — as regras que produzem o destaque azul estão presentes e corretas.
 *   2. JS   — portal.js atribui aria-current="page" à entrada certa (e apenas a ela).
 */

"use strict";

const fs = require("fs");
const path = require("path");

const CSS_FILE = path.join(__dirname, "..", "docs", "assets", "css", "layout.css");
const JS_FILE  = path.join(__dirname, "..", "docs", "assets", "js", "portal.js");

const cssSource = fs.readFileSync(CSS_FILE, "utf8");
const jsSource  = fs.readFileSync(JS_FILE,  "utf8");

// HTML do nav idêntico ao usado em download.html
const NAV_HTML = `
<nav class="portal-nav" aria-label="Navegação principal">
  <div class="portal-nav-inner" id="portal-nav-links">
    <a href="index.html">Início</a>
    <a href="modalidades.html">Local e rede</a>
    <a href="produto.html">Produto</a>
    <a href="demonstracao.html">Demonstração</a>
    <a href="mercado.html">Para sua loja</a>
    <a href="download.html">Download</a>
    <a href="download.html">Formatos</a>
    <a href="comparacao.html">Comparar</a>
    <a href="transparencia.html">Transparência</a>
    <a href="wiki/index.html">Wiki</a>
  </div>
</nav>`;

// ─── helpers ────────────────────────────────────────────────────────────────

function mockMatchMedia() {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }),
  });
}

function setPathname(pathname) {
  Object.defineProperty(window, "location", {
    writable: true,
    configurable: true,
    value: { pathname },
  });
}

function runPortal() {
  // new Function executa o IIFE no contexto do window jsdom sem poluir o escopo do teste
  // eslint-disable-next-line no-new-func
  new Function(jsSource)();
}

function activeLinks() {
  return Array.from(document.querySelectorAll('.portal-nav a[aria-current="page"]'));
}

// ─── setup / teardown ────────────────────────────────────────────────────────

beforeEach(() => {
  document.body.innerHTML = NAV_HTML;
  mockMatchMedia();
});

// ────────────────────────────────────────────────────────────────────────────
// 1. TESTES DE CSS — regras de destaque azul
// ────────────────────────────────────────────────────────────────────────────

describe("CSS — .portal-nav a[aria-current=\"page\"] (destaque azul)", () => {
  test("define background como var(--brand)", () => {
    // A cor azul vem do token --brand (#0b3a66)
    expect(cssSource).toMatch(
      /\.portal-nav\s+a\[aria-current="page"\]\s*\{[^}]*background\s*:\s*var\(--brand\)/
    );
  });

  test("define color como #fff (texto branco sobre fundo azul)", () => {
    expect(cssSource).toMatch(
      /\.portal-nav\s+a\[aria-current="page"\]\s*\{[^}]*color\s*:\s*#fff/
    );
  });

  test("define border-color como var(--brand)", () => {
    expect(cssSource).toMatch(
      /\.portal-nav\s+a\[aria-current="page"\]\s*\{[^}]*border-color\s*:\s*var\(--brand\)/
    );
  });

  test("defesa de duplicata: segundo [aria-current] tem background: transparent", () => {
    expect(cssSource).toMatch(
      /\.portal-nav\s+a\[aria-current="page"\]\s*~\s*a\[aria-current="page"\]\s*\{[^}]*background\s*:\s*transparent/
    );
  });

  test("defesa de duplicata: segundo [aria-current] repõe color: var(--brand)", () => {
    expect(cssSource).toMatch(
      /\.portal-nav\s+a\[aria-current="page"\]\s*~\s*a\[aria-current="page"\]\s*\{[^}]*color\s*:\s*var\(--brand\)/
    );
  });

  test("defesa de duplicata: segundo [aria-current] tem border-color: transparent", () => {
    expect(cssSource).toMatch(
      /\.portal-nav\s+a\[aria-current="page"\]\s*~\s*a\[aria-current="page"\]\s*\{[^}]*border-color\s*:\s*transparent/
    );
  });
});

// ────────────────────────────────────────────────────────────────────────────
// 2. TESTES DE JS — portal.js setActiveNav
// ────────────────────────────────────────────────────────────────────────────

describe("JS portal.js — setActiveNav (item único em destaque)", () => {
  test("download.html: somente o link \"Formatos\" recebe aria-current", () => {
    setPathname("/download.html");
    runPortal();
    const active = activeLinks();
    expect(active).toHaveLength(1);
    expect(active[0].textContent.trim()).toBe("Formatos");
  });

  test("download.html: o link \"Download\" NÃO deve estar ativo", () => {
    setPathname("/download.html");
    runPortal();
    const downloadLinks = Array.from(document.querySelectorAll(".portal-nav a"))
      .filter((a) => a.textContent.trim() === "Download");
    downloadLinks.forEach((link) => {
      expect(link.getAttribute("aria-current")).toBeNull();
    });
  });

  test("index.html: somente \"Início\" fica em destaque", () => {
    setPathname("/index.html");
    runPortal();
    const active = activeLinks();
    expect(active).toHaveLength(1);
    expect(active[0].textContent.trim()).toBe("Início");
  });

  test("produto.html: somente \"Produto\" fica em destaque", () => {
    setPathname("/produto.html");
    runPortal();
    const active = activeLinks();
    expect(active).toHaveLength(1);
    expect(active[0].textContent.trim()).toBe("Produto");
  });

  test("primeiros-passos.html: o primeiro link para download.html fica ativo", () => {
    setPathname("/primeiros-passos.html");
    runPortal();
    const active = activeLinks();
    expect(active).toHaveLength(1);
    expect(active[0].getAttribute("href")).toBe("download.html");
  });

  test("comparacao.html: somente \"Comparar\" fica em destaque", () => {
    setPathname("/comparacao.html");
    runPortal();
    const active = activeLinks();
    expect(active).toHaveLength(1);
    expect(active[0].textContent.trim()).toBe("Comparar");
  });

  test("nenhuma página pode ter mais de um aria-current=\"page\" simultâneo", () => {
    const pages = [
      "/index.html",
      "/download.html",
      "/produto.html",
      "/primeiros-passos.html",
      "/comparacao.html",
      "/transparencia.html",
      "/mercado.html",
    ];
    pages.forEach((pathname) => {
      document.body.innerHTML = NAV_HTML;
      setPathname(pathname);
      runPortal();
      const count = activeLinks().length;
      expect(count).toBeLessThanOrEqual(1);
    });
  });
});

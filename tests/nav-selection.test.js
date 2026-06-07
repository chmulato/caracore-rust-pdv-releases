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

const TOKENS_FILE = path.join(__dirname, "..", "docs", "assets", "css", "tokens.css");
const CSS_FILE = path.join(__dirname, "..", "docs", "assets", "css", "layout.css");
const JS_FILE  = path.join(__dirname, "..", "docs", "assets", "js", "portal.js");

const tokensSource = fs.readFileSync(TOKENS_FILE, "utf8");
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
    <a href="download.html">Formatos</a>
    <a href="comparacao.html">Comparar</a>
    <a href="transparencia.html">Transparência</a>
    <a href="wiki/index.html">Wiki</a>
  </div>
</nav>`;

const WIKI_NAV_HTML = `
<nav class="portal-nav" aria-label="Navegação principal">
  <div class="portal-nav-inner" id="portal-nav-links">
    <a href="../index.html">Início</a>
    <a href="../modalidades.html">Local e rede</a>
    <a href="../produto.html">Produto</a>
    <a href="../demonstracao.html">Demonstração</a>
    <a href="../mercado.html">Para sua loja</a>
    <a href="../download.html">Formatos</a>
    <a href="../comparacao.html">Comparar</a>
    <a href="../transparencia.html">Transparência</a>
    <a href="../wiki/index.html">Wiki</a>
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

describe("tokens.css — token --nav-active (azul vibrante para seleção)", () => {
  test("--nav-active é definido em tokens.css", () => {
    expect(tokensSource).toMatch(/--nav-active\s*:/);
  });

  test("--nav-active usa #1a6bb5 (azul vibrante, não o navy escuro --brand)", () => {
    expect(tokensSource).toMatch(/--nav-active\s*:\s*#1a6bb5/);
  });

  test("--brand permanece #0b3a66 (navy escuro, para textos e bordas)", () => {
    expect(tokensSource).toMatch(/--brand\s*:\s*#0b3a66/);
  });
});

describe("CSS — .portal-nav a[aria-current=\"page\"] (destaque azul)", () => {
  test("usa var(--nav-active) como background (não --brand)", () => {
    expect(cssSource).toMatch(
      /\.portal-nav\s+a\[aria-current="page"\]\s*\{[^}]*background\s*:\s*var\(--nav-active\)/
    );
  });

  test("define color como #fff (texto branco sobre fundo azul)", () => {
    expect(cssSource).toMatch(
      /\.portal-nav\s+a\[aria-current="page"\]\s*\{[^}]*color\s*:\s*#fff/
    );
  });

  test("usa var(--nav-active) como border-color", () => {
    expect(cssSource).toMatch(
      /\.portal-nav\s+a\[aria-current="page"\]\s*\{[^}]*border-color\s*:\s*var\(--nav-active\)/
    );
  });

  test("NÃO usa --brand como background do item ativo (evita azul escuro/preto)", () => {
    // Garante que a regra de seleção ativa não usa o navy escuro diretamente
    const activeRule = cssSource.match(
      /\.portal-nav\s+a\[aria-current="page"\]\s*\{([^}]*)\}/
    );
    expect(activeRule).not.toBeNull();
    expect(activeRule[1]).not.toMatch(/background\s*:\s*var\(--brand\)/);
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

  test("download.html: não existe mais o link \"Download\" duplicado no nav", () => {
    setPathname("/download.html");
    runPortal();
    const downloadLinks = Array.from(document.querySelectorAll(".portal-nav a"))
      .filter((a) => a.textContent.trim() === "Download");
    expect(downloadLinks).toHaveLength(0);
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
      "/modalidades.html",
      "/demonstracao.html",
      "/wiki/index.html",
      "/wiki/projeto-pdv.html",
    ];
    pages.forEach((pathname) => {
      document.body.innerHTML = NAV_HTML;
      setPathname(pathname);
      runPortal();
      const count = activeLinks().length;
      expect(count).toBeLessThanOrEqual(1);
    });
  });

  test("wiki/index.html: somente \"Wiki\" fica em destaque", () => {
    document.body.innerHTML = WIKI_NAV_HTML;
    document.body.setAttribute("data-nav-root", "../");
    setPathname("/wiki/index.html");
    runPortal();
    const active = activeLinks();
    expect(active).toHaveLength(1);
    expect(active[0].textContent.trim()).toBe("Wiki");
  });

  test("wiki/projeto-pdv.html: somente \"Wiki\" fica em destaque", () => {
    document.body.innerHTML = WIKI_NAV_HTML;
    document.body.setAttribute("data-nav-root", "../");
    setPathname("/wiki/projeto-pdv.html");
    runPortal();
    const active = activeLinks();
    expect(active).toHaveLength(1);
    expect(active[0].textContent.trim()).toBe("Wiki");
  });

  test("demonstracao.html: somente \"Demonstração\" fica em destaque", () => {
    setPathname("/demonstracao.html");
    runPortal();
    const active = activeLinks();
    expect(active).toHaveLength(1);
    expect(active[0].textContent.trim()).toBe("Demonstração");
  });

  test("URL raiz (/): somente \"Início\" fica em destaque", () => {
    setPathname("/");
    runPortal();
    const active = activeLinks();
    expect(active).toHaveLength(1);
    expect(active[0].textContent.trim()).toBe("Início");
  });
});

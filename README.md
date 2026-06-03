# Cara Core PDV Desktop (Rust + Tauri) — Loja e Releases

Canal público de apresentação e distribuição da **iniciativa Rust + Tauri 2** do CaraCore PDV (Windows na release [v0.1.2](https://github.com/chmulato/caracore-rust-pdv-releases/releases/tag/v0.1.2)). Coexiste com o PDV Desktop Java (canal v3.1.x) em [pdv.caracore.com.br](https://pdv.caracore.com.br/).

A loja comunica o produto em **linguagem comercial para leigos**: PDV **local** (um PC na loja) e PDV **na rede** (vários caixas + servidor da loja). Documentação técnica, evidências e gates ficam na oficina (`caracore-rust-pdv`).

---

## Versão atual

| Campo | Valor |
| ----- | ----- |
| Versão comercial (vitrine) | `v0.1.2` — narrativa local + rede (jun/2026) |
| Binários publicados | **`v0.1.2`** — Windows (NSIS, MSI pt-BR, ZIP piloto) |
| Manifesto vitrine (offline) | `docs/assets/data/release-latest.json` — sem API GitHub no browser |
| Status | Piloto Windows; rede da loja em implantação assistida |
| Idioma dos instaladores | Português do Brasil (pt-BR) |
| Stack da oficina | Rust + Tauri 2 + React + SQLite local / PostgreSQL na rede |
| Release | https://github.com/chmulato/caracore-rust-pdv-releases/releases/latest |
| Loja | https://rust-pdv.caracore.com.br/ |

### Destaques (v0.1.2 — loja)

- Página **[Local e rede](https://rust-pdv.caracore.com.br/modalidades.html)** — PDV na sua máquina vs PDV na rede da loja.
- Planos e primeiros passos alinhados às duas modalidades.
- Mesmo produto: comece local; evolua para vários caixas com suporte Cara Core.

### Destaques (v0.1.1 — produto)

- Licença CaraCore Seed opcional; multiplataforma; checkout, caixa, gestão PDF, fila fiscal visível.

Lista completa: [`CHANGELOG.md`](CHANGELOG.md).

---

## Endereços

| Papel | Local |
| ----- | ----- |
| Loja oficial | https://rust-pdv.caracore.com.br/ |
| Modalidades (local / rede) | https://rust-pdv.caracore.com.br/modalidades.html |
| Releases / download | https://github.com/chmulato/caracore-rust-pdv-releases/releases |
| Oficina (código) | https://github.com/chmulato/caracore-rust-pdv |
| Linha Java (alternativa) | https://pdv.caracore.com.br/ |

---

## Estrutura do repositório (padrão loja)

| Caminho | Conteúdo |
| ------- | -------- |
| `README.md` | Visão institucional e versão atual (único `.md` na raiz além do changelog) |
| `CHANGELOG.md` | Histórico de releases da vitrine |
| `docs/` | **Somente HTML** comercial para leigos + `assets/` (CSS, JS, imagens) — GitHub Pages |
| `docs/transparencia.html` | Limites honestos (free 100 vendas, PIX, fiscal) |
| `docs/modalidades.html` | PDV local vs PDV na rede |
| `docs/download.html` | Download via API GitHub |
| `.cursor/rules/` | Checklists e continuidade (**não** publicados na vitrine) |
| `.github/workflows/` | Validação da loja |

Documentação técnica e matrizes de engenharia ficam na **oficina** (`caracore-rust-pdv`), não em `docs/` desta loja.

GitHub Pages: branch **master**, pasta **/docs**, arquivo **docs/.nojekyll**.

---

## Páginas da loja

| Página | Conteúdo |
| ------ | -------- |
| `docs/index.html` | Apresentação e hub local/rede |
| `docs/modalidades.html` | Como usar: máquina única ou rede da loja |
| `docs/produto.html` | Funções do sistema |
| `docs/mercado.html` | Licenciamento, modalidades e planos |
| `docs/download.html` | Download (NSIS, MSI, ZIP e multi-OS na tag) |
| `docs/transparencia.html` | Piloto, SHA256, privacidade |
| `docs/primeiros-passos.html` | Instalação inicial |

---

## Ecossistema Cara Core

| Papel | Repositório |
| ----- | ----------- |
| Oficina Java | `caracore-pdv` |
| Loja Java | `caracore-pdv-releases` |
| Oficina Rust | `caracore-rust-pdv` |
| Loja Rust | `caracore-rust-pdv-releases` (este repositório) |

---

**Cara Core Informática** — CNPJ 23.969.028/0001-37 · [LICENSE](LICENSE)

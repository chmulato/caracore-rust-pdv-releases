# Cara Core PDV Desktop (Rust + Tauri) — Loja e Releases

Canal público de apresentação e distribuição do **piloto Windows** CaraCore PDV (loja em https://pdv-rust.caracore.com.br/ com entrega de binários na tag [v0.1.4](https://github.com/chmulato/caracore-rust-pdv-releases/releases/tag/v0.1.4)). Esta vitrine fala só deste piloto — sem comparar outras linhas de caixa.

A loja comunica o produto em **linguagem comercial para leigos**: PDV **local** (um PC na loja) e PDV **na rede** (vários caixas + servidor da loja). Documentação técnica, evidências e gates ficam na oficina local (`D:\dev\caracore-pdv-rust`). A loja **não** publica o LEIA-ME do ZIP — instalação pública = `primeiros-passos.html` + `download.html`.

---

## Versão atual

| Campo | Valor |
| ----- | ----- |
| Versão comercial (vitrine) | `v0.1.4` — versão discreta e coerência do QA local (set/2026) |
| Binários publicados | **`v0.1.4`** — Windows (NSIS, MSI pt-BR, ZIP piloto) · **corte 2026-09-08** |
| Manifesto vitrine (offline) | `docs/assets/data/release-latest.json` — sem API GitHub no browser |
| Status | Piloto Windows; saúde funcional OK em 2026-06-06; novo corte bloqueado por regressão semanal relativa de performance |
| Idioma dos instaladores | Português do Brasil (pt-BR) |
| Stack da oficina | Rust + Tauri 2 + React + SQLite local / PostgreSQL na rede |
| Release | https://github.com/chmulato/caracore-rust-pdv-releases/releases/tag/v0.1.4 |
| Loja | https://pdv-rust.caracore.com.br/ |

### Destaques (v0.1.4 — loja)

- Corte de QA: versão discreta na UI (sem misturar `0.1.2` com o binário); status de turno coerente com o SQLite; tabela Gestão → Vendas legível; Auditoria sem cards ocos.
- Home em funil enxuto: hero (offline / leve / Windows) + Baixar piloto e Solicitar proposta; 3 passos no balcão; planos em cards. Sem discurso de outra linha de PDV.
- Teto do piloto: **100 vendas na vida deste banco** (não por mês). PIX = QR + confirmação do operador.
- Página **[Local e rede](https://pdv-rust.caracore.com.br/modalidades.html)** — comece em um PC; evolua para vários caixas sem trocar de produto.

### Destaques (v0.1.1 — produto)

- Licença CaraCore Seed opcional; checkout, caixa, gestão PDF, fila fiscal visível. A tag pública **v0.1.4 publica só Windows** (Linux/macOS não saíram nesta tag).

Lista completa: [`CHANGELOG.md`](CHANGELOG.md).

---

## Endereços

| Papel | Local |
| ----- | ----- |
| Loja oficial | https://pdv-rust.caracore.com.br/ |
| Modalidades (local / rede) | https://pdv-rust.caracore.com.br/modalidades.html |
| Releases / download | https://github.com/chmulato/caracore-rust-pdv-releases/releases/tag/v0.1.4 |
| Oficina (código) | Pasta local `D:\dev\caracore-pdv-rust` (repo privado; não é fonte de download) |

---

## Estrutura do repositório (padrão loja)

| Caminho | Conteúdo |
| ------- | -------- |
| `README.md` | Visão institucional e versão atual (único `.md` na raiz além do changelog) |
| `CHANGELOG.md` | Histórico de releases da vitrine |
| `docs/` | **Somente HTML** comercial para leigos + `assets/` (CSS, JS, imagens) — GitHub Pages |
| `docs/transparencia.html` | Limites honestos (free 100 vendas, PIX, fiscal) |
| `docs/modalidades.html` | PDV local vs PDV na rede |
| `docs/download.html` | Download via manifesto estático atualizado por automação |
| `.cursor/rules/` | Checklists e continuidade (**não** publicados na vitrine) |
| `.github/workflows/` | Validação da loja |

Documentação técnica e matrizes de engenharia ficam na **oficina** (pasta local `D:\dev\caracore-pdv-rust`), não em `docs/` desta loja.

GitHub Pages: branch **master**, pasta **/docs**, arquivo **docs/.nojekyll**.

---

## Plano de atualização de distribuição (iniciado em 2026-06-07)

1. **Fonte única de versão:** https://github.com/chmulato/caracore-rust-pdv-releases/releases
2. **Espelhamento para a loja:** atualizar `docs/assets/data/release-latest.json` automaticamente.
3. **Renderização na vitrine:** `download.html` e CTAs leem esse manifesto e apontam para o asset principal disponível.
4. **Execução contínua:** workflow `sync-release-manifest.yml` (manual + agendado) mantém a loja sincronizada.

---

## Páginas da loja

| Página | Conteúdo |
| ------ | -------- |
| `docs/index.html` | Apresentação e hub local/rede |
| `docs/modalidades.html` | Como usar: máquina única ou rede da loja |
| `docs/produto.html` | Funções do sistema |
| `docs/mercado.html` | Licenciamento, modalidades e planos |
| `docs/download.html` | Download Windows da tag v0.1.4 (NSIS, MSI, ZIP + SHA256) |
| `docs/transparencia.html` | Piloto, SHA256, privacidade |
| `docs/primeiros-passos.html` | Instalação inicial |

---

## Ecossistema Cara Core

| Papel | Repositório |
| ----- | ----------- |
| Oficina Java | `caracore-pdv` |
| Loja Java | `caracore-pdv-releases` |
| Oficina Rust | pasta local `caracore-pdv-rust` (GitHub privado `caracore-rust-pdv` — sem link público de download) |
| Loja Rust | `caracore-rust-pdv-releases` (este repositório; clone local `caracore-pdv-rust-releases`) |

---

**Cara Core Informática** — CNPJ 23.969.028/0001-37 · [LICENSE](LICENSE)


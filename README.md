# Cara Core PDV Desktop (Rust + Tauri) — Loja e Releases

Canal público de apresentação e distribuição da **iniciativa Rust + Tauri 2** do CaraCore PDV (Windows, release v0.1.0). Coexiste com o PDV Desktop Java (canal v3.1.x) em pdv.caracore.com.br.

A loja comunica o produto em linguagem comercial. Documentação técnica, evidências e gates ficam na oficina (`caracore-rust-pdv`).

---

## Versão atual

| Campo | Valor |
| ----- | ----- |
| Versão | `v0.1.0` |
| Status | Piloto Windows |
| Idioma dos instaladores | Português do Brasil (pt-BR) |
| Publicação | 05/2026 |
| Stack da oficina | Rust + Tauri 2 + React + SQLite local |
| Release | https://github.com/chmulato/caracore-rust-pdv-releases/releases/tag/v0.1.0 |
| Loja | https://rust-pdv.caracore.com.br/ |

### Artefatos v0.1.0

| Artefato | Perfil | Verificação |
| -------- | ------ | ----------- |
| `CaraCore PDV_0.1.0_x64-setup.exe` | Lojista / piloto (NSIS) | `SHA256SUMS.txt` |
| `CaraCore PDV_0.1.0_x64_pt-BR.msi` | TI / empresa (MSI, pt-BR) | `SHA256SUMS.txt` |
| `CaraCore-PDV-v0.1.0-windows.zip` | Portátil piloto | `SHA256SUMS.txt` |
| `RELEASE_MANIFEST.json` | Manifesto técnico | JSON na release |
| `SHA256SUMS.txt` | Fonte oficial de hashes | Anexo da release |

---

## Endereços

| Papel | Local |
| ----- | ----- |
| Loja oficial | https://rust-pdv.caracore.com.br/ |
| Releases / download | https://github.com/chmulato/caracore-rust-pdv-releases/releases |
| Oficina (código) | https://github.com/chmulato/caracore-rust-pdv |
| Linha Java (alternativa) | https://pdv.caracore.com.br/ |

---

## Estrutura do repositório (padrão loja)

| Caminho | Conteúdo |
| ------- | -------- |
| `README.md` | Visão institucional e versão atual |
| `CHANGELOG.md` | Histórico de releases da vitrine |
| `PUBLICACAO_CHECKLIST.md` | Roteiro oficina → release → loja |
| `docs/` | Portal GitHub Pages |
| `docs/download.html` | Download NSIS / MSI pt-BR / ZIP via API GitHub |
| `docs/assets/js/releases.js` | Cliente da API de releases |
| `.github/workflows/` | Validação da loja |

GitHub Pages: branch **master**, pasta **/docs**, arquivo **docs/.nojekyll**.

---

## Páginas da loja

| Página | Conteúdo |
| ------ | -------- |
| `docs/index.html` | Apresentação |
| `docs/produto.html` | Funções do sistema |
| `docs/mercado.html` | Licenciamento e adoção |
| `docs/download.html` | Download Windows (NSIS, MSI, ZIP) |
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

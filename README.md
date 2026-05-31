# CaraCore PDV v3 Rust — Loja e Releases

Canal público de vitrine, documentação e distribuição do **CaraCore PDV v3 (Rust/Tauri)** para pequenas operações de balcão e varejo local.

Mensagem central: **quando a internet cai, o caixa não pode parar**. A linha Rust entrega desktop local Windows com SQLite, operação offline e stack moderna (Rust + Tauri 2) sem Java no cliente.

---

## Ecossistema

| Papel | Repositório / Endereço |
| ----- | ---------------------- |
| Oficina (código-fonte) | [`caracore-rust-pdv`](https://github.com/chmulato/caracore-rust-pdv) · local `D:\dev\caracore-pdv-rust` |
| Loja (vitrine e releases) | **este repositório** · local `D:\dev\caracore-pdv-rust-releases` |
| Loja pública (GitHub Pages) | <https://chmulato.github.io/caracore-rust-pdv-releases/> |
| Linha Java (comercial) | <https://pdv.caracore.com.br/> · [`caracore-pdv-releases`](https://github.com/chmulato/caracore-pdv-releases) |

---

## Versão e releases

| Campo | Valor |
| ----- | ----- |
| Linha | PDV v3 Rust / Tauri 2 |
| Plataforma piloto | Windows 10/11 x64 |
| Requisito cliente | WebView2 Runtime (Edge) — sem JDK |
| Releases | <https://github.com/chmulato/caracore-rust-pdv-releases/releases> |
| Status (31/05/2026) | Loja publicada; pacote Windows publicado quando a pipeline de release for acionada na oficina |

---

## Estrutura do repositório

| Caminho | Conteúdo |
| ------- | -------- |
| `README.md` | Visão institucional desta loja |
| `docs/` | Portal da loja em GitHub Pages |
| `docs/index.html` | Landing comercial (adaptada da oficina) |
| `docs/download.html` | Download e integração com GitHub Releases |
| `docs/primeiros-passos.html` | Onboarding Windows |
| `docs/arquitetura/` | Manual do produto e “Como funciona” |
| `docs/assets/` | CSS, JS e identidade visual |

---

## GitHub Pages

Settings → Pages → Deploy from a branch → **main** → folder **/docs**.

URL padrão: `https://chmulato.github.io/caracore-rust-pdv-releases/`

Para domínio customizado, adicione `docs/CNAME` e configure DNS na hospedagem.

---

## Qualidade de entrega

- Assets públicos baixáveis via GitHub Releases
- SHA256 documentado por release (`SHA256SUMS.txt`)
- Página de download apontando para a latest release
- Documentação comercial alinhada ao escopo real da oficina Rust
- Linguagem honesta — sem sobrepromessa de integrações não homologadas

---

**Cara Core Informática** — CNPJ 23.969.028/0001-37

Consulte [LICENSE](LICENSE) para termos de uso.

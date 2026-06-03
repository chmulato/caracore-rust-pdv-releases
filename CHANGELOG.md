# Changelog — Loja Cara Core PDV Desktop (Rust + Tauri)

Formato alinhado às demais lojas `*-releases` do ecossistema CaraCore.

## v0.1.2 — 2026-06-03 (vitrine · PDV local e PDV na rede)

**Versão comercial da loja:** narrativa alinhada ao produto em duas modalidades. **Binários:** continuam na tag GitHub vigente ([`v0.1.1`](https://github.com/chmulato/caracore-rust-pdv-releases/releases/tag/v0.1.1) ou mais recente publicada).

### O que mudou na loja (linguagem para leigos)

- Nova página **[Local e rede](https://rust-pdv.caracore.com.br/modalidades.html)** — explica PDV na sua máquina vs PDV na rede da loja, sem jargão técnico.
- **PDV local** posicionado para MEI, demo, aprendizado e loja única — dados no PC, vendas offline.
- **PDV na rede** posicionado para vários caixas + servidor da loja — sync de vendas e catálogo, indicador “Sync loja”, piloto com implantação assistida.
- Planos comerciais e primeiros passos atualizados com escolha de modalidade.

### Produto (oficina — referência técnica)

- Ecossistema distribuído validado em laboratório (caixa → loja); modo **standalone** recomendado para demonstração e operação em um PC.
- Wizard em **Preferências → Banco** para papel Caixa na rede; badge de sincronização no balcão.

Loja: https://rust-pdv.caracore.com.br/

---

## v0.1.1 — 2026-06-02 (multiplataforma · licença)

**Versão comercial:** `v0.1.1` · **Plataformas:** Windows (x64), Linux (deb / AppImage), macOS (dmg).

### Novidades

- **Licença CaraCore Seed** — consulta na abertura do programa; modo degradado com aviso claro e bloqueio de novas vendas apenas quando a licença exigir (integração opcional via `PDV_SEED_*`).
- **Mesma operação em todas as plataformas** — vendas, caixa, gestão e dados locais (SQLite) no computador da loja.
- **Release multi-OS** — instaladores Windows (NSIS + MSI pt-BR), pacotes Linux e imagem macOS na mesma tag.
- **Continuidade v0.1.0** — checkout ágil, PIX com status, backup ao fechar turno, pós-venda por código, tour no primeiro login, exportação PDF na gestão.

### Pacotes

- Windows: NSIS, MSI pt-BR e ZIP portátil (quando publicado na tag).
- Linux: `.deb` e/ou AppImage.
- macOS: `.dmg`.
- `SHA256SUMS.txt` e `RELEASE_MANIFEST.json` com todas as plataformas detectadas.

### Configuração opcional (licença Seed)

| Variável | Uso |
| -------- | --- |
| `PDV_SEED_MODE` | `off` (piloto/demo) ou integração com licença CaraCore Seed |
| `PDV_SEED_LICENSE_KEY` / `PDV_SEED_LICENSE_FILE` | Chave ou arquivo de licença |

Loja: https://rust-pdv.caracore.com.br/

---

## v0.1.0 — 2026-06-02 (build operacional · republicação)

**Versão comercial:** `v0.1.0` (piloto Windows) · **Build:** 02/06/2026.

### Novidades para o balcão e o gestor

- **Abertura mais clara** — barra de progresso (catálogo, licença, banco).
- **Checkout mais rápido** — foco na busca, total visível, atalhos (F1/F9).
- **Venda em espera**, **PIX com status**, **estoque no ato da venda**.
- **Caixa mais seguro** — alerta de sangria, backup automático ao fechar turno.
- **Licença Seed (base)** — integração opcional documentada.
- **Gestão**, **LGPD**, **fiscal** com fila visível.

### Pacotes (Windows)

- NSIS, MSI pt-BR, ZIP portátil · `SHA256SUMS.txt` · `RELEASE_MANIFEST.json`.

---

## v0.1.0 — 2026-05-31

- Primeira release pública piloto Windows (Tauri 2 + Rust).
- Instaladores em **Português do Brasil**: NSIS, MSI, ZIP portátil.

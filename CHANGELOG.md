# Changelog — Loja Cara Core PDV Desktop (Rust + Tauri)

Formato alinhado às demais lojas `*-releases` do ecossistema CaraCore.

## v0.1.2 — 2026-09-06 (fonte oficial de binários)

Download Rust aponta para [`caracore-rust-pdv-releases/releases`](https://github.com/chmulato/caracore-rust-pdv-releases/releases). O repo `caracore-pdv-releases` fica com o canal Java.

---

## v0.1.2 — 2026-09-06 (clareza da vitrine)

**Sem novo binário nesta entrada.** Ajuste de HTML/CSS na loja: download em cards, SmartScreen em 3 passos, teto de 100 vendas visível, comparação Rust / Java / proposta. Sem roadmap inventado e sem checkout de Premium.

---

## v0.1.2 — 2026-09-06 (republicação binários · oficina set/2026)

**Binários Windows republicados** na tag [`v0.1.2`](https://github.com/chmulato/caracore-rust-pdv-releases/releases/tag/v0.1.2): NSIS, MSI pt-BR e ZIP piloto.

### O que mudou no corte

- Loja e LEIA-ME apontam `pdv-rust.caracore.com.br` e `chmulato/caracore-pdv-releases` (tag `v0.1.2`).
- Título do app **CaraCore PDV 0.1.2**; primeiro acesso `/setup` + logins de piloto no LEIA-ME.
- Pasta de dados `%APPDATA%\caracore-pdv\` (não misturar com o Java em `%APPDATA%\caracore\`).
- Correção da migração SQLite V40 e aviso na tela se o boot falhar.

Checksums em `SHA256SUMS.txt` da tag e no manifesto `docs/assets/data/release-latest.json`.

| Arquivo | SHA256 |
| --- | --- |
| `CaraCore.PDV_0.1.2_x64-setup.exe` | `54837af1d5d7f78200fd8a9c332da1e08feb279bcc513c13ec62a1f8ef1532be` |
| `CaraCore.PDV_0.1.2_x64_pt-BR.msi` | `764ed38e1b185f24f8f2987a7e8257bfed50f8686ffeb39a0e425ba2c1595ae7` |
| `CaraCore-PDV-v0.1.2-windows.zip` | `c3ee907981273030cfbb43b0379d897dd4324f3aa58255341348382b28c7edcd` |

---

## v0.1.2 — 2026-09-06 (identidade piloto Rust vs Free Java)

**Vitrine.** A tag permanece [`v0.1.2`](https://github.com/chmulato/caracore-rust-pdv-releases/releases/tag/v0.1.2) (Windows x64). A vitrine deixa inequívoco: este site é o piloto Rust, não o Free Java do balcão. Os binários desta data estão na entrada **republicação binários** acima.

### Identidade e download

- Hero e título: **CaraCore PDV Desktop (Rust) — piloto Windows**.
- Faixa fixa na home e em Download apontando o Free Java **v3.2.3-free** em `pdv.caracore.com.br`.
- CTAs: **Baixar piloto Rust (Windows)** e **Ir ao Free Java (balcão)** — sem “Baixar grátis” genérico.
- `download.html` lista os 3 assets reais + SHA256, sem Linux/macOS nesta tag; link só para `/releases/tag/v0.1.2`.
- Comparativo e README alinhados a Java **v3.2.3-free** (não mais v3.2.2-free / v3.1.x).

### Instalação e dados

- Primeiro acesso: assistente `/setup` + login `admin` / `admin123`.
- Pasta Rust `%APPDATA%\caracore-pdv\` destacada frente à pasta Java `%APPDATA%\caracore\`.

### Para TI

- Diagrama Bunker / Zod / DDD / SymmetricDS saiu do funil da home; permanece em `rust-tauri.html`.

### Ruído residual (mesma data)

- Faixa de identidade (piloto Rust ≠ Free Java v3.2.3-free) em todas as páginas públicas.
- CTAs genéricos restantes (“Instalar agora”, “Baixar ou escolher formato”, “Download oficial”) substituídos por **Baixar piloto Rust (Windows)** / **Ir ao Free Java (balcão)** / **Primeiros passos do piloto Rust**.
- Link âncora morto `#ecosistema` na home apontado para `rust-tauri.html#ecosistema`.
- Comparativo deixa de repetir a matriz de pastas; uma tabela canônica + aviso.
- `primeiros-passos.html` é a fonte pública de instalação (`admin` / `admin123`, tag v0.1.2, AppData `caracore-pdv`). LEIA-ME do ZIP não vive nesta loja.
- README não aponta o GitHub privado da oficina como URL pública de download.

---

## v0.1.2 — 2026-06-06 (validação de saúde · oficina jun/2026)

**Sem novo binário publicado nesta validação.** Permanece como release pública o rebuild Windows de **2026-06-05**. A validação de 06/06 confirmou saúde funcional, mas bloqueou novo corte por regressão semanal relativa de performance.

### Resultado da validação

- Backend SQLite: OK.
- Frontend: 264 testes passed, 2 skipped.
- Build frontend, build release e smokes release/login/turno/RBAC: OK.
- Performance absoluta: OK (IPC, SQLite e busca EAN dentro dos limites).
- Gate completo: **REPROVADO** apenas por regressão semanal relativa (+10% em comparação histórica).

### Itens em validação na oficina

- **Gestão de Backup Fiscal e Diagnóstico de Mídia Removível:**
  - Cópia integrada do banco de dados e logs da aplicação para unidades removíveis externas com auditoria fiscal vinculada.
  - Teste de escrita física periódica em background no Shell para atestar a integridade e saúde do HD externo de backup.
  - Painel de suporte redesenhado com status de conectividade em tempo real, seletor de HD externo detectado e histórico de auditoria SPED/ICMS.
  - Lembrete visual diário no balcão recomendando a realização de backups diários físicos.
- **EULA e Criptografia de Dados Pessoais:**
  - Integração do contrato EULA com o Modelo de Responsabilidade Compartilhada no primeiro launch/onboarding do PDV, exigindo consentimento explícito.
  - Criptografia determinística em repouso dos dados de clientes no banco de dados SQLite local, resguardando a privacidade e em total conformidade com a LGPD.
  - Suporte transparente à exportação de dados em CSV e anonimização regulatória.

---

## v0.1.2 — 2026-06-05 (republicação binários · oficina jun/2026)

**Binários Windows republicados:** [`v0.1.2`](https://github.com/chmulato/caracore-rust-pdv-releases/releases/tag/v0.1.2) — NSIS, MSI pt-BR, ZIP piloto (build 05/06/2026, gate release APROVADO).

### Novidades desta build (oficina)

- **UX-063:** impressora MOCK configurável (`pdv.printer.port.v1`), PDF gestão + relatório fim de dia.
- **Melhorias Técnicas (Sprints A, B e C):**
  - **Modularização de TEF backend**: Structs e chamadas isoladas em módulo próprio, simplificando `main.rs`.
  - **Fatiamento de UI**: Simplificação e segmentação de código em `ClientesPage.tsx` e `AuditoriaPage.tsx` utilizando hooks customizados e subcomponentes.
  - **Segurança de Supply Chain**: Análise de dependências e vulnerabilidades em CI com `cargo-audit`, `cargo-deny` e `npm audit`.
  - **Geração de SBOM**: Geração e inclusão automática do Software Bill of Materials no padrão SPDX 2.3 (`sbom.spdx.json`).
  - **Assinatura de Código**: Planejamento e documentação da assinatura de executáveis e instaladores no Windows.
- **Integração front↔back:** OpenAPI 84 IPC, validação Zod, smoke CDP 7/7.
- **Correção:** colisão rara de `codigo_venda` em vendas no mesmo milissegundo (UUID v7) e ajuste de testes assíncronos no shell do PDV.

Checksums atualizados em `sha256sums.txt` na release GitHub e manifesto vitrine `docs/assets/data/release-latest.json` (incluindo o artefato `sbom.spdx.json`).

---

## v0.1.2 — 2026-06-03 (produto + vitrine)

**Binários Windows publicados:** [`v0.1.2`](https://github.com/chmulato/caracore-rust-pdv-releases/releases/tag/v0.1.2) — NSIS, MSI pt-BR, ZIP piloto.

### Vitrine técnica (jun/2026)

- CSS/JS **somente** em `docs/assets/` — sem CDN nem `api.github.com` no navegador.
- Manifesto de release: `docs/assets/data/release-latest.json` (página Download).

### Produto (oficina)

- Edição gratuita: até **100 vendas concluídas**; PIX com QR e confirmação cliente + operador.
- Licença Seed e limite free documentados em `transparencia.html`.

### Vitrine (PDV local e PDV na rede · UX comercial)

**Versão comercial da loja:** narrativa local + rede + transparência (free 100 vendas, PIX manual). **Binários:** [`v0.1.2`](https://github.com/chmulato/caracore-rust-pdv-releases/releases/tag/v0.1.2) (2026-06-03).

### Transparência com o cliente (alinhamento produto)

- **[Transparência](https://pdv-rust.caracore.com.br/transparencia.html#edicao-gratuita)** — matriz honesta: bunker local, **100 vendas concluídas** na edição gratuita, PIX (QR + confirmação cliente/operador), limites fiscal/MOCK.
- **Planos** — linha “Edição gratuita (piloto)” com download direto; Premium sob proposta.
- **Local e rede**, **Início**, **Produto**, **Download** — links e copy alinhados à oficina (`consistencia_pdv`); matriz do cliente só em `transparencia.html` (sem `.md` em `docs/`).

### O que mudou na loja (linguagem para leigos)

- **[Local e rede](https://pdv-rust.caracore.com.br/modalidades.html)** reescrita: benefícios em vez de jargão, comparação visual, miniaturas das telas.
- **PDV local** — “venda quando a internet cair”; CTA **Baixar PDV Local** em destaque (barra fixa + rodapé).
- **PDV na rede** — “preços uma vez, todos os caixas atualizam”; selo **validado em laboratório**; CTA **Falar com especialista**.
- **Início** e **Para sua loja** alinhados à mesma narrativa comercial.
- CSS: `mode-card`, `journey-path`, `compare-matrix`, `cta-sticky`, `data-vault`, `ti-accordion`.

### Produto (oficina — referência técnica)

- Ecossistema distribuído validado em laboratório (caixa → loja); modo **standalone** recomendado para demonstração e operação em um PC.
- Wizard em **Preferências → Banco** para papel Caixa na rede; badge de sincronização no balcão.

Loja: https://pdv-rust.caracore.com.br/

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

Loja: https://pdv-rust.caracore.com.br/

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


# Changelog — Loja Cara Core PDV Desktop (Rust + Tauri)

Formato alinhado às demais lojas `*-releases` do ecossistema CaraCore.

## v0.1.2 — 2026-06-07 (Gestão de Backup & Criptografia · oficina jun/2026)

**Binários Windows atualizados:** [`v0.1.2`](https://github.com/chmulato/caracore-rust-pdv-releases/releases/tag/v0.1.2) — NSIS, MSI pt-BR, ZIP piloto (build 07/06/2026, gate release APROVADO).

### Novidades desta build (oficina)

- **Gestão de Backup Fiscal e Diagnóstico de Mídia Removível (Sprints D, E, F e G):**
  - Cópia integrada do banco de dados e logs da aplicação para unidades removíveis externas com auditoria fiscal vinculada.
  - Teste de escrita física periódica em background no Shell para atestar a integridade e saúde do HD externo de backup.
  - Painel de suporte redesenhado com status de conectividade em tempo real, seletor de HD externo detectado e histórico de auditoria SPED/ICMS.
  - Lembrete visual diário no balcão recomendando a realização de backups diários físicos.
- **EULA e Criptografia de Dados Pessoais (Sprint H):**
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

- **[Transparência](https://rust-pdv.caracore.com.br/transparencia.html#edicao-gratuita)** — matriz honesta: bunker local, **100 vendas concluídas** na edição gratuita, PIX (QR + confirmação cliente/operador), limites fiscal/MOCK.
- **Planos** — linha “Edição gratuita (piloto)” com download direto; Premium sob proposta.
- **Local e rede**, **Início**, **Produto**, **Download** — links e copy alinhados à oficina (`consistencia_pdv`); matriz do cliente só em `transparencia.html` (sem `.md` em `docs/`).

### O que mudou na loja (linguagem para leigos)

- **[Local e rede](https://rust-pdv.caracore.com.br/modalidades.html)** reescrita: benefícios em vez de jargão, comparação visual, miniaturas das telas.
- **PDV local** — “venda quando a internet cair”; CTA **Baixar PDV Local** em destaque (barra fixa + rodapé).
- **PDV na rede** — “preços uma vez, todos os caixas atualizam”; selo **validado em laboratório**; CTA **Falar com especialista**.
- **Início** e **Para sua loja** alinhados à mesma narrativa comercial.
- CSS: `mode-card`, `journey-path`, `compare-matrix`, `cta-sticky`, `data-vault`, `ti-accordion`.

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

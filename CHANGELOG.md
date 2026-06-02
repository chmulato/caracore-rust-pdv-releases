# Changelog — Loja Cara Core PDV Desktop (Rust + Tauri)

Formato alinhado às demais lojas `*-releases` do ecossistema CaraCore.

## v0.1.0 — 2026-06-02 (build operacional · republicação)

**Versão comercial:** `v0.1.0` (piloto Windows) · **Build:** 02/06/2026 · mesmos instaladores na tag `v0.1.0`, conteúdo de produto e binários alinhados à oficina.

### Novidades para o balcão e o gestor

- **Abertura mais clara** — ao iniciar o programa, barra de progresso mostra catálogo, licença e banco; menos tempo com tela em branco após reinício do PC.
- **Checkout mais rápido** — busca volta ao foco após cada item; total e quantidade sempre visíveis; ajuda de atalhos (F1) sem sair da venda; toasts padronizados para sucesso e avisos.
- **Venda em espera** — pause o carrinho para atender outro cliente e retome depois, sem perder itens.
- **PIX com status na tela** — acompanhe geração do QR, pagamento, expiração e gere novo QR em poucos cliques, sem esvaziar o carrinho.
- **Estoque no ato da venda** — reserva ao adicionar itens; aviso ou bloqueio quando faltar produto (conforme política da loja); sugestão de substituto quando o item estiver esgotado.
- **Depois da venda** — trocas e devoluções pelo **código da venda**, com lista de itens e menos idas ao gerente.
- **Caixa mais seguro** — alerta quando o dinheiro físico passar do limite configurado (lembrete de sangria); confirmação só em ações críticas; motivo obrigatório ao cancelar venda ou item.
- **Perfis e supervisão** — mensagens claras quando o perfil não permitir uma ação; senha do supervisor para desconto acima do limite; bloqueio por inatividade com PIN em caixa compartilhado.
- **Backup automático** — cópia do banco local após fechar o turno (pasta `backups` no app; falha de cópia não impede o fechamento). Ative ou desative com `PDV_BACKUP_APOS_FECHAMENTO`.
- **Licença CaraCore Seed** — integração opcional (`PDV_SEED_*`): em modo degradado o sistema informa o status e orienta renovação antes de bloquear novas vendas.
- **Fiscal transparente** — fila de documentos visível; mensagens em linguagem de loja; contingência offline para continuar vendendo quando a SEFAZ não responder (homologação real ainda depende de credenciais do contador).
- **Gestão e relatórios** — telas vazias com atalho para nova venda; tour rápido no primeiro login; exportação do dashboard em PDF (cupom segue fila de impressão da loja).
- **LGPD no balcão** — painel do titular recolhível em telas menores, sem atrapalhar o fluxo de venda.
- **Desempenho** — consultas de auditoria e painel operacional mais ágeis em lojas com histórico grande.

### Pacotes e integridade

- Republicação dos instaladores v0.1.0 com build da oficina (02/06/2026).
- NSIS, MSI pt-BR e ZIP portátil com novos hashes SHA256 (ver `SHA256SUMS.txt` na release).
- Metadados: `RELEASE_MANIFEST.json` atualizado na tag `v0.1.0`.

### Configuração opcional (TI / gestor)

| Variável | Uso |
| -------- | --- |
| `PDV_BACKUP_APOS_FECHAMENTO` | `1` (padrão) — backup após fechamento de turno |
| `PDV_CAIXA_LIMITE_SANGRIA` | Valor em reais para alerta de dinheiro no caixa (ex.: `1500`) |
| `PDV_SEED_MODE` | `off` / integração com licença CaraCore Seed |
| `PDV_SEED_LICENSE_KEY` / `PDV_SEED_LICENSE_FILE` | Chave ou arquivo de licença Seed |

Documentação técnica completa permanece na oficina (`caracore-rust-pdv`).

---

## v0.1.0 — 2026-05-31

- Primeira release pública piloto Windows (Tauri 2 + Rust).
- Instaladores em **Português do Brasil**: NSIS (`*-setup.exe`), MSI (`*_pt-BR.msi`), ZIP portátil.
- Metadados padrão: `SHA256SUMS.txt`, `RELEASE_MANIFEST.json`.
- Página de download com três formatos + verificação de integridade.

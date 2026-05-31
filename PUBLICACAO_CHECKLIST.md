# Checklist de Publicação — CaraCore PDV v3 (Rust) Loja

Padrão do ecossistema `D:/dev/caracore-{produto}-releases`.

## 1. Build na oficina

Repositório: `D:/dev/caracore-pdv-rust` (GitHub: `caracore-rust-pdv`)

```powershell
cd D:/dev/caracore-pdv-rust
python tools/release_gate.py --bundle-installer --skip-ui-smokes --skip-icon
python tools/package_pilot_zip.py
```

## 2. Publicar release (artefatos binários)

```powershell
python tools/publish_release_delivery.py --include-zip --skip-smoke
```

Destino: https://github.com/chmulato/caracore-rust-pdv-releases/releases

Token local: `token.txt` com `TOKEN_DELIVERY_CC_PDV_RUST_TO_REALEASES=...`

Artefatos obrigatórios por release:

| Arquivo | Papel |
| ------- | ----- |
| `*-setup.exe` | Instalador NSIS (lojista) |
| `*.msi` | Instalador MSI (TI) |
| `CaraCore-PDV-v*-windows.zip` | Pacote piloto portátil |
| `SHA256SUMS.txt` | Hashes oficiais |
| `RELEASE_MANIFEST.json` | Manifesto técnico da loja |

## 3. Atualizar vitrine (esta loja)

Repositório: `D:/dev/caracore-pdv-rust-releases`

```powershell
git -C D:/dev/caracore-pdv-rust-releases status --short --branch
```

Conferir:

- [ ] `docs/download.html` lista NSIS, MSI e ZIP via API GitHub
- [ ] `README.md` — tabela de versão atual
- [ ] `CHANGELOG.md` — entrada da versão
- [ ] GitHub Pages: branch `master`, pasta `/docs`

Commit sugerido:

```text
chore(store): alinha download e documentacao da release v0.1.0
```

## 4. Push loja + validar Pages

```powershell
git -C D:/dev/caracore-pdv-rust-releases push origin master
```

Validar: https://chmulato.github.io/caracore-rust-pdv-releases/download.html

## 5. Ecossistema

| Papel | Repositório |
| ----- | ----------- |
| Oficina Rust | `caracore-rust-pdv` |
| Loja Rust | `caracore-rust-pdv-releases` (este) |
| Linha Java | `caracore-pdv-releases` / https://pdv.caracore.com.br/ |

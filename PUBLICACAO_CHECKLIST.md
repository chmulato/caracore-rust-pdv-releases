# Checklist de Publicação — Cara Core PDV Desktop (Rust + Tauri) Loja

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
| `*-setup.exe` | Instalador NSIS em português do Brasil (lojista) |
| `*_pt-BR.msi` | Instalador MSI WiX pt-BR (TI) |
| `CaraCore-PDV-v*-windows.zip` | Pacote piloto portátil (LEIA-ME em pt-BR) |
| `SHA256SUMS.txt` | Hashes oficiais |
| `RELEASE_MANIFEST.json` | Manifesto técnico da loja |

## 3. Atualizar vitrine (esta loja)

Repositório: `D:/dev/caracore-pdv-rust-releases`

```powershell
git -C D:/dev/caracore-pdv-rust-releases status --short --branch
```

Conferir:

- [ ] `docs/download.html` lista NSIS, MSI pt-BR e ZIP via API GitHub
- [ ] `docs/assets/js/releases.js` prioriza MSI `*_pt-BR.msi`
- [ ] `README.md` — tabela de versão atual
- [ ] `CHANGELOG.md` — entrada da versão
- [ ] GitHub Pages: branch `master`, pasta `/docs`

Commit sugerido:

```text
chore(store): alinha loja e download para instaladores pt-BR
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

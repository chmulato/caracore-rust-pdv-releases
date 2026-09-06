#!/usr/bin/env python3
"""Atualiza docs/assets/data/release-latest.json com a última release do GitHub."""

from __future__ import annotations

import argparse
import json
import pathlib
import sys
import urllib.error
import urllib.request


def fetch_release(owner: str, repo: str, tag: str) -> dict:
    if tag:
        url = f"https://api.github.com/repos/{owner}/{repo}/releases/tags/{tag}"
    else:
        url = f"https://api.github.com/repos/{owner}/{repo}/releases/latest"
    req = urllib.request.Request(
        url,
        headers={
            "Accept": "application/vnd.github+json",
            "User-Agent": "caracore-rust-pdv-releases-manifest-sync",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        raise RuntimeError(
            f"falha ao consultar {url}: HTTP {exc.code}"
        ) from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(f"falha de rede ao consultar {url}: {exc}") from exc


def normalize_release(payload: dict) -> dict:
    assets = payload.get("assets") or []
    normalized_assets = []
    for asset in assets:
        name = asset.get("name")
        url = asset.get("browser_download_url")
        if not name or not url:
            continue
        item = {"name": name, "browser_download_url": url}
        digest = asset.get("digest") or ""
        if digest.startswith("sha256:"):
            item["sha256"] = digest.split(":", 1)[1]
        normalized_assets.append(item)
    return {
        "tag_name": payload.get("tag_name"),
        "name": payload.get("name"),
        "published_at": payload.get("published_at"),
        "html_url": payload.get("html_url"),
        "platforms": ["windows-x64"],
        "assets": normalized_assets,
    }


def write_manifest(path: pathlib.Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Sincroniza manifesto estático de release para a loja."
    )
    parser.add_argument("--owner", default="chmulato", help="Owner do repositório no GitHub.")
    parser.add_argument(
        "--repo",
        default="caracore-pdv-releases",
        help="Repositório de releases no GitHub.",
    )
    parser.add_argument(
        "--output",
        default="docs/assets/data/release-latest.json",
        help="Caminho de saída do manifesto.",
    )
    parser.add_argument(
        "--tag",
        default="v0.1.2",
        help="Tag Rust a espelhar. Nunca use /latest neste repo misto.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    output = pathlib.Path(args.output)
    latest = fetch_release(args.owner, args.repo, args.tag)
    manifest = normalize_release(latest)
    write_manifest(output, manifest)
    print(
        f"Manifesto atualizado: {output} -> {manifest.get('tag_name')} "
        f"({len(manifest.get('assets') or [])} assets)"
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except RuntimeError as exc:
        print(f"ERRO: {exc}", file=sys.stderr)
        raise SystemExit(1)

(function () {
  "use strict";

  var root = typeof globalThis !== "undefined" ? globalThis : window;
  var R = root.CaraCoreRustReleases;
  if (!R) return;

  var summaryEl = document.getElementById("release-summary");
  var dateEl = document.getElementById("release-date");
  var grid = document.getElementById("download-grid");
  var fallback = document.getElementById("download-fallback");
  var hint = document.getElementById("download-hint");
  var integrity = document.getElementById("integrity-links");
  var releasesLink = document.getElementById("releases-page-link");
  var btnNsis = document.getElementById("btn-nsis");
  var btnMsi = document.getElementById("btn-msi");
  var btnZip = document.getElementById("btn-zip");
  var btnDeb = document.getElementById("btn-deb");
  var btnAppImage = document.getElementById("btn-appimage");
  var btnDmg = document.getElementById("btn-dmg");
  var heroBtn = document.getElementById("download-hero-btn");
  var heroHash = document.getElementById("download-hero-hash");

  function wireButton(el, asset, labelPrefix) {
    if (!el || !asset) {
      if (el) el.hidden = true;
      return false;
    }
    el.href = asset.browser_download_url;
    el.textContent = labelPrefix + asset.name;
    el.hidden = false;
    return true;
  }

  R.fetchLatestRelease()
    .then(function (data) {
      var label = data.tag_name || "Versão publicada";
      if (summaryEl) {
        summaryEl.textContent = label + (data.name ? " — " + data.name : "");
      }
      if (dateEl && data.published_at) {
        dateEl.textContent = "Publicado em " + data.published_at.slice(0, 10) + ".";
      }
      if (releasesLink && data.html_url) {
        releasesLink.href = data.html_url;
      }

      var assets = data.assets || [];
      var nsis = R.pickNsis(assets);
      var msi = R.pickMsi(assets);
      var zip = R.pickZip(assets);
      var deb = R.pickDeb(assets);
      var appimage = R.pickAppImage(assets);
      var dmg = R.pickDmg(assets);
      var sums = R.pickSha256Sums(assets);
      var manifest = R.pickManifest(assets);

      var any = wireButton(btnNsis, nsis, "Baixar ")
        | wireButton(btnMsi, msi, "Baixar ")
        | wireButton(btnZip, zip, "Baixar ")
        | wireButton(btnDeb, deb, "Baixar ")
        | wireButton(btnAppImage, appimage, "Baixar ")
        | wireButton(btnDmg, dmg, "Baixar ");

      if (any) {
        if (grid) grid.hidden = false;
        if (fallback) fallback.hidden = true;
        if (hint) hint.textContent = "Confirme a integridade do arquivo antes de executar.";
        var heroAsset = nsis || msi || zip || deb || appimage || dmg;
        if (heroBtn && heroAsset) {
          heroBtn.href = heroAsset.browser_download_url;
          heroBtn.textContent = "Baixar " + heroAsset.name;
        } else if (heroBtn && data.html_url) {
          heroBtn.href = data.html_url;
        }
      } else if (hint) {
        hint.textContent = "Release sem anexos reconhecidos. Abra a página do GitHub.";
      }

      if (heroHash && sums) {
        heroHash.innerHTML =
          'Integridade: <a href="' +
          sums.browser_download_url +
          '" rel="noopener noreferrer" style="color:#fff;text-decoration:underline;">baixar lista de verificação</a>';
      }

      var parts = [];
      if (sums) {
        parts.push(
          '<a class="ext-link" href="' +
            sums.browser_download_url +
            '" rel="noopener noreferrer">Lista de verificação</a>'
        );
      }
      if (manifest) {
        parts.push(
          '<a class="ext-link" href="' +
            manifest.browser_download_url +
            '" rel="noopener noreferrer">Detalhes da release</a>'
        );
      }
      if (integrity && parts.length) {
        integrity.hidden = false;
        integrity.innerHTML = "Arquivos de conferência: " + parts.join(" · ");
      }
    })
    .catch(function () {
      if (summaryEl) summaryEl.textContent = "Nenhuma versão publicada no momento.";
      if (hint) hint.textContent = "Para piloto antecipado: suporte@caracore.com.br.";
    });
})();

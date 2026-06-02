(function (global) {
  "use strict";

  var OWNER = "chmulato";
  var REPO = "caracore-rust-pdv-releases";
  var RELEASES_PAGE = "https://github.com/" + OWNER + "/" + REPO + "/releases";
  var RELEASES_LATEST = RELEASES_PAGE + "/latest";
  var RELEASES_TAG_V011 = RELEASES_PAGE + "/tag/v0.1.1";
  var API_LATEST = "https://api.github.com/repos/" + OWNER + "/" + REPO + "/releases/latest";
  var DEFAULT_MSI_LOCALE = "pt-BR";

  function pickAsset(assets, predicate) {
    if (!assets || !assets.length) return null;
    return assets.find(predicate) || null;
  }

  function pickZip(assets) {
    return pickAsset(assets, function (a) {
      return /\.zip$/i.test(a.name) && /windows|win|x64|desktop|pdv/i.test(a.name);
    }) || pickAsset(assets, function (a) { return /\.zip$/i.test(a.name); });
  }

  function pickNsis(assets) {
    return pickAsset(assets, function (a) {
      return /setup\.exe$/i.test(a.name) || (/\.exe$/i.test(a.name) && /setup/i.test(a.name));
    });
  }

  function pickMsi(assets) {
    return pickAsset(assets, function (a) {
      return /\.msi$/i.test(a.name) && a.name.indexOf(DEFAULT_MSI_LOCALE) !== -1;
    }) || pickAsset(assets, function (a) { return /\.msi$/i.test(a.name); });
  }

  function pickSha256Sums(assets) {
    return pickAsset(assets, function (a) { return /^sha256sums\.txt$/i.test(a.name); })
      || pickAsset(assets, function (a) { return /sha256|checksum|sums/i.test(a.name) && /\.txt$/i.test(a.name); });
  }

  function pickManifest(assets) {
    return pickAsset(assets, function (a) { return /^release_manifest\.json$/i.test(a.name); });
  }

  function pickDeb(assets) {
    return pickAsset(assets, function (a) { return /\.deb$/i.test(a.name); });
  }

  function pickAppImage(assets) {
    return pickAsset(assets, function (a) { return /\.appimage$/i.test(a.name); });
  }

  function pickDmg(assets) {
    return pickAsset(assets, function (a) { return /\.dmg$/i.test(a.name); });
  }

  function fetchLatestRelease() {
    return fetch(API_LATEST, { headers: { Accept: "application/vnd.github+json" } }).then(function (res) {
      if (!res.ok) throw new Error("no_release");
      return res.json();
    });
  }

  global.CaraCoreRustReleases = {
    OWNER: OWNER,
    REPO: REPO,
    RELEASES_PAGE: RELEASES_PAGE,
    RELEASES_LATEST: RELEASES_LATEST,
    RELEASES_TAG_V011: RELEASES_TAG_V011,
    DEFAULT_MSI_LOCALE: DEFAULT_MSI_LOCALE,
    fetchLatestRelease: fetchLatestRelease,
    pickZip: pickZip,
    pickNsis: pickNsis,
    pickMsi: pickMsi,
    pickSha256Sums: pickSha256Sums,
    pickManifest: pickManifest,
    pickDeb: pickDeb,
    pickAppImage: pickAppImage,
    pickDmg: pickDmg
  };
})(typeof window !== "undefined" ? window : this);

(function () {
  "use strict";

  var TAG_URL = "https://github.com/chmulato/caracore-pdv-releases/releases/tag/v0.1.2";
  var root = typeof globalThis !== "undefined" ? globalThis : window;
  var R = root.CaraCoreRustReleases;

  var releasesLink = document.getElementById("releases-page-link");
  var quickReleases = document.getElementById("quick-releases");
  if (releasesLink) releasesLink.href = TAG_URL;
  if (quickReleases) quickReleases.href = TAG_URL;

  if (!R) return;

  R.fetchLatestRelease()
    .then(function (data) {
      if (data && data.html_url && data.html_url.indexOf("/tag/") !== -1) {
        if (releasesLink) releasesLink.href = data.html_url;
        if (quickReleases) quickReleases.href = data.html_url;
      }
    })
    .catch(function () {
      /* Tabela e SHA256 já estão no HTML estático da tag v0.1.2. */
    });
})();

(function () {
  "use strict";

  var root = document.querySelector("[data-demo-tour]");
  if (!root) return;

  var steps = root.querySelectorAll("[data-demo-step]");
  var panels = root.querySelectorAll("[data-demo-panel]");
  var img = root.querySelector("[data-demo-img]");
  var caption = root.querySelector("[data-demo-caption]");

  function activate(stepId) {
    steps.forEach(function (btn) {
      var on = btn.getAttribute("data-demo-step") === stepId;
      btn.classList.toggle("demo-tour__step--active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    panels.forEach(function (panel) {
      var on = panel.getAttribute("data-demo-panel") === stepId;
      panel.hidden = !on;
    });
    if (img && caption) {
      var panel = root.querySelector('[data-demo-panel="' + stepId + '"]');
      if (panel) {
        var panelImg = panel.querySelector("img");
        var panelCap = panel.querySelector("[data-demo-panel-caption]");
        if (panelImg) {
          img.src = panelImg.getAttribute("src");
          img.alt = panelImg.getAttribute("alt") || "";
        }
        if (panelCap) {
          caption.innerHTML = panelCap.innerHTML;
        }
      }
    }
  }

  steps.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activate(btn.getAttribute("data-demo-step"));
    });
  });

  var initial = root.getAttribute("data-demo-initial") || "vendas";
  activate(initial);
})();

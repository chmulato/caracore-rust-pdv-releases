(function () {
  "use strict";

  var root = document.querySelector("[data-demo-tour]");
  if (!root) return;

  var steps = root.querySelectorAll("[data-demo-step]");
  var caption = root.querySelector("[data-demo-caption]");

  function activate(stepId) {
    steps.forEach(function (btn) {
      var on = btn.getAttribute("data-demo-step") === stepId;
      btn.classList.toggle("demo-tour__step--active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });

    if (!caption) return;

    var panel = root.querySelector('[data-demo-panel="' + stepId + '"]');
    var panelCap = panel && panel.querySelector("[data-demo-panel-caption]");
    if (panelCap) {
      caption.innerHTML = panelCap.innerHTML;
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

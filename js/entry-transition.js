(function () {
  var landing = document.querySelector(".landing");
  var trigger = document.querySelector(".hero__logo-link");
  var spider = document.getElementById("entrySpider");

  if (!landing || !trigger || !spider) {
    return;
  }

  var entering = false;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function navigate() {
    window.location.href = trigger.getAttribute("href") || "./page/home.html";
  }

  function startEntry(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (entering) {
      return;
    }
    entering = true;

    trigger.setAttribute("aria-disabled", "true");
    trigger.style.pointerEvents = "none";

    if (reduceMotion.matches) {
      navigate();
      return;
    }

    spider.classList.add("spider-visible");

    window.requestAnimationFrame(function () {
      spider.classList.add("spider-drop");
    });

    window.setTimeout(function () {
      landing.classList.add("page-fadeout");
    }, 1450);

    window.setTimeout(navigate, 2650);
  }

  trigger.addEventListener("click", startEntry);
  trigger.addEventListener("touchend", startEntry, { passive: false });
  trigger.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      startEntry(event);
    }
  });
})();

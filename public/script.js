const hint = document.querySelector(".hint");
const hintBtn = hint.querySelector(".hint-btn");

hintBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = hint.classList.toggle("show");
  hintBtn.setAttribute("aria-expanded", String(open));
});

document.addEventListener("click", () => {
  hint.classList.remove("show");
  hintBtn.setAttribute("aria-expanded", "false");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hint.classList.remove("show");
    hintBtn.setAttribute("aria-expanded", "false");
  }
});

const triggers = document.querySelectorAll(".trigger");

triggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const panel = document.getElementById(
      trigger.getAttribute("aria-controls"),
    );
    const isOpen = trigger.getAttribute("aria-expanded") === "true";

    triggers.forEach((other) => {
      other.setAttribute("aria-expanded", "false");
      document
        .getElementById(other.getAttribute("aria-controls"))
        .classList.remove("open");
    });

    if (!isOpen) {
      trigger.setAttribute("aria-expanded", "true");
      panel.classList.add("open");
    }
  });
});

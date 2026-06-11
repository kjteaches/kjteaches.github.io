function toggle(btn) {
  const panel = btn.nextElementSibling;
  const isOpen = btn.classList.contains("open");

  document.querySelectorAll(".trigger").forEach((t) => {
    t.classList.remove("open");
    t.setAttribute("aria-expanded", "false");
    t.nextElementSibling.style.maxHeight = null;
  });

  if (!isOpen) {
    btn.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const openFirst = () => toggle(document.querySelector(".item .trigger"));
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(openFirst);
  } else {
    openFirst();
  }
});

window.addEventListener("resize", () => {
  const openTrigger = document.querySelector(".trigger.open");
  if (!openTrigger) return;
  const panel = openTrigger.nextElementSibling;
  panel.style.maxHeight = "none";
  const height = panel.scrollHeight;
  panel.style.maxHeight = height + "px";
});

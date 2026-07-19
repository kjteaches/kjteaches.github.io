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

function toggleRecent(btn) {
  const panel = btn.nextElementSibling;
  const isOpen = btn.classList.toggle("open");
  btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  panel.style.maxHeight = isOpen ? panel.scrollHeight + "px" : null;
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
  document
    .querySelectorAll(".trigger.open, .recent-toggle.open")
    .forEach((openBtn) => {
      const panel = openBtn.nextElementSibling;
      panel.style.maxHeight = "none";
      const height = panel.scrollHeight;
      panel.style.maxHeight = height + "px";
    });
});

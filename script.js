function toggle(btn) {
        const panel = btn.nextElementSibling;
        const isOpen = btn.classList.contains("open");

        // Close all
        document.querySelectorAll(".trigger").forEach((t) => {
          t.classList.remove("open");
          t.nextElementSibling.style.maxHeight = null;
        });

        // Open clicked if it was closed
        if (!isOpen) {
          btn.classList.add("open");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      }


document.addEventListener('DOMContentLoaded', () => {
  document.fonts.ready.then(() => {
    toggle(document.querySelector('.item .trigger'));
  });
});

function scaleToFit() {
  const designW = 1280;
  const designH = 720;
  const scale = Math.min(window.innerWidth / designW, window.innerHeight / designH);
  document.body.style.transform = `scale(${scale})`;
  document.body.style.transformOrigin = 'center center';
}

scaleToFit();
window.addEventListener('resize', scaleToFit);
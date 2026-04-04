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
  toggle(document.querySelector('.item .trigger'));
});
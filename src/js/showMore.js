function initShowMore(
  containerSelector,
  textSelector,
  buttonSelector,
  lines = 2
) {
  const containers = document.querySelectorAll(containerSelector);
  if (!containers.length) return;

  containers.forEach((container) => {
    const text = container.querySelector(textSelector);
    const btn = container.querySelector(buttonSelector);

    if (!text || !btn) return;

    btn.addEventListener("click", () => {
      const style = window.getComputedStyle(text);
      const lineClamp = text.style.webkitLineClamp || style.webkitLineClamp;

      if (lineClamp === "unset" || lineClamp === "none") {
        text.style.webkitLineClamp = lines;
        btn.textContent = "Pokaż więcej";
      } else {
        text.style.webkitLineClamp = "unset";
        btn.textContent = "Pokaż mniej";
      }
    });
  });
}

export default function showMore() {
  initShowMore(".hero", ".hero__text", ".hero__show", 2);
  initShowMore(".range__text__container", ".range__text", ".range__show", 3);
}

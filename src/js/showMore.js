function showMore() {
  const showMoreBtn = document.querySelector(".hero__show");
  const text = document.querySelector(".hero__text");

  showMoreBtn.onclick = function () {
    const style = window.getComputedStyle(text);
    const lineClamp = text.style.webkitLineClamp || style.webkitLineClamp;

    if (lineClamp === "unset" || lineClamp === "none") {
      text.style.webkitLineClamp = "2";
      showMoreBtn.textContent = "Show more";
    } else {
      text.style.webkitLineClamp = "unset";
      showMoreBtn.textContent = "Show less";
    }
  };
}

export default showMore;

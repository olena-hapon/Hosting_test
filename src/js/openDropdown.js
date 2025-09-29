function openDropdownMenu() {
  const dropdownItems = document.querySelectorAll(".nav__item--has-dropdown");

  dropdownItems.forEach((item) => {
    const link = item.querySelector(".nav__link");
    const dropdown = item.querySelector(".nav__dropdown");
    const icon = item.querySelector(".nav__img");

    link.addEventListener("click", (e) => {
      e.preventDefault();

      dropdownItems.forEach((el) => {
        if (el !== item) {
          el.querySelector(".nav__dropdown").classList.remove("active");
          el.querySelector(".nav__img").classList.remove("rotated");
        }
      });

      dropdown.classList.toggle("active");
      icon.classList.toggle("rotated");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav__item--has-dropdown")) {
      dropdownItems.forEach((item) => {
        item.querySelector(".nav__dropdown").classList.remove("active");
        item.querySelector(".nav__img").classList.remove("rotated");
      });
    }
  });
}

export default openDropdownMenu;

// Loader
setTimeout(() => {
  const loader = document.getElementById("loader");
  loader.classList.add("hidden");
  setTimeout(() => loader.remove(), 600);
}, 5000);

// Theme Switch
const toggleBtn = document.getElementById("toggleTheme");
const html = document.documentElement;
const iconMoon = document.getElementById("icon-moon");
const iconSun = document.getElementById("icon-sun");

toggleBtn.addEventListener("click", () => {
  const nowDark = html.dataset.theme === "dark";
  html.dataset.theme = nowDark ? "light" : "dark";
  iconMoon.style.display = nowDark ? "block" : "none";
  iconSun.style.display = nowDark ? "none" : "block";
});
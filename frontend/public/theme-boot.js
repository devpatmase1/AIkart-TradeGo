(() => {
  const root = document.documentElement;
  let savedTheme = null;

  try {
    savedTheme = window.localStorage.getItem("qa-theme");
  } catch {
    // Storage can be unavailable in restricted iframes and WebViews.
  }

  const dark = false;
  root.classList.remove("dark");
  root.style.colorScheme = "light";
})();

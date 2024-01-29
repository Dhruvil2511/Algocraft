export const updateTheme = (isDark) => {
  const root = document.documentElement;
  if (isDark) {
    root.style.setProperty(
      "--mainTextColor",
      "var(--primary-light-text-color)"
    );
    root.style.setProperty("--mainBgColor", "var(--primary-light-color)");
    root.style.setProperty("--secondaryColor", "var(--secondary-light-color)");
    root.style.setProperty("--itemColor", "var(--item-light-color)");
  } else {
    root.style.setProperty("--mainTextColor", "var(--primary-dark-text-color)");
    root.style.setProperty("--mainBgColor", "var(--primary-dark-color)");
    root.style.setProperty("--secondaryColor", "var(--secondary-dark-color)");
    root.style.setProperty("--itemColor", "var(--item-dark-color)");
  }
};

export const setTheme = (themeName) => {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
};

export const keepTheme = () => {
  if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTheme("theme-dark");
    } else if (localStorage.getItem("theme") === "theme-light") {
      setTheme("theme-light");
    }
  } else {
    setTheme("theme-dark");
  }
};
export const toggleTheme = () => {
  if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTheme("theme-light");
    } else if (localStorage.getItem("theme") === "theme-light") {
      setTheme("theme-dark");
    } else {
      setTheme("theme-light");
    }
  } else {
    setTheme("theme-dark");
  }
};

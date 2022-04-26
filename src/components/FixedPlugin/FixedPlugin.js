import React, { useEffect } from "react";
import { Button, CustomInput } from "reactstrap";
import { keepTheme, toggleTheme } from "../../utils/theme";
const FixedPlugin = (props) => {
  const [classes, setClasses] = React.useState("dropdown");
  const [darkMode, setDarkMode] = React.useState(false);
  const handleClick = () => {
    if (classes === "dropdown") {
      setClasses("dropdown show");
    } else {
      setClasses("dropdown");
    }
  };
  useEffect(() => {
    keepTheme();
  });

  useEffect(() => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
      document.body.classList.toggle("white-content");
    }
  }, []);

  const handleActiveMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("white-content");
    toggleTheme();
  };
  return (
    <div className="fixed-plugin">
      <div className={classes}>
        <a
          href="#pablo"
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          <i className="fa fa-cog fa-2x" />
        </a>
        <ul className="dropdown-menu show">
          <li className="header-title">Change Mode</li>
          <li className="adjustments-line" style={{ paddingBottom: "30px" }}>
            <div className="togglebutton switch-change-color mt-3 d-flex align-items-center justify-content-center">
              <span className="label-switch ml-n3">DARK MODE</span>
              <CustomInput
                type="switch"
                id="switch-2"
                onChange={handleActiveMode}
                checked={!darkMode}
                className="mt-n4"
              />

              <span className="label-switch">LIGHT MODE</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FixedPlugin;

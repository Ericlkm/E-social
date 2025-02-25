import { ThemeContext } from "../utils/themeContext";
import { useContext, useState } from "react";
import logo from "../img/logo.png";
import { CiCloudMoon, CiCloudSun, CiMenuBurger } from "react-icons/ci";
import "../sass/navbar.scss";
import { Link } from "react-router-dom";
import auth from "../utils/auth";
import { AuthContext } from "../utils/authContext";
import { Dropdown, Space } from "antd";
import { LiaTimesSolid } from "react-icons/lia";
import { CiUser, CiLogout } from "react-icons/ci";

export function Navbar() {
  const { user } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === "purple" ? "white" : "purple");
  };

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  const items = [
    {
      key: "1",
      label: <Link to="/me">Profile</Link>,
      icon: <CiUser />,
    },
    {
      key: "2",
      label: <span onClick={() => auth.logout()}>Logout</span>,
      icon: <CiLogout />,
    },
    {
      key: "3",
      label: (
        <span onClick={toggleTheme}>
          {theme === "white" ? "Dark Mode" : "Light Mode"}
        </span>
      ),
      icon: theme === "white" ? <CiCloudMoon /> : <CiCloudSun />,
    },
  ];
  const links = [
    {
      uri: "/pricing",
      label: "Pricing",
    },
    {
      uri: "/about",
      label: "About",
    },
    {
      uri: "/contact",
      label: "Contact",
    },
  ];
  return (
    <>
      <div className="navbar">
        <div className="nav-card">
          <div className="nav-left">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </div>
          </div>
          <div className="nav-right">
            <div className="links">
              {links.map((link, index) => {
                return (
                  <Link to={link.uri} key={index}>
                    {link.label}
                  </Link>
                );
              })}
            </div>
            {auth.loggedIn() ? (
              <>
                <div className="userInfo">
                  <Dropdown menu={{ items }}>
                    <Space>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <span>{user.username}</span>
                        <img src={"/uploads/" + user.avatar} alt="" />
                      </div>
                    </Space>
                  </Dropdown>
                </div>
              </>
            ) : (
              <>
                <div className="login">
                  <Link to="/login">Login</Link>
                </div>
              </>
            )}
            <div className="menu-icon">
              <span>
                <CiMenuBurger onClick={toggleMenu} />
              </span>
            </div>
          </div>
          <div className={toggle ? "sidebar" : "sidebar-hidden"}>
            <div className="menu">
              <span className="close" onClick={toggleMenu}>
                <LiaTimesSolid style={{ color: "white" }} />
              </span>
              <div className="menu-links">
                {auth.loggedIn() ? (
                  <div className="userInfo">
                    <Dropdown menu={{ items }}>
                      <Space>
                        <span>{user.username}</span>
                      </Space>
                    </Dropdown>
                  </div>
                ) : null}
                {links.map((link, index) => {
                  return (
                    <Link to={link.uri} key={index}>
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

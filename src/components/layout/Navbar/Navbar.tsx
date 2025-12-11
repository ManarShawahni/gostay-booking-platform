import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "../../../assets/Logo.svg";
import { useAuth } from "../../../hooks/useAuth";
import { useCart } from "../../../hooks/useCart";
import {
  ShoppingCartIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { items } = useCart();

  const [activeItem, setActiveItem] = useState("Home");

  useEffect(() => {
    if (pathname === "/search") setActiveItem("Search");
    else if (pathname !== "/") setActiveItem("");
    else setActiveItem("Home");
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const dealsEl = document.getElementById("deals-section");
      const destEl = document.getElementById("dest-section");

      const dealsTop = dealsEl?.offsetTop ?? Infinity;
      const destTop = destEl?.offsetTop ?? Infinity;

      const center = window.scrollY + window.innerHeight / 2;

      let next = "Home";
      if (center >= destTop) next = "Destinations";
      else if (center >= dealsTop) next = "Deals";

      setActiveItem(next);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);


  const scrollToSection = (label: string, id: string) => {
    const scroll = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    if (pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 200);
    } else {
      scroll();
    }
  };

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Search", to: "/search" },
    { label: "Deals", action: () => scrollToSection("Deals", "deals-section") },
    { label: "Destinations", action: () => scrollToSection("Destinations", "dest-section") },
  ];

  return (
    <header className={styles.navbar}>
      <div className={styles.navInner}>
        <Link
          to="/"
          className={styles.logo}
          onClick={() => pathname !== "/" && navigate("/")}
        >
          <img src={Logo} alt="GoStay" />
        </Link>

        <nav className={styles.centerLinks}>
          {navItems.map((item) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                className={`${styles.link} ${
                  activeItem === item.label ? styles.active : ""
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                type="button"
                className={`${styles.link} ${
                  activeItem === item.label ? styles.active : ""
                }`}
                onClick={item.action}
              >
                {item.label}
              </button>
            )
          )}
        </nav>

        <div className={styles.rightSection}>
          <Link to="/cart" className={styles.iconBtn}>
            <ShoppingCartIcon />
            {items.length > 0 && (
              <span className={styles.badge}>{items.length}</span>
            )}
          </Link>

          {isAuthenticated ? (
            <button
              type="button"
              className={styles.logoutBtn}
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              <ArrowRightOnRectangleIcon />
            </button>
          ) : (
            <Link to="/login" className={styles.iconBtn}>
              <ArrowRightOnRectangleIcon />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

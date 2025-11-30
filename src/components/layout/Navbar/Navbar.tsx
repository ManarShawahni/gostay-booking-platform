import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "../../../assets/Logo.svg";
import { useAuth } from "../../../hooks/useAuth";
import { ShoppingCartIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

import { useCart } from "../../../hooks/useCart";

export const Navbar = () => {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { items } = useCart();


  const scrollToSection = (id: string) => {
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
    { 
      label: "Deals",
      action: () => scrollToSection("deals-section"),
    },
    { 
      label: "Destinations",
      action: () => scrollToSection("dest-section"),
    },
  ];


  return (
    <header className={styles.navbar}>
      <div className={styles.navInner}>
        
        <Link to="/" className={styles.logo}>
          <img src={Logo} alt="GoStay" />
        </Link>

        <nav className={styles.centerLinks}>
          {navItems.map((item) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                className={`${styles.link} ${
                  pathname === item.to ? styles.active : ""
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                type="button"
                className={styles.link}
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
                {items.length > 0 && <span className={styles.badge}>{items.length}</span>}
            </Link>
          {isAuthenticated ? (
            <div className={styles.iconBtn} onClick={logout}>
              <ArrowRightOnRectangleIcon className={styles.logout} />
            </div>
          ) : (
            <Link
              to="/login"
              className={styles.iconBtn}
            >
              <ArrowRightOnRectangleIcon />
            </Link>
          )}
        </div>

      </div>
    </header>
  );
};

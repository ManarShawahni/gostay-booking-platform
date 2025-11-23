import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles/AppLayout.module.css";
import { useAuth } from "./hooks/useAuth";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth();

  const hideLayout = location.pathname === "/login";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.appContainer}>
      {!hideLayout && (
        <header className={styles.header}>
          <div className={styles.navContainer}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoPurple}>Go</span>
              <span className={styles.logoCoral}>Stay</span>
            </Link>

            <nav className={styles.links}>
              <Link to="/" className={styles.link}>Home</Link>
              <Link to="/search" className={styles.link}>Search</Link>
              <Link to="/admin" className={styles.link}>Admin</Link>

            {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className={styles.link}
                  style={{ color: "#FF6B6B", fontWeight: 600 }}
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className={styles.link}>Login</Link>
              )}
            </nav>

          </div>
        </header>
      )}

      <main className={styles.mainNoBg}>
        <Outlet />
      </main>

      {!hideLayout && (
        <footer className={styles.footer}>
          <p className={styles.footerTitle}>GoStay</p>
          <p className={styles.footerSub}>Go Anywhere. Stay Everywhere.</p>
          <p className={styles.footerCopy}>© {new Date().getFullYear()} GoStay. All rights reserved.</p>
        </footer>
      )}
    </div>
  );
}

export default App;

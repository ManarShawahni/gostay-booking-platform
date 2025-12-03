import { Outlet, useLocation } from "react-router-dom";
import styles from "./styles/AppLayout.module.css";

import { Navbar } from "./components/layout/Navbar/Navbar";
import { Footer } from "./components/layout/Footer/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  return (
    <div className={styles.appContainer}>
       <ScrollToTop />
      {!hideLayout && <Navbar />}

      <main className={styles.mainNoBg}>
        <Outlet />
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../AdminSidebar/AdminSidebar";
import { AdminHeader } from "../AdminHeader/AdminHeader";
import { Bars3Icon } from "@heroicons/react/24/outline";
import styles from "./AdminLayout.module.css";

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className={styles.layout}>
      <AdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {!sidebarOpen && (
        <button 
          className={styles.floatingMenuBtn} 
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <Bars3Icon />
        </button>
      )}

      <div className={`${styles.mainArea} ${!sidebarOpen ? styles.sidebarClosed : ""}`}>
        <AdminHeader />

        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

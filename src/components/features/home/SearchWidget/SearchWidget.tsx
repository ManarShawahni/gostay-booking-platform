import React from "react";
import styles from "./SearchWidget.module.css";
import { MagnifyingGlassIcon, MapPinIcon, CalendarIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export const SearchWidget: React.FC = () => {
  return (
    <div className={styles.widget}>

      {/* DESTINATION */}
      <div className={styles.field}>
        <label className={styles.label}>
          <MapPinIcon className={styles.icon} />
          Where to?
        </label>
        <input type="text" placeholder="Where are you going?" className={styles.input} />
      </div>

      <div className={styles.divider}></div>

      {/* CHECK-IN */}
      <div className={styles.field}>
        <label className={styles.label}>
          <CalendarIcon className={styles.icon} />
          Check-in
        </label>
        <input type="date" className={styles.input} />
      </div>

      <div className={styles.divider}></div>

      {/* CHECK-OUT */}
      <div className={styles.field}>
        <label className={styles.label}>
          <CalendarIcon className={styles.icon} />
          Check-out
        </label>
        <input type="date" className={styles.input} />
      </div>

      <div className={styles.divider}></div>

      {/* GUESTS */}
      <div className={styles.field}>
        <label className={styles.label}>
          <UserGroupIcon className={styles.icon} />
          Guests
        </label>

        <div className={styles.selectWrapper}>
          <select className={styles.input}>
            {[1,2,3,4,5].map(n => (
              <option key={n}>{n} {n > 1 ? "Adults" : "Adult"}</option>
            ))}
          </select>
        </div>
      </div>

      {/* SEARCH BUTTON */}
      <button className={styles.searchBtn}>
        <MagnifyingGlassIcon className={styles.searchIcon} />
      </button>

    </div>
  );
};
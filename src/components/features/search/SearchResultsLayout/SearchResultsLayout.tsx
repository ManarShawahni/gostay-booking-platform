import React from "react";
import styles from "./SearchResultsLayout.module.css";

interface Props {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export const SearchResultsLayout = ({ sidebar, children }: Props) => {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
};

import styles from "./Table.module.css";

interface Column<T> {
  label: string;
  accessor: keyof T;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

export const Table = <T extends object>({
  data,
  columns,
  actions,
  emptyMessage = "No data available",
}: TableProps<T>) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.accessor)}>{col.label}</th>
            ))}
            {actions && <th className={styles.actionsCol}>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className={styles.empty}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={String(col.accessor)}>
                    {col.render ? col.render(item) : (item[col.accessor] as unknown as string)}
                  </td>
                ))}
                {actions && <td>{actions(item)}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

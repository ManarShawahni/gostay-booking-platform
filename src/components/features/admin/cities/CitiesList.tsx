import { City } from "../../../../types/admin.types";
import { Table } from "../../../common/Table/Table";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import styles from "./Cities.module.css";

interface Props {
  cities: City[];
  onEdit: (city: City) => void;
  onDelete: (city: City) => void;
}

export const CitiesList = ({ cities, onEdit, onDelete }: Props) => {
  const columns: { label: string; accessor: keyof City }[] = [
    { label: "ID", accessor: "id" },
    { label: "City", accessor: "name" },
    { label: "Description", accessor: "description" },
  ];

  return (
    <Table
      data={cities}
      columns={columns}
      actions={(city) => (
        <div className={styles.actions}>
          <button 
            className={styles.iconBtn}
            onClick={() => onEdit(city)}
            aria-label="Edit"
            title="Edit"
          >
            <PencilIcon />
          </button>
          <button 
            className={`${styles.iconBtn} ${styles.deleteBtn}`}
            onClick={() => onDelete(city)}
            aria-label="Delete"
            title="Delete"
          >
            <TrashIcon />
          </button>
        </div>
      )}
      emptyMessage="No cities found."
    />
  );
};

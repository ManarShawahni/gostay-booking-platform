import { Hotel } from "../../../../types/admin.types";
import { Table } from "../../../common/Table/Table";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import styles from "./Hotels.module.css";

interface Props {
  hotels: Hotel[];
  onEdit: (hotel: Hotel) => void;
  onDelete: (hotel: Hotel) => void;
}

export const HotelsList = ({ hotels, onEdit, onDelete }: Props) => {
  const columns = [
    { label: "ID", accessor: "id" as const },
    { label: "Hotel Name", accessor: "hotelName" as const },
    { label: "Type", accessor: "hotelType" as const },
    { label: "Stars", accessor: "starRating" as const },
    { label: "City ID", accessor: "cityId" as const },
  ];

  return (
    <Table
      data={hotels}
      columns={columns}
      actions={(hotel) => (
        <div className={styles.actions}>
          <button 
            className={styles.iconBtn}
            onClick={() => onEdit(hotel)}
            aria-label="Edit"
            title="Edit"
          >
            <PencilIcon />
          </button>
          <button 
            className={`${styles.iconBtn} ${styles.deleteBtn}`}
            onClick={() => onDelete(hotel)}
            aria-label="Delete"
            title="Delete"
          >
            <TrashIcon />
          </button>
        </div>
      )}
      emptyMessage="No hotels found."
    />
  );
};

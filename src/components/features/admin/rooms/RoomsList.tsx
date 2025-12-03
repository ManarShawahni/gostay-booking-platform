import { Room } from "../../../../types/admin.types";
import { Table } from "../../../common/Table/Table";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import styles from "./Rooms.module.css";

interface Props {
  rooms: Room[];
  onEdit: (room: Room) => void;
  onDelete: (room: Room) => void;
}

export const RoomsList = ({ rooms, onEdit, onDelete }: Props) => {
  const columns = [
    { label: "Room Number", accessor: "roomNumber" as const },
    { label: "Hotel", accessor: "hotelName" as const },
    { 
      label: "Price", 
      accessor: "price" as const,
      render: (room: Room) => `$${room.price}`
    },
    { 
      label: "Available", 
      accessor: "availability" as const,
      render: (room: Room) => (
        <span className={room.availability ? styles.available : styles.unavailable}>
          {room.availability ? "Yes" : "No"}
        </span>
      )
    },
    { label: "Adults", accessor: "capacityOfAdults" as const },
    { label: "Children", accessor: "capacityOfChildren" as const },
  ];

  return (
    <Table
      data={rooms}
      columns={columns}
      actions={(room) => (
        <div className={styles.actions}>
          <button 
            className={styles.iconBtn}
            onClick={() => onEdit(room)}
            aria-label="Edit"
            title="Edit"
          >
            <PencilIcon />
          </button>
          <button 
            className={`${styles.iconBtn} ${styles.deleteBtn}`}
            onClick={() => onDelete(room)}
            aria-label="Delete"
            title="Delete"
          >
            <TrashIcon />
          </button>
        </div>
      )}
      emptyMessage="No rooms found."
    />
  );
};
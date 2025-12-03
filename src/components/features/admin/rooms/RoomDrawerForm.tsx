import { useEffect, useState } from "react";
import styles from "./Rooms.module.css";
import { Room, RoomPayload } from "../../../../types/admin.types";
import { Input } from "../../../common/Input/Input";
import { Button } from "../../../common/Button/Button";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: RoomPayload) => Promise<void>;
  initialData?: Room | null;
}

export const RoomDrawerForm = ({ open, onClose, onSubmit, initialData }: Props) => {
  const [hotelId, setHotelId] = useState(0);
  const [roomNumber, setRoomNumber] = useState(0);
  const [capacityOfAdults, setAdults] = useState(1);
  const [capacityOfChildren, setChildren] = useState(0);
  const [price, setPrice] = useState(0);
  const [availability, setAvailability] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setHotelId(initialData.hotelId);
      setRoomNumber(initialData.roomNumber);
      setAdults(initialData.capacityOfAdults);
      setChildren(initialData.capacityOfChildren);
      setPrice(initialData.price);
      setAvailability(initialData.availability);
    } else {
      setHotelId(0);
      setRoomNumber(0);
      setAdults(1);
      setChildren(0);
      setPrice(0);
      setAvailability(true);
    }
  }, [initialData, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (hotelId === 0) {
      alert("Please select a hotel");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({
        hotelId,
        roomNumber,
        capacityOfAdults,
        capacityOfChildren,
        price,
        availability,
      });
      onClose();
  
    } catch {
      alert("Failed to save room");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Hotel ID</label>
        <Input
          type="number"
          value={hotelId.toString()}
          placeholder="Hotel ID"
          onChange={(e) => setHotelId(Number(e.target.value))}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Room Number</label>
        <Input
          type="number"
          value={roomNumber.toString()}
          placeholder="Room number"
          onChange={(e) => setRoomNumber(Number(e.target.value))}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Adults Capacity</label>
        <Input
          type="number"
          value={capacityOfAdults.toString()}
          placeholder="Adults capacity"
          onChange={(e) => setAdults(Number(e.target.value))}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Children Capacity</label>
        <Input
          type="number"
          value={capacityOfChildren.toString()}
          placeholder="Children capacity"
          onChange={(e) => setChildren(Number(e.target.value))}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Price ($)</label>
        <Input
          type="number"
          value={price.toString()}
          placeholder="Price"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Availability</label>
        <select
          className={styles.select}
          value={availability ? "true" : "false"}
          onChange={(e) => setAvailability(e.target.value === "true")}
        >
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
      </div>

      <Button type="submit" fullWidth disabled={submitting}>
        {submitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};
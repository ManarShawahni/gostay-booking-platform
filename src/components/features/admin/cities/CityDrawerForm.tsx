import { useState, useEffect } from "react";
import styles from "./Cities.module.css";
import { City } from "../../../../types/admin.types";
import { Input } from "../../../common/Input/Input";
import { Button } from "../../../common/Button/Button";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<City, "id">) => void;
  initialData?: City | null;
}

export const CityDrawerForm = ({ open, onClose, onSubmit, initialData }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description });
    onClose();
  };

  if (!open) return null;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Name</label>
        <Input
          value={name}
          placeholder="City name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Description</label>
        <Input
          value={description}
          placeholder="City description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <Button type="submit" fullWidth>Save</Button>
    </form>
  );
};

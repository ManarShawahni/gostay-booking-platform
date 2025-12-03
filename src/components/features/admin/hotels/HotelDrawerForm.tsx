import { useEffect, useState } from "react";
import styles from "./Hotels.module.css";
import { Hotel } from "../../../../types/admin.types";
import { Input } from "../../../common/Input/Input";
import { Button } from "../../../common/Button/Button";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Hotel, "id">) => void;
  initialData?: Hotel | null;
}

export const HotelDrawerForm = ({ open, onClose, onSubmit, initialData }: Props) => {
  const [hotelName, setHotelName] = useState("");
  const [description, setDescription] = useState("");
  const [hotelType, setHotelType] = useState("");
  const [starRating, setStarRating] = useState(3);
  const [imageUrl, setImageUrl] = useState("");
  const [cityId, setCityId] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  useEffect(() => {
    if (initialData) {
      setHotelName(initialData.hotelName);
      setDescription(initialData.description);
      setHotelType(initialData.hotelType);
      setStarRating(initialData.starRating);
      setImageUrl(initialData.imageUrl);
      setCityId(initialData.cityId);
      setLatitude(initialData.latitude);
      setLongitude(initialData.longitude);
    } else {
      setHotelName("");
      setDescription("");
      setHotelType("");
      setStarRating(3);
      setImageUrl("");
      setCityId(0);
      setLatitude(0);
      setLongitude(0);
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      hotelName,
      description,
      hotelType,
      starRating,
      imageUrl,
      cityId,
      latitude,
      longitude,
    });
    onClose();
  };

  if (!open) return null;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Hotel Name</label>
        <Input
          value={hotelName}
          placeholder="Enter hotel name"
          onChange={(e) => setHotelName(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Description</label>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Hotel Type</label>
        <Input
          value={hotelType}
          placeholder="e.g., Resort, Boutique, Business"
          onChange={(e) => setHotelType(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Star Rating</label>
        <Input
          type="number"
          value={starRating.toString()}
          placeholder="1-5"
          onChange={(e) => setStarRating(Number(e.target.value))}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Image URL</label>
        <Input
          value={imageUrl}
          placeholder="https://..."
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>City ID</label>
        <Input
          type="number"
          value={cityId.toString()}
          placeholder="City ID"
          onChange={(e) => setCityId(Number(e.target.value))}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Latitude</label>
        <Input
          type="number"
          value={latitude.toString()}
          placeholder="Latitude"
          onChange={(e) => setLatitude(Number(e.target.value))}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Longitude</label>
        <Input
          type="number"
          value={longitude.toString()}
          placeholder="Longitude"
          onChange={(e) => setLongitude(Number(e.target.value))}
        />
      </div>

      <Button type="submit" fullWidth>Save</Button>
    </form>
  );
};

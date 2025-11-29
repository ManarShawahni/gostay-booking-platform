import { useState } from "react";
import styles from "./FiltersSidebar.module.css";
import { AmenityTag } from "../../../common/AmenityTag/AmenityTag";
import { useAmenities } from "../../../../hooks/search/useAmenities";

interface FilterValues {
    starRate: number;
    minPrice: number;
    maxPrice: number;
    amenities: string[];
}

interface Props  {
  onChange?: (filters: FilterValues) => void;
}

export const FiltersSidebar = ({ onChange }: Props ) => {
    const { data: list } = useAmenities();

    const [filters, setFilters] = useState<FilterValues>({
    starRate: 0,
    minPrice: 0,
    maxPrice: 1000,
    amenities: [],
  });
    
  const updateFilters = (partial: Partial<FilterValues>) => {
    setFilters((prev) => {
      const updated = { ...prev, ...partial };
      onChange?.(updated);
      return updated;
    });
  };

    const toggleAmenity = (name: string) => {
    const exists = filters.amenities.includes(name);
    const updated = exists
      ? filters.amenities.filter((a) => a !== name)
      : [...filters.amenities, name];

    updateFilters({ amenities: updated });
  };

  const resetFilters = () => {
    const initial = { starRate: 0, minPrice: 0, maxPrice: 1000, amenities: []};
    setFilters(initial);
    onChange?.(initial);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h3 className={styles.title}>Filters</h3>
        <button className={styles.reset} onClick={resetFilters}>
          Reset
        </button>
      </div>

      <div className={styles.block}>
        <label className={styles.label}>Star Rating</label>
        <select
          value={filters.starRate}
          onChange={(e) => updateFilters({ starRate: Number(e.target.value)})}
          className={styles.select}
        >
          <option value={0}>Any</option>
          <option value={5}>★★★★★ (5 Stars)</option>
          <option value={4}>★★★★ (4 Stars)</option>
          <option value={3}>★★★ (3 Stars)</option>
          <option value={2}>★★ (2 Stars)</option>
          <option value={1}>★ (1 Star)</option>
        </select>
      </div>

      <div className={styles.block}>
        <label className={styles.label}>Price Range</label>

        <div className={styles.priceInputs}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Min</label>
            <input
              type="number"
              value={filters.minPrice}
              min={0}
              max={filters.maxPrice}
              onChange={(e) => updateFilters({ minPrice: Number(e.target.value) })
              }
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Max</label>
            <input
              type="number"
              value={filters.maxPrice}
              min={filters.minPrice}
              onChange={(e) => 
                updateFilters({ maxPrice: Number(e.target.value) })
              }
              className={styles.input}
              placeholder="1000"
            />
          </div>
        </div>

        <div className={styles.priceDisplay}>
          ${filters.minPrice} – ${filters.maxPrice}
        </div>
        </div>
      <div className={styles.block}>
        <label className={styles.label}>Amenities</label>
        <div className={styles.tagsWrapper}>
          {list.map((a) => (
            <AmenityTag
              key={a.id}
              label={a.name}
              selected={filters.amenities.includes(a.name)}
              onToggle={() => toggleAmenity(a.name)}
            />
          ))}
        </div>
      </div>

    </aside>
  );
};

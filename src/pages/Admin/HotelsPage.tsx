import { useState, useMemo } from "react";
import { useHotels } from "../../hooks/admin/useHotels";
import { Hotel } from "../../types/admin.types";

import { HotelsList } from "../../components/features/admin/hotels/HotelsList";
import { Drawer } from "../../components/common/Drawer/Drawer";
import { HotelDrawerForm } from "../../components/features/admin/hotels/HotelDrawerForm";
import { ConfirmModal } from "../../components/common/ConfirmModal/ConfirmModal";
import { Button } from "../../components/common/Button/Button";
import { Input } from "../../components/common/Input/Input";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner";
import { SectionHeader } from "../../components/common/SectionHeader/SectionHeader";
import styles from "./AdminPages.module.css";

export default function HotelsPage() {
  const { hotels, loading, createHotel, updateHotel, deleteHotel } = useHotels();

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState<Hotel | null>(null);

  const hotelTypes = useMemo(() => 
    [...new Set(hotels.map((h) => h.hotelType).filter(Boolean))],
    [hotels]
  );

  const filteredHotels = useMemo(() => {
    let result = hotels;
    
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (hotel) =>
          hotel.hotelName?.toLowerCase().includes(q) ||
          hotel.description?.toLowerCase().includes(q)
      );
    }
    
    if (filterType) {
      result = result.filter((hotel) => hotel.hotelType === filterType);
    }
    
    return result;
  }, [hotels, search, filterType]);

  const openCreate = () => {
    setSelectedHotel(null);
    setDrawerOpen(true);
  };

  const openEdit = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setDrawerOpen(true);
  };

  const openDelete = (hotel: Hotel) => {
    setHotelToDelete(hotel);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (hotelToDelete) deleteHotel(hotelToDelete.id);
    setDeleteModalOpen(false);
  };

  return (
    <div className={styles.page}>
      <SectionHeader
        title="Hotels Management"
        subtitle="Manage hotels in the system"
      />

      <div className={styles.toolbar}>
        <Input
          value={search}
          placeholder="Search hotels..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={styles.select}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          {hotelTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <Button onClick={openCreate}>Create Hotel</Button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <HotelsList hotels={filteredHotels} onEdit={openEdit} onDelete={openDelete} />
      )}

      <Drawer
        open={drawerOpen}
        title={selectedHotel ? "Edit Hotel" : "Create Hotel"}
        onClose={() => setDrawerOpen(false)}
      >
        <HotelDrawerForm
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          initialData={selectedHotel}
          onSubmit={(data) =>
            selectedHotel ? updateHotel(selectedHotel.id, data) : createHotel(data)
          }
        />
      </Drawer>

      <ConfirmModal
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Hotel"
        message="Are you sure you want to delete this hotel?"
        confirmLabel="Delete"
      />
    </div>
  );
}

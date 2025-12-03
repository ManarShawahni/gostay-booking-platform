import { useState, useMemo } from "react";
import { useCities } from "../../hooks/admin/useCities";
import { City } from "../../types/admin.types";

import { CitiesList } from "../../components/features/admin/cities/CitiesList";
import { Drawer } from "../../components/common/Drawer/Drawer";
import { CityDrawerForm } from "../../components/features/admin/cities/CityDrawerForm";
import { ConfirmModal } from "../../components/common/ConfirmModal/ConfirmModal";
import { Button } from "../../components/common/Button/Button";
import { Input } from "../../components/common/Input/Input";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner";
import { SectionHeader } from "../../components/common/SectionHeader/SectionHeader";
import styles from "./AdminPages.module.css";

export default function CitiesPage() {
  const { cities, loading, createCity, updateCity, deleteCity } = useCities();

  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [cityToDelete, setCityToDelete] = useState<City | null>(null);

  const filteredCities = useMemo(() => {
    if (!search.trim()) return cities;
    const q = search.toLowerCase();
    return cities.filter(
      (city) =>
        city.name.toLowerCase().includes(q) ||
        city.description.toLowerCase().includes(q)
    );
  }, [cities, search]);

  const openCreate = () => {
    setSelectedCity(null);
    setDrawerOpen(true);
  };

  const openEdit = (city: City) => {
    setSelectedCity(city);
    setDrawerOpen(true);
  };

  const openDelete = (city: City) => {
    setCityToDelete(city);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (cityToDelete) deleteCity(cityToDelete.id);
    setDeleteModalOpen(false);
  };

  return (
    <div className={styles.page}>
      <SectionHeader
        title="Cities Management"
        subtitle="Manage cities in the system"
      />

      <div className={styles.toolbar}>
        <Input
          value={search}
          placeholder="Search cities..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={openCreate}>Create City</Button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <CitiesList cities={filteredCities} onEdit={openEdit} onDelete={openDelete} />
      )}

      <Drawer
        open={drawerOpen}
        title={selectedCity ? "Edit City" : "Create City"}
        onClose={() => setDrawerOpen(false)}
      >
        <CityDrawerForm
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          initialData={selectedCity}
          onSubmit={(data) =>
            selectedCity
              ? updateCity(selectedCity.id, data)
              : createCity(data)
          }
        />
      </Drawer>

      <ConfirmModal
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete City"
        message="Are you sure you want to delete this city?"
        confirmLabel="Delete"
      />
    </div>
  );
}

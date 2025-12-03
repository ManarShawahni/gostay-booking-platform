import { useEffect, useState } from "react";
import { City } from "../../types/admin.types";
import { citiesService } from "../../services/admin/cities.service";

export const useCities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCities = async () => {
    setLoading(true);
    const data = await citiesService.getAll();
    setCities(data);
    setLoading(false);
  };

  const createCity = async (payload: Omit<City, "id">) => {
    const updated = await citiesService.create(payload);
    setCities(updated);
  };

  const updateCity = async (id: number, payload: Omit<City, "id">) => {
    const updated = await citiesService.update(id, payload);
    setCities(updated);
  };

  const deleteCity = async (id: number) => {
    const updated = await citiesService.delete(id);
    setCities(updated);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return {
    cities,
    loading,
    createCity,
    updateCity,
    deleteCity,
  };
};

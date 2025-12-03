import { useEffect, useState } from "react";
import { Hotel } from "../../types/admin.types";
import { hotelsService } from "../../services/admin/hotels.service";

export const useHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHotels = async () => {
    setLoading(true);
    const data = await hotelsService.getAll();
    setHotels(data);
    setLoading(false);
  };

  const createHotel = async (payload: Omit<Hotel, "id">) => {
    const updated = await hotelsService.create(payload);
    setHotels(updated);
  };

  const updateHotel = async (id: number, payload: Omit<Hotel, "id">) => {
    const updated = await hotelsService.update(id, payload);
    setHotels(updated);
  };

  const deleteHotel = async (id: number) => {
    const updated = await hotelsService.delete(id);
    setHotels(updated);
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return {
    hotels,
    loading,
    createHotel,
    updateHotel,
    deleteHotel,
  };
};

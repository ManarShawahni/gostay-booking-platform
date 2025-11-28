import { useEffect, useState } from "react";
import { HotelGalleryImage } from "../../types";
import { hotelService } from "../../services";

export const useHotelGallery = (hotelId: number) => {
  const [data, setData] = useState<HotelGalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await hotelService.getHotelGallery(hotelId);
        setData(res);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [hotelId]);

  return { data, loading };
};

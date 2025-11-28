import { useEffect, useState } from "react";
import { hotelService } from "../../services";
import { HotelDetails } from "../../types";

export const useHotelDetails = (hotelId: number) => {
  const [data, setData] = useState<HotelDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await hotelService.getHotelDetails(hotelId);
        setData(res);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [hotelId]);

  return { data, loading };
};

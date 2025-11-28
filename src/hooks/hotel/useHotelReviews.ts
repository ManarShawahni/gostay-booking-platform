import { useEffect, useState } from "react";
import { HotelReview } from "../../types";
import { hotelService } from "../../services";

export const useHotelReviews = (hotelId: number) => {
  const [data, setData] = useState<HotelReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await hotelService.getHotelReviews(hotelId);
        setData(res);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [hotelId]);

  return { data, loading };
};

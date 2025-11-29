import { useEffect, useState } from "react";
import { Room } from "../../types";
import { hotelService } from "../../services";

export const useAvailableRooms = (hotelId: number) => {
  const [data, setData] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await hotelService.getAvailableRooms(hotelId);
        setData(res);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [hotelId]);

  return { data, loading };
};

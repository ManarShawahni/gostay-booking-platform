import { useEffect, useState } from "react";
import { homeService } from "../../services";
import { RecentHotel } from "../../types";

export const useRecentlyVisited = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RecentHotel[]>([]);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");

    if (!storedId) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        const res = await homeService.getRecentlyVisited(storedId);
        setData(res);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { data, loading };
};

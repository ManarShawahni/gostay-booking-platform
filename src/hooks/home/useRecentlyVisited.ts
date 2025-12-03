import { useEffect, useState } from "react";
import { homeService } from "../../services";
import { RecentHotelApp } from "../../types";
import { useAuth } from "../useAuth";

export const useRecentlyVisited = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RecentHotelApp[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      setData([]);
      setLoading(false);
      return;
    }

    const storedId = localStorage.getItem("userId") || "2";

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
  }, [isAuthenticated]);

  return { data, loading };
};

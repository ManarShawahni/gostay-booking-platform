import { useEffect, useState } from "react";
import { homeService } from "../../services";
import { TrendingDestinationApp  } from "../../types";

export const useTrendingDestinations = () => {
  const [data, setData] = useState<TrendingDestinationApp []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await homeService.getTrendingDestinations();
        setData(res);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { data, loading };
};

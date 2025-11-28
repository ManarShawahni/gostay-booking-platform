import { useEffect, useState } from "react";
import { homeService } from "../../services";
import { FeaturedDeal } from "../../types";

export const useFeaturedDeals = () => {
  const [data, setData] = useState<FeaturedDeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await homeService.getFeaturedDeals();
        setData(res);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { data, loading };
};

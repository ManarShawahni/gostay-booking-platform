import { useEffect, useState } from "react";
import { SearchAmenity } from "../../types";
import { searchService } from "../../services";

export const useAmenities = () => {
  const [data, setData] = useState<SearchAmenity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await searchService.getAmenities();
        setData(res);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { data, loading };
};

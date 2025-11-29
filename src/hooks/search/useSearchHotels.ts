import { useEffect, useState } from "react";
import { searchService } from "../../services";
import { SearchHotelResult, SearchQueryParams } from "../../types";

export const useSearchHotels = (params: SearchQueryParams) => {
  const [hotels, setHotels] = useState<SearchHotelResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await searchService.searchHotels(params);
        setHotels(res);
      } catch {
        setError("Failed to load search results");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [JSON.stringify(params)]);

  return { hotels, loading, error };
};

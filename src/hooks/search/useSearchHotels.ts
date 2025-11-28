import { useEffect, useState } from "react";
import { searchService } from "../../services";
import { SearchHotelResult, SearchQueryParams } from "../../types";

export const useSearchHotels = (params: SearchQueryParams) => {
  const [data, setData] = useState<SearchHotelResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await searchService.searchHotels(params);
        setData(res);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [JSON.stringify(params)]);

  return { data, loading };
};

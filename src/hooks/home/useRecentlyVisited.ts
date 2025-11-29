import { useEffect, useState } from "react";

import { homeService } from "../../services";

import { RecentHotelApp } from "../../types";



export const useRecentlyVisited = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RecentHotelApp[]>([]);


  useEffect(() => {
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

  }, []);

  return { data, loading };

};


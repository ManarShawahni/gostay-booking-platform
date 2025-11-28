import { useState } from "react";
import { HomeSearchParams } from "../../types";

export const useHomeSearch = () => {
  const [params, setParams] = useState<HomeSearchParams>({
    checkInDate: "",
    checkOutDate: "",
    adults: 1,
    children: 0,
    rooms: 1,
  });

  const update = (key: keyof HomeSearchParams, value: string | number) => {
    setParams((p) => ({ ...p, [key]: value }));
  };

  return { params, update };
};

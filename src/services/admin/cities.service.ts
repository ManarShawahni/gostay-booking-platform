import { api } from "../api.config";
import { City } from "../../types/admin.types";

export const citiesService = {
  getAll: async (): Promise<City[]> => {
    const res = await api.get("/api/cities");
    return res.data;
  },

  create: async (data: Omit<City, "id">): Promise<City[]> => {
    const res = await api.post("/api/cities", data);
    return res.data;
  },

  update: async (id: number, data: Omit<City, "id">): Promise<City[]> => {
    const res = await api.put(`/api/cities/${id}`, data);
    return res.data;
  },

  delete: async (id: number): Promise<City[]> => {
    const res = await api.delete(`/api/cities/${id}`);
    return res.data;
  }
};

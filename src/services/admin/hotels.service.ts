import {api} from "../api.config";
import { Hotel } from "../../types/admin.types";

export const hotelsService = {
  async getAll(): Promise<Hotel[]> {
    const res = await api.get("api/hotels");
    return res.data;
  },

  async create(payload: Omit<Hotel, "id">): Promise<Hotel[]> {
    const res = await api.post("api/hotels", payload);
    return res.data;
  },

  async update(id: number, payload: Omit<Hotel, "id">): Promise<Hotel[]> {
    const res = await api.put(`api/hotels/${id}`, payload);
    return res.data;
  },

  async delete(id: number): Promise<Hotel[]> {
    const res = await api.delete(`api/hotels/${id}`);
    return res.data;
  },
};

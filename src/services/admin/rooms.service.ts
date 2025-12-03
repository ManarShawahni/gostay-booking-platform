import { api } from "../api.config";
import { RoomPayload } from "../../types/admin.types";

export const roomsService = {
  async create(payload: RoomPayload) {
    return api.post(`/api/hotels/${payload.hotelId}/rooms`, payload);
  },

  async update(id: number, payload: RoomPayload) {
    return api.put(`/api/rooms/${id}`, payload);
  },

  async delete(id: number) {
    return api.delete(`/api/rooms/${id}`);
  },
};


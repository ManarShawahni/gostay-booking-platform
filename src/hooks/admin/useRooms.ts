import { useEffect, useState } from "react";
import { api } from "../../services/api.config";
import { Room, RoomPayload, Hotel, RawRoom } from "../../types/admin.types";
import { roomsService } from "../../services/admin/rooms.service";

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  const normalizeRoom = (room: RawRoom, hotel: Hotel): Room => ({
    id: room.id,
    hotelId: hotel.id,
    hotelName: hotel.hotelName,
    roomNumber: Number(room.roomNumber || room.name || 0),
    capacityOfAdults: room.capacityOfAdults ?? room.maxOccupancy ?? 1,
    capacityOfChildren: room.capacityOfChildren ?? 0,
    price: room.price ?? 0,
    availability: room.availability ?? room.available ?? true,
  });

  const fetchRooms = async () => {
    setLoading(true);
    const hotels = (await api.get<Hotel[]>("/api/hotels")).data;

    const allRooms: Room[] = [];

    for (const hotel of hotels) {
      const raw = (await api.get<RawRoom[]>(`/api/hotels/${hotel.id}/rooms`)).data;
      allRooms.push(...raw.map((r) => normalizeRoom(r, hotel)));
    }

    setRooms(allRooms);
    setLoading(false);
  };

  const createRoom = async (payload: RoomPayload) => {
    await roomsService.create(payload);
    await fetchRooms();
  };

  const updateRoom = async (id: number, payload: RoomPayload) => {
    await roomsService.update(id, payload);
    await fetchRooms();
  };

  const deleteRoom = async (id: number) => {
    await roomsService.delete(id);
    await fetchRooms();
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return { rooms, loading, createRoom, updateRoom, deleteRoom };
};

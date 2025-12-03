import { useState, useMemo } from "react";
import { useRooms } from "../../hooks/admin/useRooms";
import { Room, RoomPayload } from "../../types/admin.types";
import { RoomsList } from "../../components/features/admin/rooms/RoomsList";
import { Drawer } from "../../components/common/Drawer/Drawer";
import { RoomDrawerForm } from "../../components/features/admin/rooms/RoomDrawerForm";
import { ConfirmModal } from "../../components/common/ConfirmModal/ConfirmModal";
import { Button } from "../../components/common/Button/Button";
import { Input } from "../../components/common/Input/Input";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner";
import { SectionHeader } from "../../components/common/SectionHeader/SectionHeader";
import styles from "./AdminPages.module.css";

export default function RoomsPage() {
  const { rooms, loading, createRoom, updateRoom, deleteRoom } = useRooms();

  const [search, setSearch] = useState("");
  const [filterAvailable, setFilterAvailable] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);

  const filteredRooms = useMemo(() => {
    let result = rooms;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (room) =>
          room.hotelName?.toLowerCase().includes(q) ||
          String(room.roomNumber).includes(q)
      );
    }

    if (filterAvailable === "available") {
      result = result.filter((room) => room.availability);
    } else if (filterAvailable === "unavailable") {
      result = result.filter((room) => !room.availability);
    }

    return result;
  }, [rooms, search, filterAvailable]);

  const openCreate = () => {
    setSelectedRoom(null);
    setDrawerOpen(true);
  };

  const openEdit = (room: Room) => {
    setSelectedRoom(room);
    setDrawerOpen(true);
  };

  const openDelete = (room: Room) => {
    setRoomToDelete(room);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (roomToDelete) {
      try {
        await deleteRoom(roomToDelete.id);
        setModalOpen(false);
        setRoomToDelete(null);
      } catch {
        alert("Failed to delete room");
      }
    }
  };

  const handleSubmit = async (data: RoomPayload) => {
    if (selectedRoom) {
      await updateRoom(selectedRoom.id, data);
    } else {
      await createRoom(data);
    }
  };

  return (
    <div className={styles.page}>
      <SectionHeader
        title="Rooms Management"
        subtitle="Manage rooms in the system"
      />

      <div className={styles.toolbar}>
        <Input
          value={search}
          placeholder="Search by hotel or room number..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={styles.select}
          value={filterAvailable}
          onChange={(e) => setFilterAvailable(e.target.value)}
        >
          <option value="">All Rooms</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <Button onClick={openCreate}>Create Room</Button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <RoomsList rooms={filteredRooms} onEdit={openEdit} onDelete={openDelete} />
      )}

      <Drawer
        open={drawerOpen}
        title={selectedRoom ? "Edit Room" : "Create Room"}
        onClose={() => setDrawerOpen(false)}
      >
        <RoomDrawerForm
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          initialData={selectedRoom}
          onSubmit={handleSubmit}
        />
      </Drawer>

      <ConfirmModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Room"
        message={`Are you sure you want to delete room ${roomToDelete?.roomNumber}?`}
        confirmLabel="Delete"
      />
    </div>
  );
}

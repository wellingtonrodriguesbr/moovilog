import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateVehicleData {
  plate?: string;
  trailerPlate?: string | null;
  year?: number;
  category:
    | "UTILITY"
    | "VAN"
    | "LIGHT_TRUCKS"
    | "STRAIGHT_TRUCKS"
    | "TRUCKS"
    | "QUAD_AXLE_TRUCKS"
    | "SEMI_TRAILER"
    | "B_TRAIN"
    | "ROAD_TRAIN";
  type?: "OWN" | "AGGREGATE" | "RENTED";
  body?:
    | "CLOSED"
    | "OPEN"
    | "SIDER"
    | "REFRIGERATED"
    | "BUCKET"
    | "TANK"
    | "BULK_CARRIER"
    | "LIVESTOCK"
    | "FLATBED"
    | "CONTAINER"
    | "WOOD"
    | "CAR_CARRIER";
  fullLoadCapacity?: number;
  brand?: string;
  model?: string;
  vehicleId: string;
}

export function useUpdateVehicle() {
  const queryClient = useQueryClient();
  const { mutateAsync: updateVehicle, isPending: isPendingUpdateVehicle } = useMutation({
    mutationFn: handleUpdateVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });

  async function handleUpdateVehicle(updateData: UpdateVehicleData) {
    await api.put(`/vehicles/${updateData.vehicleId}`, {
      ...updateData,
    });
  }

  return { updateVehicle, isPendingUpdateVehicle };
}

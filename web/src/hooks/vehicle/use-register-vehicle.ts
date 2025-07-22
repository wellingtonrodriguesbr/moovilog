import { Vehicle } from "@/interfaces";
import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface RegisterVehicleData {
  plate: string;
  trailerPlate?: string | null;
  year: number;
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
  type: "OWN" | "AGGREGATE" | "RENTED";
  body:
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
  fullLoadCapacity: number;
  brand: string;
  model: string;
}
export function useRegisterVehicle() {
  const queryClient = useQueryClient();
  const { mutateAsync: registerVehicle, isPending: isPendingRegisterVehicle } = useMutation({
    mutationFn: handleRegisterVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });

  async function handleRegisterVehicle(registerData: RegisterVehicleData) {
    const { data } = await api.post<{ vehicle: Vehicle }>("/vehicles", {
      ...registerData,
    });
    return data;
  }

  return { registerVehicle, isPendingRegisterVehicle };
}

import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCompanyStore } from "@/stores/company-store";

interface UpdateVehicleStatusProps {
  vehicleId: string;
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE" | "RESERVED" | "BROKEN";
}

export function useUpdateVehicleStatus() {
  const queryClient = useQueryClient();
  const { company } = useCompanyStore();
  const { mutateAsync: updateVehicleStatus, isPending: isUpdateVehicleStatusPending } = useMutation({
    mutationFn: handleUpdateVehicleStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });

  async function handleUpdateVehicleStatus({ vehicleId, status }: UpdateVehicleStatusProps) {
    await api.patch(`/vehicles/${vehicleId}/status`, {
      status,
    });
  }

  return {
    updateVehicleStatus,
    isUpdateVehicleStatusPending,
  };
}

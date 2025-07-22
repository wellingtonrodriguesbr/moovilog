import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, Ellipsis, X } from "lucide-react";
import { useUpdateDriverStatus } from "@/hooks/driver/use-update-driver-status";
import { toast } from "sonner";
import { Driver } from "@/interfaces";
import { AxiosError } from "axios";
import { UpdateDriverDialog } from "@/components/platform/pages/drivers/components/update-driver-dialog";

interface DriverDropdownOptionsProps {
  driver: Driver;
}

export function DriverDropdownOptions({ driver }: DriverDropdownOptionsProps) {
  const { updateDriverStatus, isUpdateDriverStatusPending } = useUpdateDriverStatus();

  async function handleUpdateDriverStatus() {
    try {
      await updateDriverStatus({
        driverId: driver.id,
        status: driver.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
      });
      toast.success("Status atualizado com sucesso");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          toast.error("Você não tem permissão para esta ação, fale com seu gestor.");
        }
      } else {
        toast.error("Erro ao atualizar status do motorista, tente novamente");
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          <Ellipsis className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Configurações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <UpdateDriverDialog driver={driver} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            data-active={driver.status === "ACTIVE"}
            data-inactive={driver.status === "INACTIVE"}
            disabled={isUpdateDriverStatusPending}
            onClick={handleUpdateDriverStatus}
            className="flex items-center gap-2 w-full data-[inactive=true]:text-emerald-500 data-[inactive=true]:hover:bg-emerald-500/10 data-[active=true]:text-rose-500 data-[active=true]:hover:bg-rose-500/10 group rounded-md"
          >
            {driver.status === "INACTIVE" ? <Check className="size-4" /> : <X className="size-4" />}
            {driver.status === "ACTIVE" ? "Desativar motorista" : "Ativar motorista"}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

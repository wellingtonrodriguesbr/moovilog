import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "@/stores/company-store";
import { useParams } from "next/navigation";

interface Creator {
  id: string;
  role: string;
  user: User;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Vehicle {
  id: string;
  plate: string;
}

interface Driver {
  id: string;
  name: string;
  documentNumber: string;
}

interface Route {
  id: string;
  name: string;
}

export interface Freight {
  id: string;
  type: string;
  modality: string;
  date: string;
  pickupsQuantity: number;
  deliveriesQuantity: number;
  totalWeightOfPickups: string;
  totalWeightOfDeliveries: string;
  freightAmountInCents: number;
  observation: string | null;
  createdAt: Date;
  updatedAt: Date;
  driverId: string;
  vehicleId: string;
  creatorId: string;
  companyId: string;
  routeId: string;
  cityId: string | null;
  creator: Creator;
  vehicle: Vehicle;
  driver: Driver;
  route: Route;
}
interface FreightResponse {
  freight: Freight;
}

export function useGetFreightdetailsFromCompany() {
  const { company, isLoading } = useCompanyStore();
  const params = useParams<{ id: string }>();

  const { data: freightDetails, isPending: isGetFreightDetailsPending } = useQuery({
    queryKey: ["freights-details", params.id],
    queryFn: handleGetFreightdetailsFromCompany,
    enabled: !isLoading && !!params.id,
  });

  async function handleGetFreightdetailsFromCompany() {
    const { data } = await api.get<FreightResponse>(`/${company?.id}/freights/${params.id}/details`);

    return data.freight;
  }

  return {
    freightDetails: freightDetails ?? null,
    isGetFreightDetailsPending,
  };
}

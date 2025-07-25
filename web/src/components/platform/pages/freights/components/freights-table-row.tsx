import { TableCell, TableRow } from "@/components/ui/table";

import { formatBrazilianDate } from "@/utils/format-brazilian-date";
import { formatWeight } from "@/utils/format-weight";

import { FreightDropdownOptions } from "@/components/platform/pages/freights/components/freight-dropdown-options";
import { ExtendedFreight } from "@/hooks/freight/use-fetch-freights-from-company";

const FREIGHT_MODALITY: Record<string, string> = {
  DAILY: "Diária",
  PERCENTAGE: "Porcentagem",
  PRODUCTIVITY: "Produtividade",
  FLAT_RATE: "Taxa fixa",
  WEIGHT_BASED: "Baseado no peso",
  DISTANCE_BASED: "Baseado na distância",
  TIME_BASED: "Baseado no tempo",
  PER_STOP: "Por parada",
  ZONE_BASED: "Baseado na zona",
};

const FREIGHT_TYPE: Record<string, string> = {
  FRACTIONAL: "Fracionado",
  DEDICATED: "Dedicado",
  EXPRESS: "Entrega rápida",
  TRANSFER: "Transferência",
};

interface FreightsTableRowProps {
  freight: ExtendedFreight;
}

export function FreightsTableRow({ freight }: FreightsTableRowProps) {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell className="text-nowrap">{formatBrazilianDate(freight.date.toString())}</TableCell>
      <TableCell className="text-nowrap">{freight.deliveriesQuantity}</TableCell>
      <TableCell className="text-nowrap">{formatWeight(freight.totalWeightOfDeliveries)}kg</TableCell>
      <TableCell className="text-nowrap">{freight.driver.name}</TableCell>
      <TableCell className="text-nowrap">{freight.vehicle.plate}</TableCell>
      <TableCell className="text-nowrap">{FREIGHT_TYPE[freight.type]}</TableCell>
      <TableCell className="text-nowrap">{FREIGHT_MODALITY[freight.modality]}</TableCell>
      <TableCell className="text-nowrap">{formatBrazilianDate(freight.createdAt.toString())}</TableCell>
      <TableCell className="text-right">
        <FreightDropdownOptions freightId={freight.id} />
      </TableCell>
    </TableRow>
  );
}

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGetFreightdetailsFromCompany } from "@/hooks/freight/use-get-freight-details";
import { formatBrazilianDate } from "@/utils/format-brazilian-date";
import { formatCurrencyBR } from "@/utils/format-currency-br";
import { formatWeight } from "@/utils/format-weight";

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

export function FreightDetailsForm() {
	const { freightDetails, isGetFreightDetailsPending } =
		useGetFreightdetailsFromCompany();

	if (isGetFreightDetailsPending) {
		return <p>Carregando...</p>;
	}

	if (!freightDetails) {
		return <p>Frete não encontrado</p>;
	}

	return (
		<form className="space-y-6 bg-zinc-100 rounded-md p-6">
			<fieldset className="grid grid-cols-4 gap-4">
				<Label className="flex flex-col gap-2 font-normal">
					Data do frete:
					<Input value={formatBrazilianDate(freightDetails.date)} />
				</Label>
				<Label className="flex flex-col gap-2 font-normal">
					Motorista:
					<Input value={freightDetails.driver.name} />
				</Label>
				<Label className="flex flex-col gap-2 font-normal">
					Veículo:
					<Input value={freightDetails.vehicle.plate} />
				</Label>
				<Label className="flex flex-col gap-2 font-normal">
					Valor do frete:
					<Input
						value={formatCurrencyBR(
							freightDetails.freightAmountInCents
						)}
					/>
				</Label>
			</fieldset>
			<fieldset className="grid grid-cols-4 gap-4">
				<Label className="flex flex-col gap-2 font-normal">
					Tipo:
					<Input value={FREIGHT_TYPE[freightDetails.type]} />
				</Label>
				<Label className="flex flex-col gap-2 font-normal">
					Modalidade de pagamento:
					<Input value={FREIGHT_MODALITY[freightDetails.modality]} />
				</Label>
				<Label className="flex flex-col gap-2 font-normal">
					Rota:
					<Input value={freightDetails.route.name} />
				</Label>
				<Label className="flex flex-col gap-2 font-normal">
					Cadastro por:
					<Input value={freightDetails.creator.user.name} />
				</Label>
			</fieldset>
			<fieldset className="grid grid-cols-5 gap-4">
				<Label className="flex flex-col gap-2 font-normal">
					Quantidade de entregas:
					<Input value={freightDetails.deliveriesQuantity} />
				</Label>
				<Label className="flex flex-col gap-2 font-normal">
					Peso total de entregas:
					<Input
						value={`${formatWeight(freightDetails.totalWeightOfDeliveries)}kg`}
					/>
				</Label>
				<Label className="flex flex-col gap-2 font-normal">
					Quantidade de coletas:
					<Input
						value={
							freightDetails.pickupsQuantity > 0
								? freightDetails.pickupsQuantity
								: "-"
						}
					/>
				</Label>
				<Label className="flex flex-col gap-2 font-normal">
					Peso total de coletas:
					<Input
						value={
							freightDetails.totalWeightOfPickups
								? `${formatWeight(freightDetails.totalWeightOfPickups)}kg`
								: "-"
						}
					/>
				</Label>
				<Label className="flex flex-col gap-2 font-normal">
					Cadastro em:
					<Input
						value={formatBrazilianDate(freightDetails.createdAt)}
					/>
				</Label>
			</fieldset>
			<Label className="flex flex-col gap-2 font-normal">
				Observação:
				<Textarea
					className="resize-none placeholder:italic pointer-events-none select-none"
					rows={4}
					placeholder="Nenhuma observação cadastrada.."
					value={freightDetails.observation ?? ""}
				/>
			</Label>
		</form>
	);
}

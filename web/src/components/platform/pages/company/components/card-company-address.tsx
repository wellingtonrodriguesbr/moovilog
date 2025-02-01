"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetCompanyAddress } from "@/hooks/company/use-get-company-address";
import { formatCEP } from "@/utils/format-cep";
import { MapPinned } from "lucide-react";

export function CardCompanyAddress() {
	const { companyAddress } = useGetCompanyAddress();

	if (!companyAddress) {
		return null;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<MapPinned className="size-5" />
					Endereço
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6 mt-2">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<fieldset className="space-y-2">
						<Label>CEP:</Label>
						<Input
							readOnly
							value={formatCEP(companyAddress.address.zipCode)}
						/>
					</fieldset>
					<fieldset className="space-y-2">
						<Label>Nome:</Label>
						<Input readOnly value={companyAddress.address.street} />
					</fieldset>
				</div>
				<div className="grid grid-cols-3 gap-4">
					<fieldset className="space-y-2">
						<Label>Número:</Label>
						<Input readOnly value={companyAddress.address.number} />
					</fieldset>
					<fieldset className="col-span-2 md:col-span-1 space-y-2">
						<Label>Bairro:</Label>
						<Input
							readOnly
							value={companyAddress.address.neighborhood}
						/>
					</fieldset>
					<fieldset className="col-span-full md:col-span-1 space-y-2">
						<Label>Complemento:</Label>
						<Input
							readOnly
							value={companyAddress.address.complement}
						/>
					</fieldset>
				</div>
				<div className="grid grid-cols-3 md:grid-cols-6 gap-4">
					<fieldset className="col-span-full md:col-span-3 space-y-2">
						<Label>Cidade:</Label>
						<Input readOnly value={companyAddress.city.name} />
					</fieldset>
					<fieldset className="col-span-2 space-y-2">
						<Label>Estado:</Label>
						<Input readOnly value={companyAddress.state.name} />
					</fieldset>
					<fieldset className="space-y-2">
						<Label>UF:</Label>
						<Input readOnly value={companyAddress.state.acronym} />
					</fieldset>
				</div>
			</CardContent>
		</Card>
	);
}

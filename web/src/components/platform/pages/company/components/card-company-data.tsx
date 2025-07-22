"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCompanyInformation } from "@/hooks/company/use-get-company-information";
import { formatCNPJ } from "@/utils/format-cnpj";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building } from "lucide-react";

import { formatBrazilianDate } from "@/utils/format-brazilian-date";

const COMPANY_SIZE: Record<string, string> = {
  MICRO: "Microempresa (Faturamento anual de até R$ 360mil)",
  SMALL: "Pequena empresa (Faturamento anual de até R$ 4.8 milhões)",
  MEDIUM: "Média empresa (Faturamento anual de até R$ 300 milhões)",
  BIG: "Grande empresa (Faturamento anual ultrapassa R$ 300 milhões)",
};

export function CardCompanyData() {
  const { companyInformation } = useGetCompanyInformation();

  if (!companyInformation) {
    return null;
  }

  return (
    <Card className="bg-white border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="size-5" />
          Dados da empresa
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 mt-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <fieldset className="space-y-2">
            <Label>Razão social:</Label>
            <Input readOnly value={companyInformation.name} />
          </fieldset>
          <fieldset className="space-y-2">
            <Label>CNPJ:</Label>
            <Input readOnly value={formatCNPJ(companyInformation.documentNumber)} />
          </fieldset>
          <fieldset className="space-y-2">
            <Label>Tamanho:</Label>
            <Input readOnly value={COMPANY_SIZE[companyInformation.size]} />
          </fieldset>
          <fieldset className="space-y-2">
            <Label>Cadastrada em:</Label>
            <Input readOnly value={formatBrazilianDate(companyInformation.createdAt)} />
          </fieldset>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetCompanyInformation } from "@/hooks/use-get-company-information";

export function CompanyInformation() {
  const { company } = useGetCompanyInformation();

  return (
    <section>
      <header className="space-y-6">
        <h1 className="text-2xl md:text-4xl font-medium">
          Dados cadastrais da empresa
        </h1>
        <p className="text-zinc-600">
          Gerencie as informações da empresa como: CNPJ, endereço, e etc.
        </p>
      </header>

      <div className="space-y-4 mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Dados da empresa</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
            <CardContent></CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
            <CardContent></CardContent>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}

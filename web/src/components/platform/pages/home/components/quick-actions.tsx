import Link from "next/link";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import { ArrowUpRight } from "lucide-react";

export function QuickActions() {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <h2 className="font-semibold text-xl">Ações rápidas</h2>
      <Carousel
        opts={{
          dragFree: true,
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="w-full flex xl:grid xl:grid-cols-4 items-stretch gap-2 px-0 ml-0">
          {actions.map((action) => (
            <CarouselItem key={action.title} className="w-full basis-[280px] md:basis-[55%] pl-0 h-full">
              <Link href={action.url} className="group h-full block">
                <Card className="h-full bg-app-blue-600 hover:bg-app-blue-500 overflow-hidden relative">
                  <CardHeader>
                    <CardTitle className="text-xl text-zinc-50">{action.title}</CardTitle>
                    <CardDescription className="text-zinc-100">{action.description}</CardDescription>
                  </CardHeader>
                  <ArrowUpRight className="size-6 absolute top-1 right-1 text-zinc-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

const actions = [
  {
    title: "Cadastrar frete",
    description: "Registre um novo frete para transporte.",
    url: "/fretes/novo",
  },
  {
    title: "Cadastrar coleta",
    description: "Adicione uma nova coleta ao sistema.",
    url: "/coletas/novo",
  },
  {
    title: "Cadastrar ocorrência",
    description: "Deu ruim? Cadastre a ocorrência no sistema.",
    url: "/ocorrencias",
  },
  {
    title: "Cadastrar aviso",
    description: "Informe algo importante por meio de um aviso.",
    url: "/operacional/avisos",
  },
];

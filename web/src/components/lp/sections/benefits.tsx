import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { links } from "@/utils/links";

import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { ArrowUpRight, Check } from "lucide-react";

export function Benefits() {
  return (
    <section className="bg-white">
      <div className="w-full h-full max-w-screen-2xl mx-auto px-4 py-16 flex flex-col xl:flex-row gap-12 xl:gap-8 justify-center">
        <div className="relative xl:sticky top-4 self-start rounded-lg overflow-hidden">
          <Image src="/benefits-img.svg" alt="moovilog" width={800} height={800} quality={100} />
        </div>
        <div>
          <small className="flex items-center gap-1 mb-2 before:w-8 before:h-[1px] before:bg-app-blue-300">
            Benefícios
          </small>
          <div className="flex flex-col gap-4 items-start justify-between">
            <h3 className="font-semibold text-2xl md:text-3xl max-w-screen-lg leading-normal md:leading-relaxed">
              Por que escolher a Moovilog para sua transportadora?
            </h3>
            <p className="max-w-screen-md">
              Com nossa plataforma, você terá mais organização, controle e eficiência em todas as áreas do seu negócio.
              Elimine os achismos com dados precisos, reduza custos otimizando processos e tome decisões estratégicas
              que impulsionam resultados. Tudo isso em uma interface simples, moderna e acessível de qualquer lugar.
            </p>
          </div>
          <ul className="relative mt-8">
            {BENEFITS.map((benefit, index) => (
              <li key={index} className="py-4 border-b border-zinc-100">
                <strong className="flex items-center gap-2 font-semibold">
                  <Check className="size-4 text-emerald-500" />
                  {benefit.title}
                </strong>
                <p className="text-sm text-zinc-700 ml-6">{benefit.description}</p>
              </li>
            ))}
          </ul>
          <div className="w-full flex flex-col xl:flex-row  gap-4 mt-8">
            <Button className="w-full xl:w-fit bg-app-cyan-100 hover:bg-app-cyan-300 text-app-blue-900 gap-2" asChild>
              <Link href={links["waiting-list"]}>
                Entrar na lista de espera
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button variant="link" className="" asChild>
              <Link href={links["whatsapp-doubts"]}>
                <WhatsappIcon className="size-4 fill-app-blue-900" />
                Quero tirar dúvidas no WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const BENEFITS = [
  {
    title: "Organização Simplificada",
    description:
      "Elimine o caos das planilhas e papeladas, centralizando todas as informações em uma única plataforma intuitiva.",
  },
  {
    title: "Gestão em Tempo Real",
    description:
      "Acompanhe suas operações em tempo real, com dados atualizados que permitem decisões rápidas e assertivas.",
  },
  {
    title: "Acesso de Qualquer Lugar",
    description:
      "Tenha o controle da sua transportadora na palma da mão, acessando a plataforma de qualquer dispositivo conectado à internet.",
  },
  {
    title: "Redução de Erros",
    description: "Automatize processos e minimize falhas humanas ao contar com ferramentas modernas e seguras.",
  },
  {
    title: "Economia de Tempo e Recursos",
    description: "Agilize tarefas rotineiras e foque no que realmente importa: expandir o seu negócio.",
  },
  {
    title: "Relatórios Detalhados",
    description:
      "Tenha acesso a relatórios completos que ajudam a identificar pontos de melhoria, oportunidades e resultados alcançados.",
  },
  {
    title: "Integração Total",
    description:
      "Gerencie todas as áreas, como finanças, fretes, motoristas e veículos, em um único ambiente integrado.",
  },
  {
    title: "Eficiência e Produtividade",
    description:
      "Com processos otimizados e ferramentas modernas, sua equipe ganha mais tempo e trabalha de forma mais eficaz.",
  },
  {
    title: "Sustentabilidade Digital",
    description: "Reduza o uso de papel e contribua para práticas mais sustentáveis, modernizando sua transportadora.",
  },
  {
    title: "Segurança e Confiabilidade",
    description: "Armazene todas as informações do seu negócio com segurança e sem o risco de perdas ou extravios.",
  },
];

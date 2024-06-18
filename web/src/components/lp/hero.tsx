import Image from "next/image";

import { WhatsappIcon } from "../icons/whatsapp-icons";
import { Button } from "../ui/button";
import { Header } from "./header";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden min-h-screen md:h-[1000px] md:min-h-[1000px] xl:h-[800px] xl:min-h-[800px] xl:max-h-[800px] flex flex-col bg-app-blue-500">
      <Header />
      <div className="relative w-full h-full max-w-screen-2xl mx-auto px-4 mt-12 md:mt-16 xl:mt-36 grid grid-cols-1 xl:grid-cols-2">
        <div>
          <span className="flex items-center gap-1 text-white text-xs mb-2">
            Esqueça as planilhas de excel <span className="text-xl">💨</span>
          </span>
          <h1 className="font-bold text-4xl md:text-5xl xl:text-6xl text-white leading-tight md:leading-tight xl:leading-tight">
            Gerencie toda sua operação logística em uma única plataforma.
          </h1>
          <p className="text-sm md:text-base mt-6 text-app-cyan-200 max-w-[700px]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
            fugit maxime consequuntur quae quisquam, itaque, eveniet minus ipsum
            animi assumenda velit autem ab sed quo nostrum et eligendi numquam
            aliquam.
          </p>
          <div className="flex flex-col xl:flex-row items-center md:items-start xl:items-center gap-4 mt-8">
            <Button className="w-full md:w-fit bg-app-cyan-100 hover:bg-app-cyan-300 text-app-blue-900 gap-2">
              <WhatsappIcon className="size-4 fill-app-blue-900" />
              Solicite uma demonstração gratuita
            </Button>
            <Button className="w-full md:w-fit text-app-cyan-500 gap-2 bg-transparent hover:bg-app-cyan-100/10">
              Ver mais detalhes{" "}
              <ChevronDown className="size-4 animate-bounce" />
            </Button>
          </div>
        </div>
        <div className="relative md:absolute md:right-12 xl:right-0 -bottom-10 md:-bottom-16 z-50">
          <Image
            src="/hero.png"
            alt=""
            className="z-50 w-[520px] xl:w-[580px]"
            width={580}
            height={749}
            quality={100}
          />
        </div>
      </div>
      <Image
        src="/bg-hero.svg"
        alt=""
        className="absolute right-0 bottom-0 md:-bottom-10 w-[520px] xl:w-[580px] z-10"
        width={580}
        height={749}
        quality={100}
      />
      <Image
        src="/bg-hero.svg"
        alt=""
        className="hidden xl:block absolute right-80 bottom-20 w-[520px] xl:w-[580px] z-10"
        width={580}
        height={749}
        quality={100}
      />
    </section>
  );
}

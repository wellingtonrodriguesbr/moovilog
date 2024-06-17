import Image from "next/image";

import { WhatsappIcon } from "../icons/whatsapp-icons";
import { Button } from "../ui/button";
import { Header } from "./header";
import { ChevronDown, NotepadText } from "lucide-react";

export function Hero() {
  return (
    <section className="w-full overflow-hidden min-h-screen md:h-[800px] md:min-h-[800px] md:max-h-[800px] flex flex-col bg-app-blue-500">
      <Header />
      <div className="relative w-full h-full max-w-screen-2xl mx-auto px-4 mt-12 md:mt-36 grid grid-cols-1 md:grid-cols-2">
        <div>
          <span className="flex items-center gap-1 text-white text-xs mb-2">
            <NotepadText className="size-4 text-app-cyan-500" />
            Esqueça as planilhas de excel
          </span>
          <h1 className="font-bold text-4xl md:text-6xl text-white leading-tight md:leading-tight">
            Gerencie sua operação logística com tecnologia de ponta.
          </h1>
          <p className="text-sm md:text-base mt-6 text-app-cyan-200 max-w-[700px]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
            fugit maxime consequuntur quae quisquam, itaque, eveniet minus ipsum
            animi assumenda velit autem ab sed quo nostrum et eligendi numquam
            aliquam.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
            <Button className="w-full md:w-fit bg-app-cyan-100 text-app-blue-900 gap-2">
              <WhatsappIcon className="size-4 fill-app-blue-900" />
              Solicite uma demonstração gratuita
            </Button>
            <Button
              variant="ghost"
              className="w-full md:w-fit text-app-cyan-500 gap-2"
            >
              Ver mais detalhes{" "}
              <ChevronDown className="size-4 animate-bounce" />
            </Button>
          </div>
        </div>
        <div className="relative md:absolute right-0 -bottom-10 z-10">
          <Image
            src="/hero.png"
            alt=""
            width={580}
            height={749}
            quality={100}
          />
        </div>
      </div>
    </section>
  );
}

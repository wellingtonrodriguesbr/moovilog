import Image from "next/image";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <aside className="w-[550px] flex flex-col p-4 md:p-8">
        <header className="flex flex-col gap-8 mb-6">
          <Link href="/" className="w-fit flex items-center gap-2 text-sm group">
            <ArrowLeft className="size-3 group-hover:-translate-x-0.5 transition-transform" />
            Voltar ao início
          </Link>
          <Image src="/logo-blue.svg" alt="moovilog" className="w-[170px]" width={250} height={193} />
        </header>
        {children}
      </aside>
    </main>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Image src="/logo-blue.svg" alt="Moovilog" width={160} height={120} className="h-8 mx-auto" />
        </div>

        <div className="mb-8">
          <h1 className="text-6xl font-bold text-app-blue-900 mb-2">404</h1>
          <p className="text-xl text-zinc-600 mb-4">Página não encontrada</p>
          <p className="text-zinc-500">A página que você está procurando não existe ou foi movida.</p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/inicio">
              <Home className="w-4 h-4 mr-2" />
              Voltar ao início
            </Link>
          </Button>

          <Button variant="outline" onClick={() => router.back()} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar à página anterior
          </Button>
        </div>
      </div>
    </section>
  );
}

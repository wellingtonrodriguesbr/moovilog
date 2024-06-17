import Image from "next/image";
import { FooterSocialMedia } from "@/components/footer-social-media";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full h-screen flex flex-col justify-center max-w-2xl mx-auto px-4 pb-12">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <header className="mb-16">
          <Link href="/">
            <Image
              src="/logo-blue.svg"
              alt="moovilog"
              className="w-[200px]"
              width={250}
              height={193}
            />
          </Link>
        </header>
        {children}
      </div>

      <footer className="w-full flex items-center justify-between mt-auto">
        <FooterSocialMedia />
        <p className="text-sm text-zinc-500">© Moovilog 2024</p>
      </footer>
    </main>
  );
}

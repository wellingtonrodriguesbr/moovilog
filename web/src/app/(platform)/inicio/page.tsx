import { Metadata } from "next";
import { Home } from "@/components/platform/home";

export const metadata: Metadata = {
  title: "Início | Moovilog",
  description: "",
};

export default function HomePagePlatform() {
  return (
    <main className="w-full p-4 md:p-12">
      <Home />
    </main>
  );
}

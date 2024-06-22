import { Supplies } from "@/components/platform/supplies";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suprimentos | Moovilog",
  description: "",
};

export default function SuppliesPlatform() {
  return (
    <main>
      <Supplies />
    </main>
  );
}

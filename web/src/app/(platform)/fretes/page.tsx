import { Metadata } from "next";
import { Freights } from "@/components/platform/pages/freights";

export const metadata: Metadata = {
  title: "Fretes | Moovilog",
  description: "",
};

export default function FreightsPagePlatform() {
  return (
    <main>
      <Freights />
    </main>
  );
}

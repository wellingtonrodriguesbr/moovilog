import { Drivers } from "@/components/platform/pages/drivers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Motoristas | Moovilog",
  description: "",
};

export default function DriversPagePlatform() {
  return (
    <main>
      <Drivers />
    </main>
  );
}

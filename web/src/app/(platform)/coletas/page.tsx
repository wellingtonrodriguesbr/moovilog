import { Metadata } from "next";
import { Pickups } from "@/components/platform/pages/pickups";

export const metadata: Metadata = {
  title: "Coletas | Moovilog",
  description: "",
};

export default function PickupsPagePlatform() {
  return (
    <main>
      <Pickups />
    </main>
  );
}

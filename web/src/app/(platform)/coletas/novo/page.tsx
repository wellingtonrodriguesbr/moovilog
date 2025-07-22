import { PickupType } from "@/components/platform/pages/pickups/pickup-type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nova coleta | Moovilog",
  description: "",
};

export default function RegisterNewPickupPagePlatform() {
  return (
    <main className="w-full max-w-screen-lg mx-auto p-0 md:p-6">
      <PickupType />
    </main>
  );
}

import { Metadata } from "next";
import { CompleteRegistration } from "@/components/auth/pages/complete-registration";

export const metadata: Metadata = {
  title: "Concluir cadastro | Moovilog",
  description: "",
};

export default function CompleteRegistrationPage() {
  return (
    <section className="w-full">
      <CompleteRegistration />
    </section>
  );
}

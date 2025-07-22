import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface SendEmailToResetPasswordTemplateProps {
  userName: string;
  userEmail: string;
  link: string;
}

export default function SendEmailToResetPasswordTemplate({
  userName,
  userEmail,
  link,
}: SendEmailToResetPasswordTemplateProps) {
  const previewText = `${userName}, seu link de redefinição de senha acaba de chegar 🚚`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container>
            <Heading className="text-black text-[24px] font-normal p-0 my-[30px] mx-0">Olá, {userName}.</Heading>
            <Text className="text-[20px]">
              Você recebeu um link para redefinir sua senha dentro da plataforma da{" "}
              <Link href="https://moovilog.com.br" className="text-[#2222FF]">
                Moovilog
              </Link>
              . Seu e-mail cadastrado é {userEmail}.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Se não solicitou essa redefinição de senha, por favor, ignore esse e-mail.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Link
                className="block w-full bg-[#2222FF] rounded text-white px-5 py-3 text-[16px] font-semibold no-underline text-center"
                target="_blank"
                href={link}
              >
                Resetar minha senha
              </Link>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-center text-[#666666] text-[12px] leading-[24px]">
              Caso prefira, copie e cole esse código em seu navegador:
              <Text className="text-[#2222FF] text-center">{link}</Text>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

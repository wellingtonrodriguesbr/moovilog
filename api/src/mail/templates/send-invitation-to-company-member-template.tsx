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

interface SendInvitationToCompanyMemberTemplateProps {
	senderName: string;
	userName: string;
	userEmail: string;
	authLink: string;
}

export default function SendInvitationToCompanyMemberTemplate({
	senderName,
	userName,
	userEmail,
	authLink,
}: SendInvitationToCompanyMemberTemplateProps) {
	const previewText = `${userName}, seu convite acaba de chegar 🚚`;

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white font-sans">
					<Container>
						<Heading className="text-black text-[24px] font-normal p-0 my-[30px] mx-0">
							Olá, {userName}.
						</Heading>
						<Text className="text-[20px]">
							Voce recebeu um convite para se juntar a {senderName} e companhia
							dentro da plataforma do{" "}
							<Link href="https://moovilog.com.br" className="text-[#2222FF]">
								Moovilog
							</Link>
							. Seu e-mail cadastrado é {userEmail}.
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							Abaixo está o seu link de acesso, basta clicar no botão e concluir
							seu cadastro. Vamos juntos simplificar a gestão logística no
							Brasil?! 🎉
						</Text>

						<Text className="text-black text-[14px] leading-[24px]">
							Ah, e se precisar de alguma coisa estaremos aqui para te auxiliar
							😉
						</Text>
						<Section className="text-center mt-[32px] mb-[32px]">
							<Link
								className="block w-full bg-[#2222FF] rounded text-white px-5 py-3 text-[16px] font-semibold no-underline text-center"
								href={authLink}
							>
								Concluir meu cadastro
							</Link>
						</Section>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Text className="text-center text-[#666666] text-[12px] leading-[24px]">
							Caso prefira, copie e cole esse código em seu navegador:
							<Text className="text-[#2222FF] text-center">{authLink}</Text>
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

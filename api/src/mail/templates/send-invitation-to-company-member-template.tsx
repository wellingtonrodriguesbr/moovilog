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
	userName: string;
	userEmail: string;
	authLink: string;
}

export default function SendInvitationToCompanyMemberTemplate({
	userName,
	userEmail,
	authLink,
}: SendInvitationToCompanyMemberTemplateProps) {
	const previewText =
		"Se este e-mail chegou até você, é porque você quer simplificar sua vida.";

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
							Seu cadastro foi realizado com sucesso!
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							Você se cadastrou na plataforna do Busca Simples através do email{" "}
							<strong>{userEmail}</strong>. Abaixo está o seu link de acesso,
							agradecemos seu cadastro e esperamos que nossa plataforma te ajude
							a encontrar o profissional ou o cliente ideal.
						</Text>

						<Text className="text-black text-[14px] leading-[24px]">
							E se precisar estaremos aqui para te auxiliar 😉
						</Text>
						<Section className="text-center mt-[32px] mb-[32px]">
							<Link
								className="block w-full bg-[#007AFF] rounded text-white px-5 py-3 text-[16px] font-semibold no-underline text-center"
								href={authLink}
							>
								Entrar agora
							</Link>
						</Section>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Text className="text-center text-[#666666] text-[12px] leading-[24px]">
							Se você não solicitou esse link de autenticação, apenas descarte
							esse e-mail.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

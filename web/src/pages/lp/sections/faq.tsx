import Link from "next/link";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowUpRight } from "lucide-react";
import { links } from "@/utils/links";

export function Faq() {
	return (
		<section className="w-full max-w-screen-2xl px-4 mx-auto pt-12 md:pt-36">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
				<div className="flex flex-col gap-3">
					<small className="flex items-center gap-1 mb-2 before:w-8 before:h-[1px] before:bg-app-blue-300">
						FAQ
					</small>
					<h4 className="text-2xl md:text-4xl font-semibold">
						Dúvidas frequentes
					</h4>
					<p className="text-sm text-app-gray-600 max-w-xl">
						Se ficou com alguma dúvida, entre em contato através do
						nosso e-mail ou Whatsapp:
					</p>

					<div className="w-12 h-[1px] bg-zinc-300"></div>

					<div className="flex flex-col gap-4 mt-2">
						<Link
							href="mailto:moovilog@gmail.com"
							className="w-fit underline text-sm text-app-gray-700 font-medium flex items-center gap-2 group"
						>
							moovilog@gmail.com
							<ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
						</Link>

						<Link
							href={links["whatsapp-doubts"]}
							className="w-fit underline text-sm text-app-blue-500 font-medium flex items-center gap-2 group"
						>
							Chamar no Whatsapp
							<ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
						</Link>
					</div>
				</div>

				<Accordion type="single" collapsible className="w-full">
					{ITEMS.map(({ value, trigger, content }) => (
						<AccordionItem key={value} value={value}>
							<AccordionTrigger className="underline-0 hover:no-underline">
								{trigger}
							</AccordionTrigger>
							<AccordionContent>{content}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}

const ITEMS = [
	{
		value: "1",
		trigger: "Como a plataforma pode me ajudar?",
		content:
			"Nossa plataforma foi criada para transformar a forma como você gerencia sua transportadora. Chega de planilhas confusas e papelada sem fim. Centralizamos todas as operações em um único lugar, com total segurança e tecnologia de ponta, otimizando seu tempo e reduzindo erros.",
	},
	{
		value: "2",
		trigger: "Eu consigo acessar a plataforma de qualquer lugar?",
		content:
			"Sim! A nossa solução é 100% online, permitindo que você acesse a plataforma de qualquer dispositivo conectado à internet, a qualquer hora e em qualquer lugar. Assim, você tem total controle sobre sua operação, esteja no escritório, em casa ou na estrada.",
	},
	{
		value: "3",
		trigger: "Qual o diferencial da Moovilog para os concorrentes?",
		content:
			"Ao contrário das soluções genéricas disponíveis no mercado, a Moovilog foi criada por especialistas que entendem as dores de quem vive o dia a dia das transportadoras. Com mais de 8 anos de experiência no setor, desenvolvemos uma plataforma que atende diretamente às necessidades específicas do seu negócio, de forma prática e personalizada.",
	},
	{
		value: "4",
		trigger: "Por que eu preciso deixar de usar planilhas?",
		content:
			"Planilhas podem até funcionar para tarefas simples, mas à medida que sua operação cresce, elas se tornam um gargalo. São difíceis de atualizar, propensas a erros humanos, e não oferecem a automação ou as análises em tempo real que sua transportadora precisa. Com nossa plataforma, você tem acesso a ferramentas modernas que automatizam processos, evitam erros e garantem uma gestão mais eficiente, tudo em um ambiente seguro e centralizado.",
	},
	{
		value: "5",
		trigger:
			"Se eu formatar meu computador, eu perco os dados da plataforma?",
		content:
			"De jeito nenhum! Todos os seus dados são armazenados na nuvem, com alta segurança e proteção de informações. Mesmo que você troque ou formate seu dispositivo, basta acessar a plataforma com suas credenciais e continuar exatamente de onde parou.",
	},
	{
		value: "6",
		trigger: "Como eu faço para entrar na plataforma?",
		content:
			"É simples! Inscreva-se na nossa lista de espera para ser um dos primeiros a aproveitar todos os benefícios da Moovilog. Assim que a plataforma for lançada, entraremos em contato para você começar a transformar sua gestão.",
	},
	// {
	// 	value: "7",
	// 	trigger: "Quanto custará a plataforma?",
	// 	content:
	// 		"O custo da plataforma será de R$ 189,90 por mês. No entanto, no lançamento, teremos um desconto exclusivo para os primeiros clientes por tempo limitado. Não perca essa oportunidade de economizar e revolucionar sua gestão, inscreva-se na lista de espera agora mesmo!",
	// },
	// {
	// 	value: "8",
	// 	trigger: "Quais serão as formas de pagamento?",
	// 	content:
	// 		"Inicialmente, você poderá pagar com cartões de crédito e débito. Em breve, também aceitaremos PIX e boletos bancários para oferecer ainda mais conveniência e flexibilidade.",
	// },
];

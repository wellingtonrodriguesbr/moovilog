import Lottie from "react-lottie";
import * as emptyAnimation from "@/assets/lotties/empty-animation.json";

interface EmptyProps {
	context: "vehicle" | "driver" | "route";
}

const DEFAULT_OPTIONS = {
	loop: true,
	autoplay: true,
	animationData: emptyAnimation,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

const EMPTY_CONTEXTS = {
	vehicle: "Nenhum veículo cadastrado",
	driver: "Nenhum motorista cadastrado",
	route: "Nenhuma rota cadastrada",
};

export function Empty({ context }: EmptyProps) {
	return (
		<div className="flex items-center justify-center flex-col gap-4 w-full h-auto p-6 md:p-12 rounded-md bg-zinc-100 text-zinc-600">
			<Lottie options={DEFAULT_OPTIONS} height={200} width={200} />
			<h6 className="text-2xl text-app-blue-900">
				Nenhum dado encontrado!
			</h6>
			<p className="text-center max-w-full md:max-w-sm">
				{EMPTY_CONTEXTS[context]}, clique no botão superior direito e
				cadastre agora mesmo.
			</p>
		</div>
	);
}

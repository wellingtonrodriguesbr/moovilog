"use client";

import Lottie from "react-lottie";
import * as emptyAnimation from "@/assets/lotties/empty-animation.json";

interface EmptyProps {
	context:
		| "vehicle"
		| "driver"
		| "route"
		| "freight"
		| "pickup"
		| "financial";
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
	freight: "Nenhum frete cadastrado",
	pickup: "Nenhuma coleta cadastrada",
	financial: "Nenhuma transação cadastrada",
};

export function Empty({ context }: EmptyProps) {
	return (
		<div className="flex items-center justify-center flex-col gap-4 w-full h-auto p-6 md:p-12 rounded-md bg-zinc-100 text-zinc-600">
			<div className="w-full h-full max-w-[300px] max-h-[300px]">
				<Lottie
					options={DEFAULT_OPTIONS}
					style={{ objectFit: "contain" }}
				/>
			</div>
			<h6 className="text-center text-2xl text-app-blue-900">
				Nenhum dado encontrado!
			</h6>
			<p className="text-center max-w-full md:max-w-sm">
				{EMPTY_CONTEXTS[context]}, clique no botão superior direito e
				cadastre agora mesmo.
			</p>
		</div>
	);
}

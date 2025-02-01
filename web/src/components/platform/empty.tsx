import { Frown } from "lucide-react";

interface EmptyProps {
	context: "vehicle" | "driver" | "route";
}

const EMPTY_CONTEXTS = {
	vehicle: "Nenhum veículo cadastrado",
	driver: "Nenhum motorista cadastrado",
	route: "Nenhuma rota cadastrada",
};

export function Empty({ context }: EmptyProps) {
	return (
		<div className="flex items-center justify-center flex-col gap-4 w-full h-auto p-6 md:p-12 rounded-md bg-zinc-100 text-zinc-600">
			<Frown className="size-10 text-app-blue-500" />
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

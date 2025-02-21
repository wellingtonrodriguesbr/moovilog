import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "react-use";
import { toast } from "sonner";

interface UseValidateCompanyDocumentNumberProps {
	documentNumber: string;
}

export interface UseValidateCompanyDocumentNumberResponse {
	uf: string;
	cep: string;
	qsa: string[] | null;
	cnpj: string;
	pais: string | null;
	email: string | null;
	porte: string;
	bairro: string;
	numero: string;
	ddd_fax: string;
	municipio: string;
	logradouro: string;
	cnae_fiscal: number;
	codigo_pais: string | null;
	complemento: string;
	codigo_porte: number;
	razao_social: string;
	nome_fantasia: string;
	capital_social: number;
	ddd_telefone_1: string;
	ddd_telefone_2: string;
	opcao_pelo_mei: boolean;
	descricao_porte: string;
	codigo_municipio: number;
	cnaes_secundarios: CnaesSecundario[];
	natureza_juridica: string;
	situacao_especial: string;
	opcao_pelo_simples: boolean;
	situacao_cadastral: number;
	data_opcao_pelo_mei: string;
	data_exclusao_do_mei: string | null;
	cnae_fiscal_descricao: string;
	codigo_municipio_ibge: number;
	data_inicio_atividade: string;
	data_situacao_especial: string | null;
	data_opcao_pelo_simples: string;
	data_situacao_cadastral: string;
	nome_cidade_no_exterior: string;
	codigo_natureza_juridica: number;
	data_exclusao_do_simples: string | null;
	motivo_situacao_cadastral: number;
	ente_federativo_responsavel: string;
	identificador_matriz_filial: number;
	qualificacao_do_responsavel: number;
	descricao_situacao_cadastral: string;
	descricao_tipo_de_logradouro: string;
	descricao_motivo_situacao_cadastral: string;
	descricao_identificador_matriz_filial: string;
}

export interface CnaesSecundario {
	codigo: number;
	descricao: string;
}

export function useValidateCompanyDocumentNumber({
	documentNumber,
}: UseValidateCompanyDocumentNumberProps) {
	const [isReady] = useDebounce(
		() => {
			setDebouncedValue(documentNumber);
		},
		4000,
		[documentNumber]
	);
	const [debouncedValue, setDebouncedValue] = useState("");

	const {
		data: companyInformation,
		isPending: isValidateCompanyDocumentNumberPending,
		status,
	} = useQuery({
		queryKey: ["validate-company-document-number", debouncedValue],
		queryFn: () => handleValidDocumentNumber({ documentNumber }),
		enabled:
			!!isReady() && !!debouncedValue.length && debouncedValue.length > 8,
	});

	async function handleValidDocumentNumber({
		documentNumber,
	}: {
		documentNumber: string;
	}) {
		try {
			const { data } =
				await axios.get<UseValidateCompanyDocumentNumberResponse>(
					`https://brasilapi.com.br/api/cnpj/v1/${documentNumber}`
				);
			toast.success("CNPJ encontrado com sucesso");
			return data;
		} catch (error) {
			toast.error("CNPJ inválido");
			console.log(error);
		}
	}

	return {
		companyInformation,
		isValidateCompanyDocumentNumberPending,
		status,
	};
}

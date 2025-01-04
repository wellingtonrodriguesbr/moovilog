import dayjs from "dayjs";

export function formatBrazilianDate(date: string) {
	const dateObject = new Date(date);
	const formattedDate = dayjs(dateObject).format("DD/MM/YYYY");

	return formattedDate;
}

import dayjs from "dayjs";

export function formatBrazilianDate(date: string | Date) {
	const dateObject = new Date(date);
	const formattedDate = dayjs(dateObject).format("DD/MM/YYYY");

	return formattedDate;
}

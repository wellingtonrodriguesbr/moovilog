export function formatPhone(phone: string): string {
	phone = phone.replace(/\D/g, "");

	phone = phone.substring(0, 11);

	if (phone.length > 0) {
		phone = "(" + phone;
	}
	if (phone.length > 3) {
		phone = phone.substring(0, 3) + ") " + phone.substring(3);
	}
	if (phone.length > 10) {
		phone = phone.substring(0, 10) + "-" + phone.substring(10);
	}

	return phone;
}

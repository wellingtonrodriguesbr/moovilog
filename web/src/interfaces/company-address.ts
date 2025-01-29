import { Address } from "@/interfaces/address";
import { City } from "@/interfaces/city";
import { State } from "@/interfaces/state";

export interface CompanyAddress {
	address: Address;
	city: City;
	state: State;
}

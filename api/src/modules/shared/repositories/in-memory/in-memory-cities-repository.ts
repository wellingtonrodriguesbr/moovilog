import { City, Prisma } from "@prisma/client";
import { CitiesRepository } from "@/modules/shared/repositories/cities-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCitiesRepository implements CitiesRepository {
  public items: City[] = [];

  async create(data: Prisma.CityUncheckedCreateInput) {
    const city = {
      id: data.id ?? randomUUID(),
      name: data.name,
      stateId: data.stateId,
    };

    this.items.push(city);

    return city;
  }

  async findOrCreateByNameAndStateId(name: string, stateId: string) {
    const city = this.items.find((item) => item.name === name && item.stateId === stateId);

    if (!city) {
      const newCity = await this.create({
        name,
        stateId,
      });

      return newCity;
    }

    return city;
  }

  async findOrCreateManyByStateId(names: string[], stateId: string) {
    const cities = await Promise.all(names.map((name) => this.findOrCreateByNameAndStateId(name, stateId)));

    return cities;
  }

  async findManyByIds(ids: string[]) {
    const cities = this.items.filter((item) => ids.includes(item.id));

    if (!cities) {
      return null;
    }

    return cities;
  }

  async findById(id: string) {
    const city = this.items.find((item) => item.id === id);

    if (!city) {
      return null;
    }

    return city;
  }
}

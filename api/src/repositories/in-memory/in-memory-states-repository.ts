import { Prisma, State } from "@prisma/client";
import { StatesRepository } from "../states-repository";
import { randomUUID } from "crypto";

export class InMemoryStatesRepository implements StatesRepository {
  public items: State[] = [];

  async create(data: Prisma.StateUncheckedCreateInput) {
    const state = {
      id: data.id ?? randomUUID(),
      name: data.name,
      acronym: data.acronym,
    };

    this.items.push(state);
    return state;
  }

  async findById(id: string) {
    const state = this.items.find((item) => item.id === id);

    if (!state) {
      return null;
    }

    return state;
  }
}

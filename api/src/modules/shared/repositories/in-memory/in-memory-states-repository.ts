import { Prisma, State } from "@prisma/client";
import { StatesRepository } from "@/modules/shared/repositories/states-repository";
import { randomUUID } from "node:crypto";

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

  async findByNameAndAcronym(name: string, acronym: string): Promise<State | null> {
    const state = this.items.find((item) => item.name === name && item.acronym === acronym);

    if (!state) {
      return null;
    }

    return state;
  }

  async findByAcronym(acronym: string) {
    const state = this.items.find((item) => item.acronym === acronym);

    if (!state) {
      return null;
    }

    return state;
  }

  async findManyByAcronyms(acronyms: string[]) {
    const states = this.items.filter((item) => acronyms.includes(item.acronym));

    if (!states) {
      return null;
    }

    return states;
  }

  async findManyByIds(ids: string[]) {
    const states = this.items.filter((item) => ids.includes(item.id));

    if (!states) {
      return null;
    }

    return states;
  }
}

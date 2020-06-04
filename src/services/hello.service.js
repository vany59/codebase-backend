import { getMongoRepository } from "typeorm";
import * as uuid from "uuid";
import { Cat } from "@models";

export class HelloService {
  constructor() {
    this.cat = getMongoRepository(Cat);
  }

  async get() {
    return await this.cat.find();
  }

  async create(name) {
    console.log("create");
    this.cat.save({
      _id: uuid.v4(),
      name,
    });
  }

  update() {
    console.log("update");
  }
}

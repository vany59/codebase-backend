import { Resolver, Query } from "type-graphql";
import * as uuid from "uuid";

@Resolver()
export class helloResolver {
  @Query(() => String)
  hello() {
    return uuid.v4();
  }
}

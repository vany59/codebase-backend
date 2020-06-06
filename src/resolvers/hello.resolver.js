import {
  Resolver,
  Query,
  Subscription,
  Mutation,
  PubSub,
  Root,
} from "type-graphql";
import * as uuid from "uuid";

@Resolver()
export class helloResolver {
  @Query(() => String)
  hello() {
    console.log(req);
    return uuid.v4();
  }

  @Mutation(() => String)
  async openNotification(@PubSub() pubsub) {
    await pubsub.publish("NOTIFICATION", {
      event: "INSERT",
    });
    return "send notification";
  }

  @Subscription(() => String, {
    topics: "NOTIFICATION",
    filter: ({ payload: { event } }) => event === "INSERT",
  })
  newNotification(@Root() event) {
    console.log(event);
    return "this is notification";
  }
}

import { Arg, Mutation, Query, Resolver, createUnionType } from "type-graphql";
import {
  UserSharedUrl,
  UserSharedUrlToCreate,
} from "../entities/UserSharedUrl.entity";
import UserSharedUrlService from "../services/UserSharedUrl.service";
import { MessageGql } from "./common.types";
import { Message } from "../services/service";
import SharedUrlService from "../services/SharedUrl.service";
import UserService from "../services/User.service";

const UnionMessageUserSharedUrl = createUnionType({
  name: "UnionMessageUserSharedUrl",
  types: () => [UserSharedUrl, MessageGql] as const,
  resolveType: (value) => {
    return (value as UserSharedUrl).id !== undefined
      ? UserSharedUrl
      : MessageGql;
  },
});

@Resolver()
export class UserSharedUrlResolver {
  @Query(() => [UserSharedUrl])
  async UserSharedUrlList(): Promise<UserSharedUrl[]> {
    return await new UserSharedUrlService().getAllUserSharedUrls();
  }

  @Query(() => UserSharedUrl)
  async UserSharedUrlById(
    @Arg("id") id: string
  ): Promise<UserSharedUrl | undefined> {
    return await new UserSharedUrlService().getUserSharedUrlById(id);
  }

  @Query(() => [UserSharedUrl])
  async UserSharedUrlByUserId(
    @Arg("userId") userId: string
  ): Promise<UserSharedUrl[]> {
    return await new UserSharedUrlService().getUserSharedUrlsByUserId(userId);
  }

  @Query(() => [UserSharedUrl])
  async UserSharedUrlByEmail(
    @Arg("email") email: string
  ): Promise<UserSharedUrl[]> {
    return await new UserSharedUrlService().getUserSharedUrlsByEmail(email);
  }

  @Mutation(() => UnionMessageUserSharedUrl)
  async createUserSharedUrl(
    @Arg("userSharedUrlToCreate") userSharedUrlToCreate: UserSharedUrlToCreate
  ): Promise<UserSharedUrl | Message> {
    const { email, sharedUrlId, userId } = userSharedUrlToCreate;
    let user;
    if (userId) {
      user = await new UserService().getUserById(userId);
    }
    const sharedUrl = await new SharedUrlService().getSharedUrlById(
      sharedUrlId
    );
    if (!sharedUrl) {
      return { success: false, message: "SharedUrl not found." };
    }
    return await new UserSharedUrlService().createUserSharedUrl({
      email,
      sharedUrl,
      user: user ?? undefined,
    });
  }
}

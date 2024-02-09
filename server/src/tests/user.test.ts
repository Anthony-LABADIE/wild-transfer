import "reflect-metadata";
import { describe, expect, it, beforeAll } from "@jest/globals";
import { CREATE_USER } from "./gql";
import dataSource from "../lib/dataSource";
import { buildSchemaSync } from "type-graphql";
import { UserResolver } from "../resolvers/user.resolver";
import { ApolloServer } from "@apollo/server";
import { User } from "../entities/User.entity";
import assert from "assert";
import testDataSource from "./testDatasource";

type ResponseCreateUser = {
  CreateUser: Omit<User, "password">;
};
type ResponseMessage = {
  CreateUser: {
    message: string;
    success: boolean;
  };
};
const testUserData = {
  email: "test-user1@test.com",
  password: "test1",
  username: "test1",
  lastName: "test1",
  firstName: "firstName1",
};

const uuidRegex =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

const schema = buildSchemaSync({
  resolvers: [UserResolver],
  validate: false,
});
const server = new ApolloServer({
  schema,
});
describe("User resolver", () => {
  beforeAll(async () => {
    await testDataSource.initialize();
    jest
      .spyOn(dataSource, "getRepository")
      .mockReturnValue(testDataSource.getRepository(User));
  });
  it("creates a user", async () => {
    const res = await server.executeOperation<ResponseCreateUser>({
      query: CREATE_USER,
      variables: {
        userToCreate: {
          email: testUserData.email,
          password: testUserData.password,
          username: testUserData.username,
        },
      },
    });

    assert(res.body.kind === "single");
    expect(res.body.singleResult.data).toMatchObject({
      CreateUser: {
        email: testUserData.email,
        username: testUserData.username,
      },
    });
    expect(res.body.singleResult.data?.CreateUser.id).toMatch(uuidRegex);
  });

  it("throws an error if email already exists", async () => {
    const res = await server.executeOperation<ResponseMessage>({
      query: CREATE_USER,
      variables: {
        userToCreate: {
          email: testUserData.email,
          password: testUserData.password,
          username: testUserData.username,
        },
      },
    });
    assert(res.body.kind === "single");
    expect(res.body.singleResult.data?.CreateUser.message).toMatch(
      `User with email: ${testUserData.email} already exists`
    );
  });

  it("throws an error if username already exists", async () => {
    const res = await server.executeOperation<ResponseMessage>({
      query: CREATE_USER,
      variables: {
        userToCreate: {
          email: "test2@test.com",
          password: testUserData.password,
          username: testUserData.username,
        },
      },
    });
    assert(res.body.kind === "single");
    expect(res.body.singleResult.data?.CreateUser.message).toMatch(
      `User with username: ${testUserData.username} already exists`
    );
  });
});

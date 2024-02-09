import { Arg, Ctx, Mutation, Query, Resolver, createUnionType } from 'type-graphql';
import { User, UserCreateInput, UserLogin, UserLoginInput, UserUpdateInput, UserWithoutPassword } from '../entities/User.entity';
import UserService from '../services/User.service';
import { ItokenService, Message } from '../services/service';
import { MessageGql, UserWithToken } from './common.types';

const UnionMessageUser = createUnionType({
    name: 'UnionMessageUser',
    types: () => [UserLogin, MessageGql] as const,
    resolveType: (value) => {
        return (value as UserLogin).id !== undefined ? UserLogin : MessageGql;
    },
});

const UnionMessageRegister = createUnionType({
    name: 'UnionMessageRegister',
    types: () => [UserWithoutPassword, MessageGql] as const,
    resolveType: (value) => {
        return (value as UserWithoutPassword).id !== undefined ? UserWithoutPassword : MessageGql;
    },
});

const UnionMessageCheckToken = createUnionType({
    name: 'UnionMessageCheckToken',
    types: () => [UserWithToken, MessageGql] as const,
    resolveType: (value) => {
        return (value as UserWithToken).user?.id !== undefined ? UserWithToken : MessageGql;
    },
});

@Resolver()
export class UserResolver {
    @Query(() => [UserWithoutPassword])
    async UserList(): Promise<Omit<User, 'password'>[]> {
        const users = await new UserService().getAllUsers();
        return users;
    }

    @Query(() => UserWithoutPassword)
    async User(@Arg('id') id: string): Promise<Omit<User, 'password'> | null> {
        const user = await new UserService().getUserById(id);
        return user;
    }

    @Query(() => UserWithoutPassword)
    async UserByUsername(@Arg('username') username: string): Promise<Omit<User, 'password'> | null> {
        const user = await new UserService().getUserByUsername(username);
        return user;
    }

    @Query(() => UserWithoutPassword)
    async UserByEmail(@Arg('email') email: string): Promise<Omit<User, 'password'> | null> {
        const user = await new UserService().getUserByEmail(email);
        return user;
    }

    @Mutation(() => UnionMessageRegister)
    async CreateUser(@Arg('userToCreate') userToCreate: UserCreateInput): Promise<Omit<User, 'password'> | Message> {
        const { username, email, password } = userToCreate;
        return await new UserService().createUser({
            username,
            email,
            password,
        });
    }

    @Mutation(() => MessageGql)
    async UpdateUser(
        @Arg('id') id: string,
        @Arg('userToUpdate') userToUpdate: UserUpdateInput,
        @Ctx() { user }: { user: User }
    ): Promise<MessageGql> {
        const { username, email, imgUrl, password } = userToUpdate;
        return await new UserService().updateUser(
            id,
            {
                username,
                email,
                imgUrl,
                password,
            },
            user
        );
    }
    @Mutation(() => MessageGql)
    async DeleteUser(@Arg('id') id: string) {
        return await new UserService().deleteUserById(id);
    }

    @Query(() => UnionMessageUser)
    async Login(@Arg('userLoginInfos') userLoginInfos: UserLoginInput): Promise<ItokenService | Message> {
        let user = await new UserService().loginUser(userLoginInfos);
        return user;
    }

    @Query(() => UnionMessageCheckToken)
    async CheckToken(@Arg('token', { nullable: true }) token: string): Promise<UserWithToken | MessageGql> {
        console.log('TOKEN', token);
        let user = await new UserService().getAndCheckTokenWithValue(token);
        console.log('USER', user);
        if ('message' in user) return { success: false, message: 'Token not valid' };
        console.log('UserResolver', user);
        return user;
    }
}

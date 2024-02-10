import { Field, ObjectType } from 'type-graphql';
import { UserWithoutPassword } from '../entities/User.entity';

@ObjectType()
export class MessageGql {
    @Field()
    success: boolean;
    @Field()
    message: string;
}

@ObjectType()
export class UserWithToken {
    @Field()
    token: string;
    @Field()
    user: UserWithoutPassword;
}

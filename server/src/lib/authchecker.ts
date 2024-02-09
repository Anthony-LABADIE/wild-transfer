import { AuthCheckerInterface, ResolverData } from "type-graphql";
import { Repository } from "typeorm";
import { User } from "../entities/User.entity";

export interface IContext {
  user: User | null;
}

export class AuthChecker implements AuthCheckerInterface<IContext> {
  constructor(private readonly userRepository: Repository<User>) {}

  check(
    { root, args, context, info }: ResolverData<IContext>,
    roles: string[]
  ) {
    const { user } = context;
    return user !== null;
  }
}

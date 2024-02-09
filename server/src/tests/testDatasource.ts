import { DataSource } from "typeorm";
import { User } from "../entities/User.entity";
import { Comment } from "../entities/Comment.entity";
import { Emoji } from "../entities/Emoji.entity";
import { File } from "../entities/File.entity";
import { SharedUrl } from "../entities/SharedUrl.entity";
import { UserSharedUrl } from "../entities/UserSharedUrl.entity";
import { Interaction } from "../entities/Interaction.entity";

const testDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "wildTransfer",
  synchronize: true,
  entities: [User, Comment, Emoji, File, SharedUrl, UserSharedUrl, Interaction],
  logging: ["error"],
});

export default testDataSource;

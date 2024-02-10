import { DataSource } from 'typeorm';
import { Comment } from '../entities/Comment.entity';
import { File } from '../entities/File.entity';
import { SharedUrl } from '../entities/SharedUrl.entity';
import { User } from '../entities/User.entity';
import { UserSharedUrl } from '../entities/UserSharedUrl.entity';
import { Interaction } from '../entities/Interaction.entity';
import { Emoji } from '../entities/Emoji.entity';
import dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: ['query', 'error'],
    entities: [Comment, File, SharedUrl, User, UserSharedUrl, Interaction, Emoji],
});

export default dataSource;

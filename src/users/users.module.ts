import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controller/users.controller';
import { UserSchema } from './schema/user.schema';
import { UsersService } from './service/users.service';
import * as bcrypt from 'bcrypt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'user',
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', async function () {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(this.password, saltRounds);
            this.password = hashedPassword;
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

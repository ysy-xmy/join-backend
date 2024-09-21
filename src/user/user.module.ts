import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CommonService, UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, CommonService]
})
export class UserModule {}

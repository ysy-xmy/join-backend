/*
 * @Author: linjingcheng 1152691418@qq.com
 * @Date: 2022-09-14 15:31:17
 * @LastEditors: linjingcheng 1152691418@qq.com
 * @LastEditTime: 2022-09-27 11:19:52
 * @FilePath: \nestjs-api-tutorial\src\user\user.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { CommonService, UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService, private commonService: CommonService) {}
  @Post('me')
  getMe(@GetUser() user: User) {
    return this.userService.getUser(user.id);
  }


  @Put('submit')
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }

  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@GetUser() user: User, @UploadedFile() file: Express.Multer.File) {
    console.log('fileString', file);
    return this.commonService.UploadedFile(user.id, file.buffer, file.originalname);
  }
}


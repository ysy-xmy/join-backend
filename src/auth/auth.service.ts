/*
 * @Author: linjingcheng 1152691418@qq.com
 * @Date: 2022-09-14 15:31:17
 * @LastEditors: linjingcheng 1152691418@qq.com
 * @LastEditTime: 2022-10-01 18:11:56
 * @FilePath: \nestjs-api-tutorial\src\auth\auth.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await  bcrypt.hashSync(dto.password, 10);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          schoolId: dto.schoolId,
          hash,
        },
      });

      return this.signToken(user.id, user.schoolId);
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          schoolId: dto.schoolId,
        },
      });
    // if user does not exist throw exception
    if (!user)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    // compare password
    const pwMatches = await bcrypt.compareSync(
      dto.password,
      user.hash,
    );
    // if password incorrect throw exception
    if (!pwMatches)
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    return this.signToken(user.id, user.schoolId);
  }

  async signToken(
    userId: number,
    schoolId: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      schoolId,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: secret,
      },
    );

    return {
      access_token: token,
    };
  }
}

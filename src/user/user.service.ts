/*
 * @Author: linjingcheng 1152691418@qq.com
 * @Date: 2022-09-14 15:31:17
 * @LastEditors: linjingcheng 1152691418@qq.com
 * @LastEditTime: 2022-10-01 15:27:35
 * @FilePath: \nestjs-api-tutorial\src\user\user.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import * as OSS from 'ali-oss';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  
  async getUser(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  
    delete user.hash;
    console.log(user);
    
  
    return user;
  
  }

  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
        status: 0,
      },
    });

    delete user.hash;

    return user;
  }
}

// @Injectable()
// export class CommonService {
//   constructor(private prisma: PrismaService) {}

//   async UploadedFile(
//     userId: number,
//     file: Express.Multer.File,
//   ): Promise<any> {
//     // 返回类型建议根据实际情况进行调整
//     // 定义目标路径
//     const uploadDir = path.join(
//       __dirname,
//       'uploads',
//     );
//     const uploadPath = path.join(
//       uploadDir,
//       file.originalname +
//         '-' +
//         userId +
//         path.extname(file.originalname),
//     );

//     // 检查文件夹是否存在，如果不存在则创建
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }

//     try {
//       // 使用fs.promises.writeFile进行异步写入
//       await fs.promises.writeFile(
//         uploadPath,
//         file.buffer,
//       );

//       // 更新用户信息并返回用户对象
//       const user = await this.prisma.user.update({
//         where: {
//           id: userId,
//         },
//         data: {
//           appendix: uploadPath,
//         },
//       });

//       return user; // 返回用户对象
//     } catch (err) {
//       console.error(err);
//       throw new Error('文件上传或用户更新失败'); // 可以根据具体需求自定义错误
//     }
//   }
// }
@Injectable()
export class CommonService {
  private client: OSS;

  constructor(private prisma: PrismaService, config: ConfigService) {
    this.client = new OSS({
      region: config.get('REGION'),
      accessKeyId: config.get('ACCESS_KEY_ID'),
      accessKeySecret: config.get('ACCESS_KEY_SECRET'),
      bucket: config.get('BUCKET'),
    });
  }

  async UploadedFile(userId: number, file: Buffer, filename: string) {
    const result = await this.client.put(filename, file);
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        appendix: result.url,
      },
    });

    delete user.hash;

    return user;
  }
}

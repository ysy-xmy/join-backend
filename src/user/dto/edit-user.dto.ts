/*
 * @Author: linjingcheng 1152691418@qq.com
 * @Date: 2022-09-14 15:31:17
 * @LastEditors: linjingcheng 1152691418@qq.com
 * @LastEditTime: 2022-10-02 10:57:06
 * @FilePath: \nestjs-api-tutorial\src\user\dto\edit-user.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  IsEmail,
  IsNotEmpty,
  isNumber,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  isString,
  IsString,
} from 'class-validator';

export class EditUserDto {
  @IsEmail()
  email?: string;

  @IsString()
  phone:string;

  @IsString()
  name:string;
  
  @IsString()
  schoolId:string;

  // @IsNumber()
  // status:number;

  @IsNumber()
  gender:number;

  @IsString()
  joinReason:string;

  @IsString()
  introduce:string;

  @IsString()
  skill:string;

  @IsString()
  skillAddition:string;

  @IsNotEmpty()
  opt1:string

  @IsNotEmpty()
  opt2:string 

  @IsString()
  appendix:string;

  
  

}

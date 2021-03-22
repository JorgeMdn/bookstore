import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";

@Exclude()
export class ReadUserDetailDto {
    @Expose()
    @IsString()
    readonly name:string

    @Expose()
    @IsString()
    readonly lastname:string
}
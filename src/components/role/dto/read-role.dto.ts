import { IsNumber, IsString, MaxLength } from "class-validator";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ReadRoleDto {
    @Expose({name: 'identificador'}) //nivel base de datos
    @IsNumber()
    readonly id: number // nivel cliente

    @Expose()
    @IsString()
    @MaxLength(50,{message: 'This name is not valid'})
    readonly name: string

    @Expose()
    @IsString()
    @MaxLength(100,{message: 'This description is not valid'})
    readonly description: string
}

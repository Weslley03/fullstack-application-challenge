import { IsNotEmpty, IsString } from "class-validator";

export class CreateDocumentoDto {
  
  @IsNotEmpty({ message: 'The field documento_desc is required'})
  @IsString()
  documento_desc: string;
  
  @IsNotEmpty({ message: 'The field documento_image is required'})
  @IsString()
  documento_image: string;
}
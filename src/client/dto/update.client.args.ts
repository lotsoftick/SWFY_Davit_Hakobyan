import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

@InputType()
export class UpdateClientArgs {
  @Field(() => String, { nullable: false })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;
}

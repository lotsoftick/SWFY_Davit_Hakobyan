import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export abstract class BaseModel {
  @Field({ nullable: true })
  @Expose({ name: 'createdAt', toPlainOnly: true })
  createdAt?: Date;

  @Field({ nullable: true })
  @Expose({ name: 'updatedAt', toPlainOnly: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  @Expose({ name: 'deletedAt', toPlainOnly: true })
  deletedAt?: Date;
}

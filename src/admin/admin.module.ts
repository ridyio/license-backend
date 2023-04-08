import { Module } from '@nestjs/common';
import { JwtStrategy } from './gql.auth.guard';

@Module({
  imports: [],
  providers: [JwtStrategy],
})
export class AdminModule {}

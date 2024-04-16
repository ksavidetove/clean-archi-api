import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from 'application/application.module';
import { DomainModule } from 'domain/domain.module';
import { getDataSourceOptions } from 'infrastructure/dataSource';
import { InfrastructureModule } from 'infrastructure/infrastructure.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(getDataSourceOptions()),
    ApplicationModule,
    DomainModule,
    InfrastructureModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}

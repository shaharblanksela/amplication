import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExceptionFiltersModule } from 'src/filters/exceptionFilters.module';
import { PrismaModule } from '@amplication/prisma-db';
import { GqlAuthModule } from 'src/guards/gql-auth.module';
import { EntityModule } from 'src/core/entity/entity.module';
import { PermissionsModule } from 'src/core/permissions/permissions.module';
import { UserModule } from 'src/core/user/user.module';
import { AppRoleModule } from 'src/core/appRole/appRole.module';
import { AppModule } from 'src/core/app/app.module'; // eslint-disable-line import/no-cycle
import { AppSettingsModule } from 'src/core/appSettings/appSettings.module'; // eslint-disable-line import/no-cycle
import { BuildService } from './build.service';
import { BuildResolver } from './build.resolver';
import { BuildController } from './build.controller';
import { RootStorageModule } from '../storage/root-storage.module';
import { ActionModule } from '../action/action.module';
import { DeploymentModule } from '../deployment/deployment.module';
import { ContainerBuilderRootModule } from '../containerBuilder/containerBuilderRoot.module';
import { StorageOptionsModule } from '../storage/storage-options.module';
import { BuildFilesSaver } from './utils';
import { QueueModule } from '../queue/queue.module';
import { CommitModule } from '../commit/commit.module';
import { NotificationModule } from '../notifications/notifications.module';
import { NOTIFICATION_TOKEN } from '../notifications/notifications.interface';
import {
  NotificationsService,
  QUEUE_SERVICE_NAME
} from '../notifications/notifications.service';
import { ClientsModule } from '@nestjs/microservices';
import { createNestjsKafkaConfig } from '@amplication/kafka';

@Module({
  imports: [
    ConfigModule,
    ExceptionFiltersModule,
    GqlAuthModule,
    EntityModule,
    PrismaModule,
    PermissionsModule,
    UserModule,
    RootStorageModule,
    AppRoleModule,
    ActionModule,
    ContainerBuilderRootModule,
    StorageOptionsModule,
    DeploymentModule,
    forwardRef(() => AppModule),
    AppSettingsModule,
    QueueModule,
    forwardRef(() => CommitModule),
    NotificationModule,
    ClientsModule.registerAsync([
      {
        name: QUEUE_SERVICE_NAME,
        useFactory: createNestjsKafkaConfig
      }
    ])
  ],
  providers: [
    BuildService,
    BuildResolver,
    BuildFilesSaver,
    {
      provide: NOTIFICATION_TOKEN,
      useClass: NotificationsService
    }
  ],
  exports: [BuildService, BuildResolver],
  controllers: [BuildController]
})
export class BuildModule {}

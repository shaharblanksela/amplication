import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import {
  QUEUE_SERVICE_NAME,
  NotificationsService
} from './notifications.service';
import { createNestjsKafkaConfig } from '@amplication/kafka';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: QUEUE_SERVICE_NAME,
        useFactory: createNestjsKafkaConfig
      }
    ])
  ],
  providers: [NotificationsService],
  exports: [NotificationsService]
})
export class NotificationModule {}

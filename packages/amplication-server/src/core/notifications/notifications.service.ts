import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NotificationMessagePattern } from './notificationMessagePattern.interface';
import { Notifications } from './notifications.interface';

const KAFKA_TOPIC_NAME_KEY = 'KAFKA_TOPIC';
export const QUEUE_SERVICE_NAME = 'NOTIFICATION_SERVICE';

@Injectable()
export class NotificationsService implements Notifications {
  private kafkaTopicName: string;
  constructor(
    @Inject(QUEUE_SERVICE_NAME)
    private readonly clientKafka: ClientKafka,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService
  ) {
    this.kafkaTopicName = this.configService.get<string>(KAFKA_TOPIC_NAME_KEY);
  }

  async notify(message: NotificationMessagePattern): Promise<void> {
    try {
      this.clientKafka.emit(this.kafkaTopicName, message);
    } catch (err) {
      this.logger.error(
        `failed to push Kafka topic name ${this.kafkaTopicName}`,
        err
      );
    }
  }
}

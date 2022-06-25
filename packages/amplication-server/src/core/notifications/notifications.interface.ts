import { NotificationMessagePattern } from './notificationMessagePattern.interface';

export const NOTIFICATION_TOKEN = 'NOTIFICATION_TOKEN';

export interface Notifications {
  notify(message: NotificationMessagePattern): Promise<void>;
}

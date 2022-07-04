//Authorization decorator to be used on resolvers and controllers together with the jwt-guard

import { SetMetadata } from '@nestjs/common';
import { CustomDecorator } from '@nestjs/common/decorators/core/set-metadata.decorator';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Roles = (...roles: string[]): CustomDecorator =>
  SetMetadata('roles', roles);

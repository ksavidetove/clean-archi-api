import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const BodyAndParam = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return { ...req.body, ...req.params };
  },
);

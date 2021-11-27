import { Context, Get, HttpResponseOK, IAppController, controller } from '@foal/core';

import { AuthController } from './public/auth.controller';

export class ApiController implements IAppController {

  subControllers = [
    controller('/auth', AuthController)
  ];

  @Get('/')
  index(ctx: Context) {
    return new HttpResponseOK('Hello world!');
  }

}

import { Context, Get, HttpResponseOK } from '@foal/core';

export class GraphqlController {

  @Get('/')
  foo(ctx: Context) {
    return new HttpResponseOK();
  }

}

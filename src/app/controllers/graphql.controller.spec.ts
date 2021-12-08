// std
import { ok, strictEqual } from 'assert';

// 3p
import { Context, createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { GraphqlController } from './graphql.controller';

describe('GraphqlController', () => {

  let controller: GraphqlController;

  beforeEach(() => controller = createController(GraphqlController));

  describe('has a "foo" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(GraphqlController, 'foo'), 'GET');
      strictEqual(getPath(GraphqlController, 'foo'), '/');
    });

    it('should return an HttpResponseOK.', () => {
      const ctx = new Context({});
      ok(isHttpResponseOK(controller.foo(ctx)));
    });

  });

});

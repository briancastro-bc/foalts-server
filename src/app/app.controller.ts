import { controller, IAppController } from '@foal/core';
import { createConnection } from 'typeorm';

import { ApiController } from './controllers';

export class AppController implements IAppController {
  subControllers = [
    controller('/api', ApiController),
  ];

  /**
   * @method init - Es llamado una vez se ejecuta la aplicación.
   */
  async init() {
    await Promise.all([
      createConnection(),
      // Something
    ])
  }
}

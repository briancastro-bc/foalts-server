import { controller, IAppController } from "@foal/core";
import { createConnection } from "typeorm";

import { ApiController, GraphqlController, OpenApiController } from "@app/controllers";

export class AppController implements IAppController {

	subControllers = [
		controller("/api", ApiController),
		controller('/swagger', OpenApiController),
		controller("/graphql", GraphqlController)
	];

	/**
	 * @method init - Es llamado una vez se ejecuta la aplicación.
	 */
	async init() {
		await Promise.all([
			createConnection(),
			// Something
		]);
	}
}

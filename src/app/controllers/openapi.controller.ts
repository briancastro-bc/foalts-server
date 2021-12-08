import { SwaggerController } from '@foal/swagger';
import { ApiController } from './';

export class OpenApiController extends SwaggerController {

  options = { controllerClass: ApiController }

}

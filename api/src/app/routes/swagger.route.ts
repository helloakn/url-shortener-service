// const swaggerUI = require('swagger-ui-express');
// var swaggerDocument = require('./swaggers.json');
// module.exports = app => {
//     app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// }

import swaggerUi = require('swagger-ui-express');

import { THttpApplication} from '../../core/types/http.types';

import swaggerDocument from '../controllers/swagger'

export const RouteSwagger=(httpSrv: THttpApplication)=>{
  httpSrv.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
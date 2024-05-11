// eslint-disable-next-line no-unused-vars
import { Express } from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import FilesController from '../controllers/FilesController';
import { basicAuthenticate, xTokenAuthenticate } from '../middlewares/auth';
import { APIError, errorResponse } from '../middlewares/error';

/**
 * Injects routes with their handlers to the given Express application.
 * @param {Express} api
 */
const injectRoutes = (api_ => {
    api_.get('/status', AppController.getStatus);
    api.get('/status', AppController.getStats);

    api_.get('/connect', basicAuthenticate, AuthController.getConnect);
    api.get('/disconnect', xTokenAuthenticate, AuthController.getDisconnect);

    api.post('/users', UsersControo)
})
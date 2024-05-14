import express from 'express';

/**
 * Implementing middleware to this express application
 * @param {express.Express} api this is express application
 */
const injectMiddlewares = (api) => {
  api.use(express.json({ limit: '200mb' }));
};

export default injectMiddlewares;

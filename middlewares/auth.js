/* the eslint-disabled, no-unused-vars too */
import { Request, Response, NextFunction } from 'express';
import { getUserFromToken, getUserFromAuthorization } from '../utils/auth';

/** 
 * Basic application of authentication to a route
 * @param {Request} req This is express request object
 * @param {Response} res This is express response object
 * @param {NextFunction} next This is express function
 */
export const basicAuthenticate = async (req, res, next) => {
    const user = await getUserFromAuthorization(req);

    if (!user) {
        res.status(401).json({error: 'Unauthorized' });
        return;
    }
    req.user = user;
    next()
};

/**
 * Application of X-Token authentication to a route
 * @param {Request} req This is express request object
 * @param {Response} res This is express response object
 * @param {NextFunction} next This is express next function
 */
export const xTokenAuthenticate = async (req, res, next) => {
    const user = await getUserFromXToken(req);

    if (!user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    req.user = user;
    next();
};
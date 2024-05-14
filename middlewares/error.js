/* The eslint disabled eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';

/**
 * Representation of errors found in this API
 */
export class APIError extends Error {
    constructor(code, message) {
        super();
        this.code = code || 500;
        this.message = message;
    }
}

/**
 * Application of Basic authenctication to a route
 * @param {Error} err the Error object 
 * @param {Request} req This is express request object
 * @param {Response} res This is express response object
 * @param {NextFunction} next This is express next function
 */
export const errorResponse = (err, req, res, next) => {
    const defaultMsg = `Failed to process ${req.url}`;

    if (err instanceof APIError) {
        res.status(err.code).json({ error: err.message || defaultMsg});
        return;
    }
    res.status(500).json({
        error: err ? err.message || err.toString() : defaultMsg,
    });
};
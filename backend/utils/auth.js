const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { ProjectManager } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
const setTokenCookie = (res, projectManager) => {
    // Create the token.
    const safeUser = {
        id: projectManager.id,
        email: projectManager.email,
        username: projectManager.username,
    };
    const token = jwt.sign(
        { data: safeUser },
        secret,
        { expiresIn: parseInt(expiresIn, 10) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === 'production';

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: parseInt(expiresIn, 10) * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'Lax' : 'Strict',
    });

    return token;
};

const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.projectManager = null;

    return jwt.verify(token, secret, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            const projectManager = await ProjectManager.findByPk(id, {
                attributes: ['id', 'email', 'username', 'createdAt', 'updatedAt'],
            });

            if (!projectManager) {
                res.clearCookie('token');
            } else {
                req.projectManager = projectManager;
            }
        } catch (e) {
            res.clearCookie('token');
            return next(e);
        }

        return next();
    });
};

// If there is no current user, return an error
const requireAuth = (req, _res, next) => {
    if (req.projectManager) return next();

    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
};

module.exports = { setTokenCookie, restoreUser, requireAuth };
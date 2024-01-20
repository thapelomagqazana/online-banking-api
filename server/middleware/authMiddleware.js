const jwt = require("jsonwebtoken");
const config = require("../config/config");

/**
 * Middleware to verify the presence and validity of a JWT token in the request header.
 * If valid, attaches the user ID to the request for further processing.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next function.
 * @returns {function} Express middleware function.
 */
const authMiddleware = (req, res, next) => {
    // Get the token from the request headers
    const token = req.header("Authorization");

    if (!token)
    {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try
    {
        // Verify the token
        const decoded = jwt.verify(token.replace("Bearer ", ""), config.jwtSecret);

        // Attach the user ID to the request for further use
        req.userId = decoded.userId;
        next();
    }
    catch (error)
    {
        if (error.name === 'TokenExpiredError') {
            // If the token is expired, return Forbidden status
            return res.status(403).json({ message: 'Token expired' });
        }

        console.error(error);
        // If the token is invalid, return Unauthorized status
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authMiddleware;
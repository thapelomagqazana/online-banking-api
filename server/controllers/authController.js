const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const config = require("../config/config");

/**
 * Register a new user.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} JSON response indicating success or an error message.
 */
const register = async (req, res) => {
    try 
    {
        const errors = validationResult(req);
        if (!errors.isEmpty())
        {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        // Check if user already exists by username
        let existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Check if user already exists by email
        let existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Authenticate a user and generate a JWT token upon successful login.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} JSON response with the JWT token or an error message.
 */
const login = async (req, res) => {
    try
    {
        const errors = validationResult(req);
        if (!errors.isEmpty())
        {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });

        if (!user)
        {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const existingEmail = await User.findOne({ email });
        if (!existingEmail)
        {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        

        // Check password
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch);
        if (!passwordMatch)
        {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, username: user.username }, config.jwtSecret,
            {expiresIn: '1h',
        });

        res.status(200).json({ token });
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { register, login };
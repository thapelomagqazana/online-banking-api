const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const config = require("../config/config");

const register = async (req, res) => {
    try 
    {
        const errors = validationResult(req);
        if (!errors.isEmpty())
        {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        // Check if user already exists
        let existingUser = await User.findOne({ username });
        if (existingUser)
        {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
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


const login = async (req, res) => {
    try
    {
        const errors = validationResult(req);
        if (!errors.isEmpty())
        {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user)
        {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        // Check password
        const passwordMatch = await bcrypt.compare(password, user.password);
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
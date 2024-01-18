const bcrypt = require("bcrypt");
const User = require('../models/User');

/**
 * Retrieve the user profile based on the authenticated user's ID.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} JSON response with the user's profile or an error message.
 */
const viewProfile = async (req, res) => {
    try
    {
        const user = await User.findById(req.userId);

        if (!user)
        {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Update the user profile based on the authenticated user's ID.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} JSON response indicating success or an error message.
 */

const updateProfile = async (req, res) => {
  try {
    const { username, password, email, profileImage } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.username = username || user.username;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    user.email = email || user.email;
    user.profileImage = profileImage || user.profileImage;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { viewProfile, updateProfile };
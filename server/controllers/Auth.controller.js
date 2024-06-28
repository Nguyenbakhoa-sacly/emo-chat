
const User = require('../models/User.model')
const bcryptjs = require('bcryptjs');
const authController = {

  register: async (req, res) => {
    try {
      const { name, email, password, profile_pic } = req.body;
      const checkEmail = await User.findOne({ email });
      if (checkEmail) {
        return res.status(400).json({
          message: 'Email already exists',
          error: true,
        })
      }
      //ma hoa mat khau
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      // luu vao data
      const user = new User(
        {
          name,
          email,
          password: hashedPassword,
          profile_pic
        });
      await user.save();
      res.status(201).json({
        message: 'User registered successfully',
        data: user,
        error: false,
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message || err,
        error: true,
      })
    }
  }
}

module.exports = authController;

const User = require('../models/User.model')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        // data: user,
        error: false,
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message || err,
        error: true,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
          error: true,
        })
      };
      // kiem tra mat khau
      const veryfyPass = bcryptjs.compareSync(password, user.password);
      if (!veryfyPass) {
        return res.status(400).json({
          message: 'Invalid password',
          error: true,
        })
      };
      // tao token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: '12d' }
      )
      // khong tra ra password
      const { password: pass, ...rest } = user._doc;
      return res.status(200).cookie('access_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      }).json({
        data: rest,
        success: true,
        message: 'User login successfully'
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message || err,
        error: true,
      });
    }
  },
  logOut: async (req, res) => {
    try {
      res.clearCookie('access_token')
        .status(200)
        .json({
          success: true,
          message: 'User has been log out'
        })
    } catch (e) {
      return res.status(500).json({
        message: err.message || err,
        error: true,
      });
    }
  },
}

module.exports = authController;
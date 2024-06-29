
const User = require('../models/User.model');

const userController = {
  updateUser: async (req, res) => {
    const { name, email, profile_pic } = req.body;
    const userVerify = req.user.id;
    try {
      if (userVerify !== req.params.userId) {
        return res.status(403).json({
          message: 'Unauthorized. You are not authorized to update this user',
          error: true,
        })
      };
      const updateUser = await User.findByIdAndUpdate(
        req.params.userId, {
        name: name,
        email: email,
        profile_pic: profile_pic,
      }, { new: true, runValidators: true });
      const { password, ...rest } = updateUser._doc;

      return res.status(200).json({
        message: 'Updated user successfully',
        data: rest,
        success: true,
      });

    } catch (err) {
      return res.status(500).json({
        message: err.message || err,
        error: true,
      })
    }
  },
}

module.exports = userController;
const jwt =require('jsonwebtoken')
const User = require('../models/usersModel'); // Import the User model or schema

const auth = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const id = decoded.id;

      const user = await User.findOne({ _id: id }); // Replace with the appropriate field or variable for the user ID in your user model

      if (!user) {
        return res.status(400).json({ msg: 'Not authorized' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: 'Not authorized' });
    }
  }

  if (!token) {
    res.status(400).json({ msg: 'Not authorized' });
  }
};
module.exports =auth
const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')
const JWT_SECRET = 'thisisasecretkey'

//Done
router.post("/login",async (req, res) => {
    try {
    
      const { email, password } = req.body;
      const user = await User.findOne({ email: email })
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  const userr = JSON.parse(JSON.stringify(user));
  delete userr.password
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      res.status(200).json({ token, userr });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  );

  module.exports = router

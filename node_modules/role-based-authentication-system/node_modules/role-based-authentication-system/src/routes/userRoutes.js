const express = require('express');
const verifytoken = require('../middlewares/authMiddleware')
const authorizeRole = require('../middlewares/authMiddleware');

const router = express.Router();

// admin can accesss
router.get('/admin', verifytoken, authorizeRole("admin"), (req, res) => {
  res.json({
    message: 'Welcome to the Admin',
  })
})

// admin and manager access
router.get('/moderator', verifytoken, authorizeRole("admin", "moderator"), (req, res) => {
  res.json({
    message: 'Welcome to the Moderator',
  })
})

// all can access routes
router.get('/user', verifytoken, authorizeRole("admin", "moderator", "users"), (req, res) => {
  res.json({
    message: 'Welcome to the Admin',
  })
})

module.exports = router;
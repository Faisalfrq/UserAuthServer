const express = require("express")
const router = express.Router()
const loginController = require("../controllers/login.controller")

router.get('/signup', loginController.signup)
router.post('/login', loginController.login)

module.exports = router
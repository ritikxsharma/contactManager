const express = require('express');

const router = express.Router()

const {loginUser, registerUser, currentUser} = require("../controllers/usersController");
const validateToken = require('../middleware/tokenValidator');
const passwordValidator = require("../middleware/passwordValidator")


router.route("/login").post(loginUser)
router.route("/register").post(passwordValidator,registerUser)
router.route("/current").get(validateToken, currentUser)


module.exports = router
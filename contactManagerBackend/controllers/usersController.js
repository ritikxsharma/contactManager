const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const userModel = require('../models/userModel');

//@desc Login user
//@route /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    console.log(req.body);
    if (!email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory..!!")
    }

    const user = await userModel.findOne({ email })
    
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = await jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15m"
            })

        res.status(200).json({"user": user, "token": accessToken })
        console.log("Login successfull");
    }
    else {
        res.status(401)
        throw new Error("email id or password is invalid")
    }

})

//@desc Register user
//@route /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body
    console.log("hdsgjfjhds");
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All fields are necessary")
    }
    const userAvailable = await userModel.findOne({ email })

    if (userAvailable) {
        res.status(400)
        throw new Error("User already registered with the same email.!")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await userModel.create({
        username: username,
        email: email,
        password: hashedPassword
    })

    res.status(201).json({ id: newUser.id, email: newUser.email })
    console.log("User Registered:", newUser);

})

//@desc Current user
//@route /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

//@desc Logout user
//@route /api/users/logout
//@access private
const tokenBlacklist = new Set()
const logoutUser = asyncHandler(async(req, res) =>{
    const token = req.headers.authorization || req.headers.Authorization
    tokenBlacklist.add(token)
    res.status(200).json({message: "Logout successful"})
})


module.exports = { loginUser, registerUser, currentUser, logoutUser }


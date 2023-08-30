const asyncHandler = require('express-async-handler')

const validatePassword = asyncHandler((req, res, next)=>{
    const password = req.body.password

    if (password.length < 8) {
        res.status(400)
        throw new Error("Password must be at least 8 characters long")
    }

    const upperCase = /[A-Z]/
    if (!upperCase.test(password)) {
        res.status(400)
        throw new Error("Password must contain atleast 1 uppercase character")
    }

    const specialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/
    if (!specialChars.test(password)) {
        res.status(400)
        throw new Error("Password must contain at least 1 special character")
    }

    const digits = /\d/
    if(!digits.test(password)){
        res.status(400)
        throw new Error("Password must contain atleast 1 digit")
    }

    next()

})

module.exports = validatePassword
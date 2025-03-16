const users = require("../models/userModels")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
dotenv.config();


const JWR_SECRET_KEY = process.env.JWT_SECRET_KEY

const register = async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body
        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "Invalid data",
                success: false
            })
        }
        const user = await users.findOne({ email })
        if (user) {
            return res.status(401).json({
                message: "This email is Already exists",
                success: false
            })
        }
        await users.create({
            fullname,
            email,
            password
        })
        return res.json({
            message: "Account Created Successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

const login = async (req, res, next) => {
    try {
        /**
         * Login Successful => email & password combination should match 
         * 2. not valid before
         * 3. not expired
         * 4.
         */
        const user = await users.findOne({ email: req.body.email })
        if (!user) {
            res.status(400)
                .json({
                    success: false,
                    message: "Incorrect user or Password"
                })
            return;
        }
        const isValidUser = await bcrypt.compare(req.body.password, user.password)
        if (isValidUser) {
            const currentTimeInSec = parseInt(Date.now() / 1000);
            const tokenData = {
                iat: currentTimeInSec,
                _id: user._id
            }
            const token = jwt.sign(tokenData, JWR_SECRET_KEY, {
                expiresIn: 3600,
                notBefore: 0
            })

            // DB update for this token /Store this token in DB

            await users.findByIdAndUpdate(user._id, { token: token })
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 3600000 // 1 hour in milliseconds
            })
            res.json({
                success: true,
                message: "Login successfully",
                token: token,
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email
                }
            })
            return
        };

        res.status(400).json({
            success: false,
            message: "Incorrect userName or Password"
        })
    } catch (err) {
        next(err)
    }
}

const logout = async (req, res, next) => {
    try {
        // Clear the token from the user record if token exists in cookies
        if (req.cookies && req.cookies.token) {
            try {
                const tokenData = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY || JWR_SECRET_KEY);
                if (tokenData && tokenData._id) {
                    await users.findByIdAndUpdate(tokenData._id, { token: "" });
                }
            } catch (err) {
                // Invalid token, just continue with logout
                console.log("Invalid token during logout:", err.message);
            }
        }

        // Clear the cookie
        res.cookie("token", "", {
            expires: new Date(0),
            httpOnly: true,
            sameSite: 'lax'
        });

        return res.status(200).json({
            message: "User Logged out Successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Logout Failed",
            success: false
        });
    }
}


const UserController = {
    register,
    login,
    logout
}
module.exports = UserController
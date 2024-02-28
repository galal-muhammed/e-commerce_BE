import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { userModel } from "../../../databases/models/user.model.js";
import { sendMail } from "../../email/emailSender.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../middleware/catchError.js";


const signup = catchError(async (req, res, next) => {
    let user = new userModel(req.body)
    await user.save()
    let token = jwt.sign({ userId: user._id }, process.env.JWTKEY)

    // sendMail(req.body.email, req.body.name)
    res.json({ message: "success", user, token })
})

const signin = catchError(async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ userId: user._id }, process.env.JWTKEY)
        return res.json({ message: "success", token });
    }
    else {
        next(new AppError("email or password is incorrect", 401))
    }
})
const changePassword = catchError(async (req, res, next) => {
    let user = await userModel.findOne({ _id: req.user._id });

    if (user && bcrypt.compareSync(req.body.password, user.password)) {

        let token = jwt.sign({ userId: user._id }, process.env.JWTKEY)
        await userModel.findByIdAndUpdate(req.user._id, { password: req.body.newpassword, passwordChangedAt: Date.now() })
        return res.json({ message: "success", token });
    }
    else {
        next(new AppError("old password is incorrect", 401))
    }
})
//authentication
const protectedRoutes = catchError(async (req, res, next) => {
    let { token } = req.headers

    if (!token) return next(new AppError('token not provided', 401))

    let decoded = jwt.verify(token, process.env.JWTKEY)
    console.log(decoded);
    let user = await userModel.findById(decoded.userId)
    if (!user) return next(new AppError('user not found', 401))
    if (user.passwordChangedAt) {
        let time = user.passwordChangedAt.getTime() / 1000
        if (decoded.iat < time) return next(new AppError('invalid Token', 401))
    }
    req.user = user
    next()
})
const allowedTo = (...roles) => {
    return catchError(async (req, res, next) => {
        if (!roles.includes(req.user.role)) return next(new AppError('you are not authorized', 401))
        next()
    })
}

export { signup, signin, changePassword, protectedRoutes, allowedTo };

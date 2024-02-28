import { catchError } from '../../middleware/catchError.js';
import { deletOne } from '../handlers/handlers.js';
import { ApiFeatures } from '../../utils/ApiFeatures.js';
import { userModel } from './../../../databases/models/user.model.js';

const addUser = catchError(async (req, res, next) => {
    let user = new userModel(req.body)
    await user.save()
    res.json({ message: "success", user:{name:user.name,email:user.email} })
})

const getAllUsers = catchError(async (req, res, next) => {
    let apiFeature = new ApiFeatures(userModel.find(), req.query)
    apiFeature.search().fields().filter().pagination().sort()
    let users = await apiFeature.mongooseQuery
    res.json({ message: "success",page:apiFeature.pageNumber, users })
})

const getSingleUser = catchError(async (req, res, next) => {
    let document = await userModel.findById(req.params.id)

    !document && res.status(404).json({ message: "failed", error: "document not found" })
    document && res.json({ message: "success", document })
})

const updateUser = catchError(async (req, res, next) => {
    let document = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

    !document && res.status(404).json({ message: "failed", error: "document not found" })
    document && res.json({ message: "success", document })
})

const deleteUser = deletOne(userModel)
export {
    addUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
}
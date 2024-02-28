import { catchError } from '../../middleware/catchError.js';
import { ApiFeatures } from '../../utils/ApiFeatures.js';
import { AppError } from '../../utils/AppError.js';
import { userModel } from '../../../databases/models/user.model.js';



const addAddress = catchError(async (req, res, next) => {
    let address = await userModel
        .findByIdAndUpdate(req.user._id, { $addToSet: { addresses: req.body } }, { new: true })

    !address && res.status(404).json({ message: "failed", error: "document not found" })
    address && res.json({ message: "success", address: address.addresses })
})

const removeAddress= catchError(async (req, res, next) => {
    let address = await userModel
        .findByIdAndUpdate(req.user._id, { $pull: { address: {_id:req.params.id} } }, { new: true })

    !address && res.status(404).json({ message: "failed", error: "document not found" })
    address && res.json({ message: "success", address: address.addresses })
})

const getLoggedUserAddresses = catchError(async (req, res, next) => {
    let {addresses} = await userModel.findById(req.user._id)

    !addresses && res.status(404).json({ message: "failed", error: "document not found" })
    addresses && res.json({ message: "success", addresses })
})

export {
    addAddress,
    removeAddress,
    getLoggedUserAddresses
}
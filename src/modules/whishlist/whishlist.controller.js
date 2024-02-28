import { catchError } from '../../middleware/catchError.js';
import { userModel } from '../../../databases/models/user.model.js';


const addToWhishlist = catchError(async (req, res, next) => {
    let whishlist = await userModel
        .findByIdAndUpdate(req.user._id, { $addToSet: { whishlist: req.body.product } }, { new: true }).populate('whishlist', 'title')

    !whishlist && res.status(404).json({ message: "failed", error: "document not found" })
    whishlist && res.json({ message: "success", whishlist: whishlist.whishlist })
})

const removeFromWhishlist = catchError(async (req, res, next) => {
    let whishlist = await userModel
        .findByIdAndUpdate(req.user._id, { $pull: { whishlist: req.params.id } }, { new: true }).populate('whishlist', 'title')

    !whishlist && res.status(404).json({ message: "failed", error: "document not found" })
    whishlist && res.json({ message: "success", whishlist: whishlist.whishlist })
})

const getLoggedUserwhishlist = catchError(async (req, res, next) => {
    let {whishlist} = await userModel.findById(req.user._id)

    !whishlist && res.status(404).json({ message: "failed", error: "document not found" })
    whishlist && res.json({ message: "success", whishlist })
})
export {
    addToWhishlist,
    removeFromWhishlist,
    getLoggedUserwhishlist
}
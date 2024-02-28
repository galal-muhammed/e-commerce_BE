import { catchError } from "../../middleware/catchError.js"

export const deletOne = (model) => {
    return catchError(async (req, res, next) => {
        let document = await model.findByIdAndDelete(req.params.id)

        !document && res.status(404).json({ message: "failed", error: "document not found" })
        document && res.json({ message: "success", document })
    })
}
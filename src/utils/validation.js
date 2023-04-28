import { isValidObjectId } from "mongoose"
function isValidObjectId(id){
    return !id||id&&isValidObjectId(id)
}




module.exports.isValidObjectId=isValidObjectId
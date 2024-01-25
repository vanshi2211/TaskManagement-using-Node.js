const {CustomAPIError}  = require('../errors/custom-errors');
const errorHandlerMiddlerware = (err,req,res,next) => 
{
    console.log(err);
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
        
      }
    return res.status(500).json({msg:'what is shou'});
}
//custom error handler
module.exports = errorHandlerMiddlerware;
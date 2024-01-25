const asyncWrapper  = (fn) =>
{
    //fn is a callback function
    //avoid the try-catch block
    //repetitive code

    // Explicitly returning a value from an asynchronous function can be useful when you want to provide a result to the promise's resolution.
   return async (req,res,next) => 
   {
        try {
            await fn(req,res,next)                 
        } 
        catch (error) 
        {
            next(error);
        }
        // next(error);. This means that it's passing the error object to the next middleware function in the chain. next middlewarer function inline is errorHandler
        // Inside this new function, it awaits the execution of fn(req, res, next) and catches any errors that may occur during the execution. If an error occurs, it passes the error to the next middleware.
        //
    }
    // In the asyncWrapper function, await fn(req, res, next) is indeed passing the req, res, and next parameters to the wrapped fn function. These parameters are the same, and they maintain their context from the outer function to the inner function.
}
/* //function (async callback function)    ---------->  async callback function - async(req,res,next) => 
    {                                                   {
        return async (req,res,next) =>                            const allTask =  await Task.find({});                                                    
        {                                                         res.send(taskName);
        try {                                            }
            await (async callback function(req,res,next))
        } 
        catch (error) 
        {
            next(error);
        }
        }                                                   
                                                                            
    
        

    }
 */
module.exports = asyncWrapper;
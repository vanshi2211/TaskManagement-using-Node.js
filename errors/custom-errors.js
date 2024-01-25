class CustomAPIError extends Error
{
    constructor(message,statusCode)
    {
        super(message) //The super() keyword is used to call the constructor of the parent class and pass the message parameter to it. In other words, it sets the error message for the instance of the class being constructed.
        this.statusCode = statusCode
        //This line assigns the statusCode parameter to a property named statusCode of the class instance being created. 
    }
}

const createCustomError= (msg, statusCode) => {
    return new CustomAPIError(msg,statusCode);
}

module.exports = {
    createCustomError,CustomAPIError
}

//By extending the built-in Error class and adding a statusCode property, you can create custom error objects that include both a meaningful error message and an associated HTTP status code for more informative error responses.
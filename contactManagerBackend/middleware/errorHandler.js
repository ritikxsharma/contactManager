 
 const {constants} = require("../constants")
 const errorHandler = (err, req, res, next) =>{
    console.log(res.statusCode);
    const statusCode = res.statusCode ? res.statusCode : 500

    switch (statusCode) {
        case constants.VALIDATION_FAILED:
            res.json({
                title: "VALIDATION FAILED",
                msg: err.message,
                stackTrace: err.stack
            })
            break;

        case constants.UNAUTHORIZED:
            res.json({
                title: "UNAUTHORIZED",
                msg: err.message,
                stackTrace: err.stack
            })
            break;

        case constants.FORBIDDEN:
            res.json({
                title: "FORBIDDEN",
                msg: err.message,
                stackTrace: err.stack
            })
            break;

        case constants.NOTFOUND:
            res.json({
                title: "NOT FOUND",
                msg: err.message,
                stackTrace: err.stack
            })
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "SERVER ERROR",
                msg: err.message,
                stackTrace: err.stack
            })
            break;
    
        default:
            console.log("ALL GOOD!! ERROR FREE");
            break;
    }
}

module.exports = errorHandler
const { check, validationResult } = require('express-validator');


const validationResults = (req, res, next) =>{
    try{
        validationResult(req).throw();
        return next();
    } catch (err) {
        res.status(403);
        res.send({erros: err.array() }) 
    }
}


module.exports = validationResults;

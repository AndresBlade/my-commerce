const {handleHttpErros} = require('../utils/handleErrors');

const customParam = (entity) => (req, res, next) => {
    try{
        req.params.entity = entity;
        next();
    }catch(e){
        console.log(e);
        handleHttpErros(res, 'ERROR_CUSTOM_PARAMS');
    }
}

module.exports = customParam;
const {handleHttpErros} = require('../utils/handleErrors');
const {userModel} = require('../models');
const { tokenVerify } = require('../utils/handleJwt');


const authMiddleware = async (req, res, next) =>{
    try{

        if(!req.headers.authorization){
            handleHttpErros(res, 'NEED_SESSION', 401);
        }

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await tokenVerify(token);

        if(!dataToken){
            handleHttpErros(res, 'NOT_PAYLOAD_DATA', 401);
        }

        const user = await userModel.findUserById(dataToken.id);
        
        req.user = user;
        next();
    }catch(error){
        if (error.name === 'TokenExpiredError') {
            handleHttpErros(res, 'SESSION_EXPIRED', 401);
        } else if (error.name === 'JsonWebTokenError'){
            handleHttpErros(res, 'NOT_PAYLOAD_DATA', 403);
        }else{
            handleHttpErros(res, 'ERROR_AUTH', 403);
        }
    }
}

module.exports = authMiddleware;
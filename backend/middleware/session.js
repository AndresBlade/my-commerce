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
    }catch(e){
        console.log(e);
        handleHttpErros(res, 'ERROR_AUTH', 401);
    }
}

module.exports = authMiddleware;
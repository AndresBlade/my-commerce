const {handleHttpErros} = require('../utils/handleErrors');

const checkRole = (roles) => async (req, res, next) =>{
    try{
        const {user} = req;
        const rolesByUser = user.role;

        const checkValueRole = roles.some((rolSingle) => rolesByUser.includes(rolSingle));

        if(!checkValueRole){
            handleHttpErros(res, 'USER_DONT_HAVE_PERMISSIONS', 403);
        }

        next();
    }catch(e){
        console.log(e);
        handleHttpErros(res, 'ERROR_CHECK_ROLE', 403);
    }
}

module.exports = checkRole;
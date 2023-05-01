const {handleHttpErros} = require('../utils/handleErrors');

const checkRole = (roles) => async (req, res, next) =>{
    try{
        const {user} = req;
        let roleByUser = user.tipo_id;

        switch(roleByUser){
            case 1: 
                roleByUser = 'CLIENTE';
                break;
            case 2:
                roleByUser = ['TIENDA','CLIENTE'];
                break;
            case 3:
                roleByUser = 'ADMINISTRADOR';
                break;
            default:
                roleByUser = 'UNKNOWN';
                break;
        }

        const checkValueRole = roles.some((rolSingle) => roleByUser.includes(rolSingle));

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
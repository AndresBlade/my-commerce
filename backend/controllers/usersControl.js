const { matchedData } = require('express-validator');
const {userModel} = require('../models');
const { encryptPassword, comparePassword } = require('../utils/handlePassword');
const {tokenSign} = require('../utils/handleJwt');
const {handleHttpErros} = require('../utils/handleErrors');


const createUser = async (req, res) => {
    try{
        req = matchedData(req);
        console.log(req);

        const contrasenna = await encryptPassword(req.contrasenna);
        const body = {...req, contrasenna};

        const dataUser = await userModel.create(body);   
        dataUser.set('contrasenna', undefined, {strict: false});

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }

        res.send({data});
    }catch(e){
        console.log(e);
        handleHttpErros(res, 'ERROR_CREATE_USER');
    }
}


const loginUser = async (req, res) => {
    try{
        req = matchedData(req);
        const user = await userModel.findOne({
            where:{
                email:req.email
            }
        });

        if(!user){
            handleHttpErros(res, 'USER_NOT_FOUND', 404);
            return
        }

        const hashPassword = user.get('contrasenna');
        const passwordMatch = await comparePassword(req.contrasenna, hashPassword);

        console.log(req.contrasenna, hashPassword);

        if(!passwordMatch){
            handleHttpErros(res, 'PASSWORD_NOT_MATCH', 401);
            return
        }

        user.set('contrasenna', undefined, {strict: false});
        const data ={
            token: await tokenSign(user),
            user
        }
        res.send({data});
    }catch(e){
        console.log(e);
        handleHttpErros(res, 'ERROR_LOGIN_USER');
    }
}

const getUsers = async (req, res) => {
    const data = await userModel.findAll({});
    res.send({data}); 
}

const getUsersById = async (req, res) => {
    try{
        const {id} = req.params;
        const data = await userModel.findUserById(id);
        res.send({data});
    }catch(e){
        console.log(e);
        handleHttpErros(res, 'ERROR_GET_USER_BY_ID');
    }
}


module.exports = {createUser, loginUser, getUsers, getUsersById};


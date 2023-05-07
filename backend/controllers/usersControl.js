const { matchedData } = require('express-validator');
const PUBLIC_URL = process.env.PUBLIC_URL;
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
                correo:req.correo
            }
        });

        if(!user){
            handleHttpErros(res, 'USER_NOT_FOUND', 404);
            return
        }

        const hashPassword = user.get('contrasenna');
        const passwordMatch = await comparePassword(req.contrasenna, hashPassword);


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

const editProfile = async (req, res) => {
    try{    
        const id_user = req.params.id;
        const contrasenna = await encryptPassword(req.body.contrasenna);
        req.body.contrasenna = contrasenna;

        const {id, ...body} = req.body;
        const data = await userModel.update(body, {where:{ id: id_user }});
        res.send(data);
    }catch(e){
        console.log(e);
        handleHttpErros(res, 'ERROR_EDIT_USER', 503);
    }
}

const editUserImagen = async (req, res) => {
    try{    
        const id_user = req.params.id;
        console.log(`id_user: ${id_user}`);
        const {id, ...body} = req.body;
        const data = await userModel.update(body, {where:{ id: id_user }});
        res.send(data);
    }catch(e){
        console.log(e);
        handleHttpErros(res, 'ERROR_EDIT_USER_IMAGE', 503);
    }
}


module.exports = {createUser, loginUser, getUsers, getUsersById, editProfile, editUserImagen};


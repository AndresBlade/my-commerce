const { check } = require('express-validator');
const validationResults = require('../utils/handleValidator')

const validatorRegisterUser = [
    check('nombre')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 20 }),
    check('correo')
    .exists()
    .notEmpty()
    .isEmail(),
    check('contrasenna')
    .exists()
    .notEmpty()
    .isLength({ min: 6, max: 20 }),
    check('tipo_id')
    .exists()
    .notEmpty()
    .isInt(),
    (req, res, next) => {
        return validationResults(req, res, next)
    }
    
]
const validatorLoginUser = [
    check('correo')
    .exists()
    .notEmpty()
    .isEmail(),
    check('contrasenna')
    .exists()
    .notEmpty()
    .isLength({ min: 6, max: 20 }),
    (req, res, next) => {
        return validationResults(req, res, next)
    }
]

module.exports = { validatorLoginUser, validatorRegisterUser };
const { check } = require('express-validator');
const validationResults = require('../utils/handleValidator')

const validatorRegisterProducto = [
    check('nombre')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 25 }),
    check('precio')
    .exists()
    .notEmpty(),
    check('categoria_id')
    .exists()
    .notEmpty(),
    check('tienda_id')
    .exists()
    .notEmpty(),
    check('descripcion')
    .exists()
    .notEmpty(),
    check('imagen')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validationResults(req, res, next)
    }
]

module.exports = {validatorRegisterProducto};
const { check } = require('express-validator');
const validationResults = require('../utils/handleValidator')

const validatorRegisterTienda = [
    check('nombre')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 20 }),
    check('RIF')
    .exists()
    .notEmpty(),
    check('imagen')
    .exists()
    .notEmpty(),
    check('descripcion')
    .exists()
    .notEmpty(),
    check('status'),
    check('cliente_id'),
    (req, res, next) => {
        return validationResults(req, res, next)
    }
];

module.exports = {validatorRegisterTienda};
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
    check('regionId')
    .exists()
    .notEmpty(),
    check('status'),
    check('usuario_id')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validationResults(req, res, next)
    }
];

module.exports = {validatorRegisterTienda};
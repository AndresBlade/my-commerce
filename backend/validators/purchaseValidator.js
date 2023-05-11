const { check } = require('express-validator');
const validationResults = require('../utils/handleValidator')

const ventas_detalles_validator = [
    check('producto_id')
    .exists()
    .notEmpty(),
    check('cantidad')
    .exists()
    .notEmpty(),
    check('precio')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validationResults(req, res, next)
    }
]

module.exports = {ventas_detalles_validator};
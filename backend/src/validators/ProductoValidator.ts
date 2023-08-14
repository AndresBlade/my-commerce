import { Request, Response, NextFunction } from 'express';
import {check} from 'express-validator';
import validationResults from '../utils/handleValidations';

const ValidatorRegisterProduct = [
    check('nombre')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 45 }),
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
    .notEmpty()
    .isLength({ min: 10, max: 256 }),
    check('cantidad')
    .exists()
    .notEmpty(),
    (req:Request, res:Response, next:NextFunction) => {
        return validationResults(req, res, next)
    }
];

export default ValidatorRegisterProduct;
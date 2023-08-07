import { Request, Response, NextFunction } from 'express';
import {check} from 'express-validator';
import validationResults from '../utils/handleValidations';

const validatorRegisterTienda = [
    check('RIF')
    .exists()
    .notEmpty()
    .isLength({ min: 9, max: 10 }),
    check('cliente_id')
    .exists()
    .notEmpty(),
    check('nombre')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 50 }),
    // check('imagen')
    // .exists()
    // .notEmpty(),
    check('descripcion')
    .exists()
    .notEmpty()
    .isLength({ min: 20, max: 256 }),
    check('region_id')
    .exists()
    .notEmpty(),
    (req:Request, res:Response, next:NextFunction) => {
        return validationResults(req, res, next)
    }
];

export default validatorRegisterTienda;
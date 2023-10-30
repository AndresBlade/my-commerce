import express from 'express';
import { Request, Response } from 'express';
import {authMiddleware} from '../middleware/session';
import checkRole from '../middleware/checkRole';
import { createLogFilePerUserAction, downloadLogFile, getAllUserLogFiles } from "../middleware/bitacoraHandlers";


const router = express.Router();

router.post('/createLog', async (req:Request, res:Response) =>{
    const {action, username, userId} = req.body; 
    await createLogFilePerUserAction(action, username, userId, req);
    res.status(200).send('LOG_CREATED');
})

router.get('/downloadUserLogFile', 
    authMiddleware,
    checkRole(['ADMINISTRADOR']),    
    downloadLogFile
)

router.get('/getAllUserLogFiles', 
            authMiddleware,
            checkRole(['ADMINISTRADOR']),
            getAllUserLogFiles)

module.exports = router;
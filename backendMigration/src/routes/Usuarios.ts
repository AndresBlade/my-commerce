import { Request, Response} from "express";
import express from 'express';
import { pingHere, defaultRoute } from "../controllers/Usuarios";

const router = express.Router();

router.get("/",
            defaultRoute);

router.get('/ping', 
            pingHere);

module.exports = router;


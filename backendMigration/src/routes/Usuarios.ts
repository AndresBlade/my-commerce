import { Request, Response} from "express";
import express from 'express';
import { registerUser } from "../controllers/Usuarios";

const router = express.Router();

router.post("/registerUser",
            registerUser);

router.get('/ping', );

module.exports = router;


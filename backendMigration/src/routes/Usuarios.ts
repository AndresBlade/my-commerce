import { Request, Response} from "express";
import express from 'express';
import { createOneUser } from "../controllers/Usuarios";

const router = express.Router();

router.get("/createOneUser",
createOneUser);

router.get('/ping', );

module.exports = router;


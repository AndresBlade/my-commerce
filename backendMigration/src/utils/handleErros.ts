import { Response } from "express";

export default function handleHttpErros(res:Response, message = 'Something went wrong', codeError = 403) {    
    res.status(codeError).json({ error: message });
}

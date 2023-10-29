import { Request } from 'express';
import path  from 'path';
import fs from 'fs';


const createLogFilePerUser = async (UserName:string, req:Request) => {
    const logFile = path.join(__dirname, `../../storage/bitacoras/${UserName}.txt`);

    // Obtén la URL y la información del usuario
    const { url, method, headers, ip } = req;
    const {correo } = req.body;
    const timestamp = new Date().toUTCString();

      // Crea un registro de comportamiento del usuario
      const logData = `New User Registered: ${UserName}\nTimestamp: ${timestamp}\nIP: ${ip}\nMethod: ${method}\nCorreo: ${correo}\nURL: ${url}\nHeaders: ${JSON.stringify(headers)}\n\n`;

      fs.writeFile(logFile, logData, (err:any) => {
        if (err) {
            console.error('Error al escribir en el archivo de registro:', err);
        }
    });


}

export {createLogFilePerUser}
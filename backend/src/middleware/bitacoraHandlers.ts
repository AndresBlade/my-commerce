import { Request, Response} from 'express';
import path  from 'path';
import fs from 'fs';


const createLogFilePerUserRegistered = async (UserName:string, req:Request) => {
    const logFile = path.join(__dirname, `../../storage/bitacoras/${UserName}.txt`);

    // Obtén la URL y la información del usuario
    const { url, method, headers, ip } = req;
    const {correo } = req.body;
    const timestamp = new Date().toUTCString();

      // Crea un registro de comportamiento del usuario
      const logData = `New User Registered: ${UserName}\nFecha: ${timestamp}\nIP: ${ip}\nMethod: ${method}\nCorreo: ${correo}\nURL: ${url}\nHeaders: ${JSON.stringify(headers)}\n\n`;

      fs.writeFile(logFile, logData, (err:any) => {
        if (err) {
            console.error('Error al escribir en el archivo de registro:', err);
        }
    });


}

const createLogFilePerUserLogued = async (Token:string, UserName:string, req:Request) => {
    const logFile = path.join(__dirname, `../../storage/bitacoras/${UserName}.txt`);

     // Obtén la URL y la información del usuario
    const { url, method, headers, ip } = req;
    const {correo } = req.body;
    const timestamp = new Date().toUTCString();

    // Crea un registro de comportamiento del usuario
    const logData = `User logued:${UserName}\nFecha: ${timestamp}\nIP: ${ip}\nMethod: ${method}\nCorreo: ${correo}\nURL: ${url}\nHeaders: ${JSON.stringify(headers)}\nTokenAccess:${Token}\n\n`;

    fs.appendFile(logFile, logData, (err:any) => {
        if (err) {
            console.error('Error al escribir en el archivo de registro:', err);
        }
    });
}

const createLogFilePerUserAction = async (Action:string, UserName:string, UserId:string, req:Request) => {
    const logFile = path.join(__dirname, `../../storage/bitacoras/${UserName}.txt`);

     // Obtén la URL y la información del usuario
    const { url, method, headers, ip } = req;
    const timestamp = new Date().toUTCString();

    // Crea un registro de comportamiento del usuario
    const logData = `\nUserId:${UserId}\nUserName:${UserName}\nUser Action:${Action}\nFecha: ${timestamp}\nIP: ${ip}\nMethod: ${method}\nURL: ${url}\nHeaders: ${JSON.stringify(headers)}\n\n`;

    fs.appendFile(logFile, logData, (err:any) => {
        if (err) {
            console.error('Error al escribir en el archivo de registro:', err);
        }
    });
}


const downloadLogFile = async (req:Request, res:Response) => {
        const {userName} = req.params;
        // Ruta del archivo 
        const logFile = path.join(__dirname, `../../storage/bitacoras/${userName}.txt`);
        // Nombre del archivo como será descargado
        const fileName = `${userName}-bitacora.txt`;
      
        // Comprueba si el archivo existe
        fs.access(logFile, fs.constants.F_OK, (err) => {
          if (err) {
            res.status(404).send('El archivo no existe.');
            return;
          }
      
          // Configuración de cabeceras para la descarga
          res.setHeader('Content-Type', 'application/octet-stream');
          res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      
          // Lectura y envío del archivo al cliente
          const fileStream = fs.createReadStream(logFile);
          fileStream.pipe(res);
        });
}


const getAllUserLogFiles = async (_req:Request, res:Response) => {
    const logFiles = path.join(__dirname, `../../storage/bitacoras/`);
    fs.readdir(logFiles, (err, files) => {
        if (err) {
          res.status(500).send('Error al encontrar los archivos de registro.');
          return;
        }
    
        // Envía la lista de archivos al cliente
        res.send(files);
      });
}
export {createLogFilePerUserRegistered, createLogFilePerUserLogued, createLogFilePerUserAction, downloadLogFile, getAllUserLogFiles}
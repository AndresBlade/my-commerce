import path  from 'path';
import multer, {diskStorage} from 'multer';
import FileFilterCallback  from 'multer';
import DestinationCallback from 'multer';
import { Response, Request } from 'express';

const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:3000';
type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void


const getStoragePath = (entity:string) => {
    switch (entity) {
      case 'userProfile':
        return path.join(__dirname, '../../storage/usersProfile');
      case 'tiendaProfile':
        return path.join(__dirname, '../../storage/tiendas/profile');
      case 'tiendaProducts':
        return path.join(__dirname, '../../storage/tiendas/products');
      default:
        return path.join(__dirname, '../../storage');
    }
};

const storage = diskStorage({
    destination: function(req:Request, file:Express.Multer.File, cb:DestinationCallback){
        const entity = req.params.direction;
        const pathStorage = getStoragePath(entity);
        console.log(pathStorage);
        cb(null, pathStorage);
    },
    filename: function(req:Request, file:Express.Multer.File, cb:FileNameCallback){
        const ext = file.originalname.split('.').pop();
        const filename = `file-${Date.now()}.${ext}`;
        let url = `${PUBLIC_URL}/${filename}`;
        if (!req.body.imagen) {
          req.body.imagen = '';
        }
        req.body.imagen += url + ' ';
        cb(null, filename);
    }
});

const uploadMiddleware = multer({ storage: storage });


export default uploadMiddleware;
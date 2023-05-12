const multer = require('multer');
const PUBLIC_URL = process.env.PUBLIC_URL;
const path = require('path');

const getStoragePath = (entity) => {
    switch (entity) {
      case 'userProfile':
        return path.join(__dirname, '../storage/usersProfile');
      case 'tiendaProfile':
        return path.join(__dirname, '../storage/tiendas/profile');
      case 'tiendaProducts':
        return path.join(__dirname, '../storage/tiendas/products');
      default:
        return path.join(__dirname, '../storage');
    }
};

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const entity = req.params.entity;
        const pathStorage = getStoragePath(entity);
        cb(null, pathStorage);
    },
    filename: function(req, file, cb){
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


module.exports = uploadMiddleware;
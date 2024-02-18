const multer = require('multer');
const fs = require('fs');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp'

};

const types = Object.values(MIME_TYPES);
const servicesPath = 'images/services/';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        let serviceNamePath = servicesPath;

        if (req.body.type === 'service' || req.body.type === 'timeline') {

            if (req.body.type === 'timeline') {
                serviceNamePath += `service${req.body.service_id}/timeline${req.body.id}/`;
            }

            if (req.body.type === 'service') {
                serviceNamePath += `service${req.body.id}/`;
            }

            if (!fs.existsSync(serviceNamePath)) {
                fs.mkdirSync(serviceNamePath, { recursive: true });
            }
        }

        cb(null, serviceNamePath)
    },
    filename: function (req, file, cb) {
        const name = file.originalname.split(' ').join('_').replace(/\.[^/.]+$/, "").toLowerCase();
        const extension = MIME_TYPES[file.mimetype];
        const isValid = types.some((type) => type === extension)
        if (isValid) cb(null, Date.now() + name + "." + extension);
    }
})

module.exports = multer({ storage }).single('image');
const express = require('express');
const pictureController = require("../controller/pictureController");
const router = express.Router();
const multer = require('multer')
const path = require('path')

let upload = multer({
    errorHandling: 'manual',
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../uploads/'))
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            return cb(new Error('Invalid mime type'));
        }
    }
})

router.post('/createPictures/:postId', upload.array('pictures'), pictureController.createPictures);
router.get('/', pictureController.getAllPictures);
router.get('/:id', pictureController.getPicture);
router.put('/:id', pictureController.updatePicture);
router.delete('/:id', pictureController.deletePicture);


module.exports = router;
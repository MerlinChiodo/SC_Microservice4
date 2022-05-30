const express = require('express');
const pictureController = require("../controller/pictureController");
const router = express.Router();


router.post('/', pictureController.createPicture);
router.get('/', pictureController.getAllPictures);
router.get('/:id', pictureController.getPicture);
router.put('/:id', pictureController.updatePicture);
router.delete('/:id', pictureController.deletePicture);


module.exports = router;
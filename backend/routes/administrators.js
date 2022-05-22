const express = require('express');
const administratorController = require("../controller/administratorController");
const router = express.Router();


router.post('/', administratorController.createAdministrator);
router.get('/', administratorController.getAllAdministrators);
router.get('/:id', administratorController.getAdministrator);
router.put('/:id', administratorController.updateAdministrator);
router.delete('/:id', administratorController.deleteAdministrator);


module.exports = router;
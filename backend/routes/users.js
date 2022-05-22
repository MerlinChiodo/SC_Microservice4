var express = require('express');
const userController = require("../controller/userController");
var router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUsers);
router.put('/:id', postController.updateUser);
router.delete('/:id', postController.deleteUser);


module.exports = router;

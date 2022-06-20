const express = require('express');
const usersController = require("../controller/usersController");
const postController = require("../controller/postController");
const router = express.Router();

router.post('/', usersController.createUser);
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);
router.get('/getAllOwnPosts/:id', usersController.getAllOwnPosts);
router.get('/getAllSavedPosts/:id', usersController.getAllSavedPosts);
router.put('/savePost/:userId/:postId', usersController.savePost);
router.put('/unsavePost/:userId/:postId', usersController.unsavePost);


module.exports = router;

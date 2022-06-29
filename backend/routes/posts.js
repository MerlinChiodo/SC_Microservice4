const express = require('express');
const router = express.Router();
const postController = require('../controller/postController.js')


router.post('/', postController.createPost);
router.get('/getAllServicePosts', postController.getAllServicePosts);
router.get('/getAllUserPosts', postController.getAllUserPosts);
router.get('/:id', postController.getPost);
router.get('/postOverview/:id', postController.getPostOverview);
router.put('/updatePost', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.put('/makePostPrivate/:id', postController.makePostPrivate);
router.put('/makePostPublic/:id', postController.makePostPublic);
router.put('/addPictureToPost/:id', postController.addPictureToPost);
router.put('/removePictureFromPost/:id', postController.removePictureFromPost);




module.exports = router;
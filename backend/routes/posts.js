const express = require('express');
const router = express.Router();
const postController = require('../controller/postController.js')

/* GET home page. */

router.post('/', postController.createPost);
router.get('/:id', postController.getPost) ;
router.get('/postOverview/:id', postController.getPostOverview);




module.exports = router;
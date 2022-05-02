const express = require('express');
const router = express.Router();
const postController = require('../controller/postController.js')

/* GET home page. */
router.get('/postOverview/:id', postController.getPostOverview);




router.get('/:id', postController.getPost) ;

module.exports = router;
const express = require('express');
const router = express.Router();
const landingPageController = require('../controller/landingPageController.js');


router.post('/sendAboutUs', landingPageController.updateAboutUs);

module.exports = router;
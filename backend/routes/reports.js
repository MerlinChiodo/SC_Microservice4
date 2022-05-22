const express = require('express');
const reportsController = require("../controller/reportsController");
const router = express.Router();


router.post('/', reportsController.createReport);
router.get('/', reportsController.getAllReports);
router.get('/:id', reportsController.getReport);
router.put('/:id', reportsController.updateReport);
router.delete('/:id', reportsController.deleteReport);



module.exports = router;
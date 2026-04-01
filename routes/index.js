const express = require('express');
const router = express.Router();
const establishmentController = require('../controllers/establishmentController');

router.get('/', establishmentController.index);

module.exports = router;

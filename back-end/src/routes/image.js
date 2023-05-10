const express = require('express');
const { imagesController } = require('../controllers');

const router = express.Router();

router.get('/:img', imagesController.sendImages);

module.exports = router; 

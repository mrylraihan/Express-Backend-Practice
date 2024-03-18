const express = require('express')
const router = express.Router()

const { isLive, getData, findById } = require('../controllers/postController');

router.get('/', isLive);

router.get('/:id', findById);

router.get('/getData', getData);

module.exports = router

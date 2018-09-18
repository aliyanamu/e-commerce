const express = require('express'),
    router = express.Router(),
    { list, insert, update, remove, findById } = require('../controllers/categories');

/* GET users listing. */
router
    .get('/', list)
    
    .get('/:id', findById)

    .post('/', insert)

    .put('/:id', update)

    .delete('/:id', remove)

module.exports = router;

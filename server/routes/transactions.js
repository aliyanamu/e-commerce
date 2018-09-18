const express = require('express'),
    router = express.Router(),
    { isLogin, authdulu } = require("../middlewares/auth"),
    { list, insert, remove, update, getMyCart } = require('../controllers/transactions');

/* GET transactions listing. */
router
    .get('/', list)

    .post('/', isLogin, authdulu, insert)
    
    .get('/cart', isLogin, authdulu, getMyCart)

    .put('/:id', update)

    .delete('/:id', remove)

module.exports = router;

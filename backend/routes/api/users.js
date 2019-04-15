//Module Imports
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


// - ROUTE = GET api/users/test
// - Test route for Users resource
// - PUBLIC-ACCESS
router.get('/test', (req, res) => {
    res.json({
        msg: "Successful User-Route connection"
    })
});

module.exports = router;
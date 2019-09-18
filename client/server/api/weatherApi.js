const express = require('express');
const router = express.Router();
const axios = require('axios');


// Get titles from request body and query API for each title's details

router.get('/',
    async (req, res) => {
        try {
            const response = await axios.get('');
            console.log(response);
            res.json(response);
        }
        catch (err) { throw err; }
    });

/**
 * Convert a sentence to title case.
 * @param {string} sentence - The sentence to convert.
 * @return The sentence in the desired case.
 */


module.exports = router;
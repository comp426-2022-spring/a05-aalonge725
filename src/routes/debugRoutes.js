const express = require('express')
const router = express.Router()
const db = require('../services/database.js')

router.get('/app/log/access', (req, res) => {
    const stmt = db.prepare('SELECT * FROM accesslog').all()
    res.status(200).json(stmt)
})
router.get('/app/error', (req, res) => {
    throw new Error("Error test successful.")
})

module.exports = router
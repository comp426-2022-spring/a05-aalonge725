const express = require('express')
const router = express.Router()
const coin = require('../utils/utilities.js')

router.get('/app/', (req, res) => {
    res.json({'message':'Your API works! (200)'})
    res.status(200)
})

router.get('/app/flip/', (req, res) => {
    var flip = coin.coinFlip()
    res.status(200).json({'flip': flip})
})

router.post('/app/flip/coins/', (req, res, next) => {
    const flipResult = coin.coinFlips(req.body.number)
    const summary = coin.countFlips(flipResult)
    res.status(200).json({"raw":flipResult,"summary":summary})
})

router.get('/app/flips/:number', (req, res) => {
    var flipResult = coin.coinFlips(req.params.number)
    var summary = coin.countFlips(flipResult)
    res.status(200).json({'raw': flipResult, 'summary': summary})
})

router.post('/app/flip/call/', (req, res, next) => {
    const guess = coin.flipACoin(req.body.guess)
    res.status(200).json(guess)
})

router.get('/app/flip/call/heads', (req, res) => {
    res.status(200).json(coin.flipACoin('heads'))
})

router.get('/app/flip/call/tails', (req, res) => {
    res.status(200).json(coin.flipACoin('tails'))
})

router.use(function (req, res) {
    res.status(404).send('404 NOT FOUND')
})

module.exports = router
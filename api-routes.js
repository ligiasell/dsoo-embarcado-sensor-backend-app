let router = require('express').Router()
const db = require('./queries')

router.get('/', function(req, res) {
  res.json({
    status: 'API is working',
    message: 'Embarcadooos!',
  })
})

//RECORDS @get
router.get('/records', function(req, res) {
  db.getRecords(req, res)
})

//RECORDS @post
router.post('/records', function(req, res) {
  console.log(req)
  db.setRecord(req, res)
})

module.exports = router

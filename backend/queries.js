const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dsoo-embarcado-sensor-backend-app',
  password: 'postgres',
  port: 5432,
})

const setRecord = (req, res) => {
  console.log(req.body)
  const { record } = req.body

  pool.query('INSERT INTO records (record) VALUES ($1) RETURNING id, record', [record], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Record added: id - ${results.rows[0].id} / record - ${results.rows[0].record}`)
  })
}

const getRecords = (req, res) => {
  pool.query('SELECT records.record FROM records', (error, results) => {
    if (error) {
      throw error
    }
    console.log(res)
    res.status(200).json(results.rows)
  })
}

module.exports = {
  getRecords,
  setRecord,
}

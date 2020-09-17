require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

const generateContract = require('./contract/generateContract')
const contractData = require('./contractData')

app.use(express.static(__dirname + '/public'))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  res.send('OK')
})

app.post('/docx', async (req, res) => {
  try {
    let filePath = `docs/contract-${+new Date()}.docx`
    const contractData = { ...req.body }

    let filename = await generateContract(contractData)
    res.download(path.join(__dirname, filename), function (err) {
      console.log(err)
    })
  } catch (err) {
    console.log(err)
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`LISTENING TO PORT ${PORT}`)
})

const express = require('express')
const exphbs = require('express-handlebars')
const expvalid = require('express-validator')
const mongoose = require('mongoose')

const ShortURL = require('./models/shorturl')
const getShortUrl = require('./getShort')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/shorten-url'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => console.log('mongodb error'))
db.once('open', () => console.log('mongodb connected!'))

const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// 這行可以取代body-parser
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', async (req, res) => {
  try {
    const { longUrl } = req.body
    const urlCount = await ShortURL.countDocuments()
    const transURL = {
      longURL: longUrl,
      shortURL: getShortUrl(urlCount)
    }
    await ShortURL.create(transURL)
    res.render('index')
  } catch (err) {
    console.log(err)
  }
})

app.listen(PORT, () => console.log(`Express is listening on http://localhost:${PORT}`))

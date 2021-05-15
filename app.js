const express = require('express')
const exphbs = require('express-handlebars')
const { body, validationResult } = require('express-validator')
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
app.use(express.static('public'))
// 這行可以取代body-parser
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

// 輸入的東西會進來這裡，所以先做個驗證
app.post('/'
  , body('longUrl').isURL().withMessage('網址無效，請輸入有效的網址')
  , async (req, res) => {
    const errors = validationResult(req)
    // 輸入的不是網址會進來這裡
    if (!errors.isEmpty()) {
      const [{ msg }] = errors.errors
      return res.status(422).render('index', { errorMsg: msg })
    }
    try {
      let transURL
      const { longUrl } = req.body
      const isExist = await ShortURL.exists({ longURL: longUrl })
      // 檢查網址有沒有在資料庫內，有就直接回傳資料庫內的短網址
      if (!isExist) {
        const urlCount = await ShortURL.countDocuments()
        transURL = {
          longURL: longUrl,
          shortURL: getShortUrl(urlCount)
        }
        await ShortURL.create(transURL)
      } else {
        transURL = await ShortURL.findOne({ longURL: longUrl }).lean()
      }
      const hostname = process.env.PORT ? req.hostname : 'localhost:3000'
      const shortenUrl = `${req.protocol}://${hostname}/${transURL.shortURL}`
      res.render('index', { shortenUrl })
    } catch (err) {
      console.log(err)
    }
  })

app.get('/:short', async (req, res) => {
  try {
    const { short } = req.params
    const transURL = await ShortURL.findOne({ shortURL: short }).lean()
    res.redirect(transURL.longURL)
  } catch (err) {
    console.log(err)
    return res.redirect('/')
  }
})

app.listen(PORT, () => console.log(`Express is listening on http://localhost:${PORT}`))

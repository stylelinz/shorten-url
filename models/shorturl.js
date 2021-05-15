const mongoose = require('mongoose')

const { Schema } = mongoose

const urlSchema = new Schema({
  longURL: { type: String, required: true },
  shortURL: { type: String, required: true }
})

module.exports = mongoose.model('ShortUrls', urlSchema)

'use strict'

const moment = require('moment')

exports = module.exports = function (app, mongoose) {
  const schema = new mongoose.Schema({
    description: {
      type: String,
      required: true
    },
    type: String,
    date: {
      type: Date,
      default: new Date()
    },
    amount: Number
  })

  schema.statics.getAll = function (callback) {
    const Expenditure = this
    Expenditure.find().exec((err, expenditures) => callback(err, expenditures))
  }

  schema.statics.getByPeriod = async function (startDate, endDate, cb) {
    const Expenditure = this
    const result = await Expenditure.find({ date: {$gt: startDate, $lt: endDate} })
    return cb(null, result)
  }

  app.db.model('Expenditure', schema)
}

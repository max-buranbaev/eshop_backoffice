const moment = require('moment')
const axios = require('axios')
const StatGenerator = require('./StatGenerator')

exports.getAll = async (req, res, next) => {
  console.log(req.body)
  if (!req.body.item) {
    const err = new Error('Check inputted dates')
    err.name = 'WrongInputtedDate'
    return next(err)
  }

  const Selling = req.app.db.models.Selling
  const dateStart = moment(req.body.item.dateStart, 'DD.MM.YYYY')
  const dateEnd = moment(req.body.item.dateEnd, 'DD.MM.YYYY')
  const yaMetrikApi = `https://api-metrika.yandex.ru/stat/v1/data.json?id=32372795&date1=${dateStart.format('YYYY-MM-DD')}&date2=${dateEnd.format('YYYY-MM-DD')}&metrics=ym:s:users&dimensions=ym:s:<attribution>TrafficSource&oauth_token=AQAAAAAT0xGsAAPpjNcTKg7nkUIJi7UFsCNRKcw`

  const callback = function (err, data) {
    if (err) return next(err)

    axios.get(yaMetrikApi).then(async(response) => {
      const Stat = new StatGenerator(data, response.data, req.app)
      let result = {
        query: {
          dateStart: dateStart,
          dateEnd: dateEnd
        },
        stat: await Stat.getFullStat(dateStart.format('X'), dateEnd.format('X'))
      }

      res.send(result)
    })
  }
  Selling.getByPeriod(dateStart.format(), dateEnd.format(), callback)
}

exports.getWeekly = (req, res, next) => {
  const Selling = req.app.db.models.Selling
  const dateStart = moment('01.09.2016', 'DD.MM.YYYY')
  const dateEnd = moment()
  const yaMetrikApi = `https://api-metrika.yandex.ru/stat/v1/data.json?id=32372795&date1=${dateStart.format('YYYY-MM-DD')}&date2=${dateEnd.format('YYYY-MM-DD')}&metrics=ym:s:users&dimensions=ym:s:<attribution>TrafficSource&oauth_token=AQAAAAAT0xGsAAPpjNcTKg7nkUIJi7UFsCNRKcw`

  const callback = (err, data) => {
    if (err) next(err)

    axios.get(yaMetrikApi).then(response => {
      const Stat = new StatGenerator(data, response.data, req.app)
      res.send(Stat.getWeekly())
    })
  }

  Selling.getByPeriod(dateStart.format(), dateEnd.format(), callback)
}

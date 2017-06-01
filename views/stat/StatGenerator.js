'use strict'

const moment = require('moment')

module.exports = class StatGenerator {
  constructor (data, metrik, app) {
    this.data = data
    this.metrik = metrik
    let cashFlow = null
    let sumOfMarginPercents = null
    let goodsCost = null

    this.data.map(selling => {
      cashFlow += selling.good.price
      sumOfMarginPercents = 100 * (selling.good.price / selling.good.purchasePrice)
      goodsCost += selling.good.purchasePrice
    })

    this.app = app
    this.sumOfSales = this.data.length
    this.averageCheck = Math.round((cashFlow / this.data.length) * 100) / 100
    this.averageMarginPercent = Math.round((sumOfMarginPercents / this.data.length) * 100) / 100
    this.profit = cashFlow - goodsCost
    this.cashFlow = cashFlow

    // binders
    this.getProfit = this.getProfit.bind(this)
    this.getGoodsExpenditures = this.getGoodsExpenditures.bind(this)
    this.getSumOfSales = this.getSumOfSales.bind(this)
    this.getCashFlow = this.getCashFlow.bind(this)
    this.getAverageMarginPercent = this.getAverageMarginPercent.bind(this)
    this.getProfit = this.getProfit.bind(this)
    this.getAverageCheck = this.getAverageCheck.bind(this)
    this.getConversion = this.getConversion.bind(this)
    this.getFullStat = this.getFullStat.bind(this)
    this.getWeekly = this.getWeekly.bind(this)
    this.getNonGoodExpenditures = this.getNonGoodExpenditures.bind(this)
  }

  getWeekly () {
    let result = {
      averageCheck: [],
      averageMarginPercent: [],
      conversion: [],
      profit: [],
      cashFlow: [],
      sumOfSales: []
    }

    const dateStart = moment('01.09.2016', 'DD.MM.YYYY')
    const dateEnd = moment()
    let cursor = dateStart.add(1, 'weeks')
    let prevCursor = dateStart
    while (dateEnd.format('X') >= cursor.format('X')) {
      let newBatch = this.getFullStat(prevCursor.format('X'), cursor.format('X'))
      result.averageCheck.push(newBatch.averageCheck)
      result.averageMarginPercent.push(newBatch.averageMarginPercent)
      result.conversion.push(newBatch.conversion)
      result.profit.push(newBatch.profit)
      result.cashFlow.push(newBatch.cashFlow)
      result.sumOfSales.push(newBatch.sumOfSales)
      prevCursor = moment(cursor.format())
      cursor.add(1, 'week')
    }
    return result
  }

  async getFullStat (dateStart, dateEnd) {
    return {
      averageCheck: this.getAverageCheck(dateStart, dateEnd),
      averageMarginPercent: this.getAverageMarginPercent(dateStart, dateEnd),
      conversion: this.getConversion(dateStart, dateEnd),
      profit: this.getProfit(dateStart, dateEnd),
      cashFlow: this.getCashFlow(dateStart, dateEnd),
      sumOfSales: this.getSumOfSales(dateStart, dateEnd),
      goodsExpenditures: this.getGoodsExpenditures(dateStart, dateEnd),
      otherExpenditures: await this.getNonGoodExpenditures(dateStart, dateEnd)
    }
  }

  getSumOfSales (dateStart, dateEnd) {
    let sum = 0
    this.data.map(selling => {
      if (moment(selling.date).format('X') >= dateStart && moment(selling.date).format('X') <= dateEnd) {
        sum++
      }
    })
    return {
      name: `${moment(dateStart, 'X').format('DD.MM')}-${moment(dateEnd, 'X').format('DD.MM')}`,
      y: sum
    }
  }

  getCashFlow (dateStart, dateEnd) {
    let cashFlow = 0
    this.data.map(selling => {
      if (moment(selling.date).format('X') >= dateStart && moment(selling.date).format('X') <= dateEnd) {
        cashFlow += selling.good.price
      }
    })
    return {
      name: `${moment(dateStart, 'X').format('DD.MM')}-${moment(dateEnd, 'X').format('DD.MM')}`,
      y: cashFlow
    }
  }

  getAverageMarginPercent (dateStart, dateEnd) {
    let sumOfMarginPercents = 0
    let counter = 0

    this.data.map(selling => {
      if (moment(selling.date).format('X') >= dateStart && moment(selling.date).format('X') <= dateEnd) {
        sumOfMarginPercents += 100 * (selling.good.price / selling.good.purchasePrice)
        counter++
      }
    })

    let averageMarginPercent = Math.round((sumOfMarginPercents / this.data.length))
    return {
      name: `${moment(dateStart, 'X').format('DD.MM')}-${moment(dateEnd, 'X').format('DD.MM')}`,
      y: averageMarginPercent
    }
  }

  async getNonGoodExpenditures (dateStart, dateEnd) {
    const expendituresModel = this.app.db.models.Expenditure
    const result = await expendituresModel.find({ date: {$gt: moment(dateStart, 'X').format(), $lt: moment(dateEnd, 'X').format()} })
    return result.reduce((acc, el) => acc + el.amount, 0)
  }

  getConversion (dateStart, dateEnd) {
    let sumOfVisitors = null
    this.metrik.data.map(el => {
      if (el.dimensions[0]['id'] === 'organic' || el.dimensions[0]['id'] === 'ad') {
        sumOfVisitors += el.metrics[0]
      }
    })

    return {
      name: `${moment(dateStart, 'X').format('DD.MM')}-${moment(dateEnd, 'X').format('DD.MM')}`,
      y: (this.getSumOfSales(dateStart, dateEnd).y / sumOfVisitors) * 100
    }
  }

  getGoodsExpenditures (dateStart, dateEnd) {
    let goodsExpenditures = 0
    this.data.map(selling => {
      if (moment(selling.date).format('X') >= dateStart && moment(selling.date).format('X') <= dateEnd) {
        goodsExpenditures += selling.good.purchasePrice
      }
    })

    return {
      name: `${moment(dateStart, 'X').format('DD.MM')}-${moment(dateEnd, 'X').format('DD.MM')}`,
      y: goodsExpenditures
    }
  }

  getProfit (dateStart, dateEnd) {
    let result = this.getCashFlow(dateStart, dateEnd).y - this.getGoodsExpenditures(dateStart, dateEnd).y
    return {
      name: `${moment(dateStart, 'X').format('DD.MM')}-${moment(dateEnd, 'X').format('DD.MM')}`,
      y: result
    }
  }

  getAverageCheck (dateStart, dateEnd) {
    let averageCheck = Math.round((this.getCashFlow(dateStart, dateEnd).y / this.getSumOfSales(dateStart, dateEnd).y) * 100) / 100
    return {
      name: `${moment(dateStart, 'X').format('DD.MM')}-${moment(dateEnd, 'X').format('DD.MM')}`,
      y: averageCheck
    }
  }
}

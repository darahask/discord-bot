const axios = require('axios').default
const cheerio = require('cheerio').default

module.exports = async (url) => {

    const updateDate = '#highlight-block > div.information_block > div.updated-date > span'
    const totalCases = '#dashboard > div.iblock.t_case > div > span'
    const newCases = '#dashboard > div.iblock.t_case > div > div.increase_block > div'
    const discharged = '#dashboard > div.iblock.discharge > div > span'
    const newDischarged = '#dashboard > div.iblock.discharge > div > div.increase_block > div'
    const deaths = '#dashboard > div.iblock.death_case > div > span'
    const newDeaths = '#dashboard > div.iblock.death_case > div > div.increase_block > div'

    let res = await axios.get(url)
    const $ = cheerio.load(res.data);

    let date = $(updateDate).text().trim()
    let total = $(totalCases).text().trim()
    let newtotal = $(newCases).text().trim()
    let dis = $(discharged).text().trim()
    let newdis = $(newDischarged).text().trim()
    let death = $(deaths).text().trim()
    let newdeath = $(newDeaths).text().trim()

    console.log(date)

    return {
        date,
        total,
        newtotal,
        dis,
        newdis,
        death,
        newdeath
    }
}
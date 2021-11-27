const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

//assuming Week 12
const url = 'https://fantasy.nfl.com/research/projections?position=O&sort=projectedPts&statCategory=projectedStats&statSeason=2021&statType=weekProjectedStats&statWeek=12'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const projections = []

        $('.playerNameAndInfo'),html).each(function(){
            const name = $(this).find('.playerName').text()
            const points = $(this).find('.playerWeekProjectedPts').text()
            projections.push({
                name,
                points

            })
        })
        
    })


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

//url bank
//https://fantasy.nfl.com/research/projections?position=1&statCategory=projectedStats&statSeason=2021&statType=weekProjectedStats&statWeek=12
//position mapping
// 1 QB
// 2 RB
// 3 WR
// 4 TE
// 5 WR + RB?
// 6 ???
// 7 K
// 8 DEF
// O All Offense (letter O) 
//
// Further pages:
//https://fantasy.nfl.com/research/projections?offset=26&position=O&sort=projectedPts&statCategory=projectedStats&statSeason=2021&statType=weekProjectedStats&statWeek=12
//
//QBs = https://fantasy.nfl.com/research/projections?offset=26&position=1&sort=projectedPts&statCategory=projectedStats&statSeason=2021&statType=weekProjectedStats&statWeek=12
//"offset=x"
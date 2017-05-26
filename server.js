const express = require('express')
const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname + 'views')))
app.set('view engine', 'ejs')

let allMovies = []
let movie

const URL = 'http://www.imdb.com/movies-coming-soon/?ref_=inth_cs'

app.get('/scrape', function(req, res) {

  request( URL, function(error, response, html) {
    if (!error) {
      const $ = cheerio.load(html)
      
      $('tr').each(function(index, element) {

        let h4 = $(element).find('h4[itemprop=name] > a')
        const h4Text = $(h4).text().trim()

        const title = h4Text.substring( 0, h4Text.indexOf( '(' ) - 1 )
        const releaseDate = h4Text.substring( h4Text.indexOf( '(' ) + 1, h4Text.indexOf( ')' ) )

        let a = $(element).find('div.txt-block span[itemprop=director] a')
        const aText =$(a).text()
        const director = aText



        let div = $(element).find('div.outline')

        const divText = $(div).text().trim()
        const synopsis = divText

        let img = $(element).find('div.image img')
        const imgPic = $(img).attr('src')
        const moviePoster = imgPic

        movie = {title, releaseDate, director, synopsis, moviePoster}

        if(director.length > 0){
          allMovies.push(movie)
          return allMovies
        }
      })
      fs.writeFile('output.json', JSON.stringify(allMovies, null, 4))
    }
    res.render('index', {allMovies})
  })
})
app.listen('8081')
exports = module.exports = app

const express = require('express')
const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const app = express()

const URL = 'http://www.imdb.com/movies-coming-soon/?ref_=inth_cs'

app.get('/scrape', function(req, res) {

  request( URL, function(error, response, html) {
    if (!error) {
      const $ = cheerio.load(html)
      const allMovies = []

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

        let movie = {title, releaseDate, director, synopsis, moviePoster}

        if(director.length > 0){
          allMovies.push(movie)
        }
      })
      fs.writeFile('output.json', JSON.stringify(allMovies, null, 4))
    }
    res.send('File successfully written! - check your project directory for the output.json file')
  })
})
app.listen('8081')
exports = module.exports = app

const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

const URL = 'http://www.imdb.com/movies-coming-soon/?ref_=inth_cs'
const TITLE = '.list.detail .list_item.odd'
const RELEASE_DATE = '.overview-top > h4[itemprop="name"] a'



app.get('/scrape', function(req, res) {

  request( URL, function(error, response, html) {
    if (!error) {
      const $ = cheerio.load(html);
      const allMovies = []

      // $( 'h4' ).each(function(index, element) {
      //   const title = $(this).text().trim()
      //   const parseTitle = title.substring( 0, title.indexOf( '(' ) - 1 )
      //
      //   const releaseDate = $(this).text().trim()
      //   const parseReleaseDate = releaseDate.substring( releaseDate.indexOf( '(' ) + 1, releaseDate.indexOf( ')' ) )
      //   let movie = {title: parseTitle, releaseDate: parseReleaseDate}
      //
      //   allMovies.push(movie)
      //
      // })

      $('tr').each(function(index, element) {

          let h4 = $(element).find('h4[itemprop=name] > a')
          const h4Text = $(h4).text().trim()

          const title = h4Text.substring( 0, h4Text.indexOf( '(' ) - 1 )
          const releaseDate = h4Text.substring( h4Text.indexOf( '(' ) + 1, h4Text.indexOf( ')' ) )

          let director = $(element).find('div.txt-block a')
          console.log('director::', director);

          let movie = {title, releaseDate}

          allMovies.push(movie)
      })

      let ratingsArr = []

      console.log('allMovies::', allMovies)
      //
      // $('.subtext > meta').each(function() {
      //   json.rating = $(this).attr('content');
      // })
      //
      // $('.poster').filter(function() {
      //   json.moviePoster = $(this).find('img').attr('src');
      // })


    fs.writeFile('output.json', JSON.stringify(allMovies, null, 4), function(err) {
      console.log('File successfully written! - check your project directory for the output.json file')
    })
}
  res.send('Check your console!')

  });

})


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;

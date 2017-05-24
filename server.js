const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

const URL = 'http://www.imdb.com/title/tt5052448/?ref_=fn_al_tt_1'
const TITLE = '.title_wrapper > h1[itemprop="name"]'
const RELEASE_DATE = '.title_wrapper > h1[itemprop="name"] a'


app.get('/scrape', function(req, res) {

  request( URL, function(error, response, html) {
    if (!error) {
      const $ = cheerio.load(html);
      const json = {}

      $( TITLE ).each(function() {
        const title = $(this).text().trim()

        json.title = title.substring( 0, title.indexOf( '(' ) - 1 )
      })

      $( RELEASE_DATE ).filter(function() {
        json.releaseDate = $(this).text();
      })

      $('.subtext > meta').each(function() {
        json.rating = $(this).attr('content');
      })

      $('.poster').filter(function() {
        json.moviePoster = $(this).find('img').attr('src');
      })


    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
    console.log('File successfully written! - check your project directory for the output.json file')
  })
}
  res.send('Check your console!')

  });

})


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
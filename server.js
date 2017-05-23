var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();


app.get('/scrape', function(req, res) {

  let url = 'http://www.imdb.com/title/tt5052448/?ref_=fn_al_tt_1'

  request(url, function(error, response, html) {
    if (!error){
      var $ = cherrio.load(html);
      var title, releaseDate, rating, moviePoster;
      var json = {title: "", releaseDate: "", rating: "", moviePoster: ""};

      $('.title_wrapper').filter(function() {
        var data = $(this);
        title = data.children().first().text();
        releaseDate = data.children().last().text();
        json.title = title;
        json.releaseDate = releaseDate;
      })

      $('.subtext').filter(function() {
        var data = $(this);
        rating = data.children().first().text();
        json.rating = rating;
      })
      $('.poster').filter(function() {
        var data = $(this);
        moviePoster = data.find('img').attr('src');
        json.moviePoster = moviePoster;
      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
    console.log('File successfully written! - check your project directory for the output.json file')
  })

  res.send('Check your console!')
  
  });

})


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
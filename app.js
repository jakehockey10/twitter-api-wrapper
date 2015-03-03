var express = require('express');
var app = express();
var qs = require('qs');
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    res.send("Twitter API Wrapper!");
});

app.get('/favorites/list', function(req, res) {
    client.get('favorites/list', function(error, tweets, response){
        if (error) { console.log("error: " + error); }
        console.log(tweets);
        console.log(response);
        res.send(tweets);
        res.send(response);
    });
});

//app.get('/search/:yelp_params', function(req, res) {
//
//    console.log(qs.parse(req.params.yelp_params));
//    // See http://www.yelp.com/developers/documentation/v2/search_api
//    yelp.search(qs.parse(req.params.yelp_params), function(error, data) {
//        res.send(data);
//    });
//});

//app.get('/business/:yelp_params', function(req, res) {
//    // See http://www.yelp.com/developers/documentation/v2/business
//    yelp.business(req.params.yelp_params, function(error, data) {
//        res.send(data);
//    });
//});

app.set('port', (process.env.PORT || 3000));

var server = app.listen(process.env.PORT || app.get('port'), function() {

    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port)
});
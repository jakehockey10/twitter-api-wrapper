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
        var response_obj = {
            error: error,
            tweets: tweets,
            response: response
        };

        res.send(response_obj);
    });
});

app.get('/friends/list', function(req, res) {
    client.get('friends/list', function(error, friends, response) {
        var response_obj = {
            error: error,
            friends: friends,
            response: response
        };

        res.send(response_obj);
    })
});

app.get('/followers/list', function(req, res) {
    client.get('followers/list', function(error, friends, response) {
        var response_obj = {
            error: error,
            friends: friends,
            response: response
        };

        res.send(response_obj);
    })
});

app.get('/search/tweets/:q', function (req, res) {
    var query = qs.parse(req.params.q);
    console.log('----------------------');
    console.log(query);
    client.get('search/tweets', query, function(error, tweets, response) {
        var response_obj = {
            error: error,
            tweets: tweets,
            response: response
        };

        res.send(response_obj);
    })
});

app.set('port', (process.env.PORT || 3000));

var server = app.listen(process.env.PORT || app.get('port'), function() {

    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port)
});
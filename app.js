var express = require('express');
var app = express();
var qs = require('qs');

var twitterAuth = require('twitter-oauth')({
    consumerKey: "ENTER CONSUMER KEY HERE", /* per appication - create a comsumer key here: https://dev.twitter.com/apps */
    domain: 'YOUR DOMAIN HERE',
    consumerSecret: "ENTER CONSUMER SECRET FROM TWITTER HERE", /* create a comsumer key here: https://dev.twitter.com/apps */
    loginCallback: "http://yourdomain.com/twitter/sessions/callback",  /* internal */
    completeCallback:  "http://yourdomain.com/search/beagles"  /* When oauth has finished - where should we take the user too */
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    res.send("Twitter API Wrapper!")
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
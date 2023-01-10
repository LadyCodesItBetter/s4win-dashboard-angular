const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
/*
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.configure(function () {
    app.use(allowCrossDomain);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    //app.use(app.router);
  });
*/



/*
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'https://mylime-colnago-ds-staging.herokuapp.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
*/
app.use(cors());

app.use(express.static(__dirname + '/mylime-colnago-dashboard'));

app.get('/*', function(req,res) {
 
res.sendFile(path.join(__dirname+'/mylime-colnago-dashboard/index.html'));
});

app.listen(process.env.PORT || 8080);

// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
var date_string = '';
app.get("/api/timestamp/:date_string?", function (req, res) {
  console.log("test Date:" + req.params.date_string);
  
  if( req.params.date_string.isEmpty())
  res.json( { unix:new Date(req.params.date_string).getTime(),
              utc:new Date(req.params.date_string).toUTCString().toString()
            } );
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
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

app.get("/api/timestamp/:date_string?", function (req, res) {
    
  if( req.params.date_string !== undefined){
        var utcSecond = Number(req.params.date_string);
        if( !isNaN(utcSecond) ){   
          
          var date = new Date(0); //  0 there is to set the date to the epoch
          date.setUTCSeconds(utcSecond);
          res.json( 
            { unix: utcSecond,
              utc:new Date(date).toUTCString().toString()
            });
        }else{
          let date = new Date(req.params.date_string).getTime();
          if( isNaN(date)){
            res.json({"error":"Invalid Date"});
          }else{
          res.json( { unix:new Date(req.params.date_string).getTime(),
                      utc:new Date(req.params.date_string).toUTCString().toString()
                    } 
                  );
          }
        }
  }else {
      res.json( { unix:new Date().getTime(),
                  utc:new Date().toUTCString().toString()
                } 
               );
      
                
  }
  
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

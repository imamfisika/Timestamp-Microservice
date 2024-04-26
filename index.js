// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api", function (req, res) {
  res.json({
    unix : new Date().getTime(),
    utc : new Date().toUTCString()
  })
})

app.get("/api/:time", function(req, res){

  let input = req.params.time
  let tgl = new Date(input)

  if (!input) {
    res.json({
      unix : new Date().getTime(),
      utc : new Date().toUTCString()
    })
  }

  

  if (tgl.toUTCString() == "Invalid Date"){ 

    tgl = new Date(Math.floor(input));

    if (tgl.toUTCString() == "Invalid Date"){
      res.json({
        error: "Invalid Date"
      })
    }

    else {
      res.json({
        unix : Math.floor(req.params.time),
        utc : new Date(Math.floor(req.params.time)).toUTCString()
      })
    }

   
  }
  else {  
      res.json({
        unix : Math.floor(new Date(req.params.time).getTime()),
        utc : new Date(req.params.time).toUTCString()
      })
  
  }
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

var express = require('express')
, app = express()
, server = require('http').createServer(app);
 
// Use www as the "root" directory for all requests.
// if no path is given, it will look for index.html in that directoy.
app.use(express.static('www'));

// Start the server listening on a port
server.listen(3000, function(){
	console.log ("server listening on port " + 3000);
});


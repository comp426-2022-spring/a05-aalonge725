// Require minimist module
const args = require('minimist')(process.argv.slice(2))
// See what is stored in the object produced by minimist
console.log(args)
// Store help text 
const help = (`
server.js [options]

--port	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535.

--debug	If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.

--log		If set to false, no log files are written. Defaults to true.
            Logs are always written to database.

--help	Return this message and exit.
`)
// If --help or -h, echo help text and exit
if (args.help || args.h) {
    console.log(help)
    process.exit(0)
}

// Define app using express
const express = require('express')
const app = express()

// Require fs, morgan, and coin flip module
const fs = require('fs')
const morgan = require('morgan')
const coin = require('./src/utils/utilities.js') /* ************************* */

// Start server
const port = args.port || process.env.PORT || 5555
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
});

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const routes = require('./src/routes/debugRoutes.js')

// Log middleware
const middleware = require('./src/middleware/mymiddleware.js')
app.use(middleware.log)

// Log command line argument
if (args.log != "false" && args.log != false) {
    const writeStream = fs.createWriteStream('./data/log/access.log', {flags: 'a'})
    app.use(morgan('combined', {stream: writeStream}))
}

// Debug command line argument
if (args.debug == true) {
    app.use(require('./src/routes/debugRoutes.js'))
}

// Access to coin flip endpoints
app.use(require('./src/routes/gameRoutes.js'))
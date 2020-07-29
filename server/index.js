const express        = require('express');
const path           = require('path');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const PORT           = process.env.PORT || 5000;
const app            = express();

const util = require('util');
const exec = util.promisify(require('child_process').exec);

app
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.urlencoded({
        extended : true
    }))
    .use((req, res, next) => {
        try {
            bodyParser.json();
            next();
        } catch (e) {
            res.status(500).send(e.message);
        }
    })
    .use(bodyParser.json())
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .use(methodOverride((req) => {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            const method = req.body._method;
            delete req.body._method;
            return method;
        }
    }))
    .use((req, res, next) => {
        if (!req.xhr && req.url === '/ajax') {
            res.redirect('/index');
        } else {
            next();
        }
    })
    .use('/', require('./app/routes/index'))
    .use('/remocon', require('./app/routes/remocon'))
    .use('/ajax', require('./app/routes/ajax'))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

process.on('uncaughtException', function(e) {
  console.log('An error has occured. error is: %s and stack trace is: %s', e, e.stack);
  console.log("Process will restart now.");
  //process.nextTick(() => stream.destroy());
  //exec("npm restart");
})
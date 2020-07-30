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
    .use('/climate', require('./app/routes/climate'))
    .use('/ajax', require('./app/routes/ajax'))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

process.on('uncaughtException', function(e) {
  console.log('An error has occured. error is: %s and stack trace is: %s', e, e.stack);
  console.log("Process will restart now.");
  //process.nextTick(() => stream.destroy());
  //exec("npm restart");
});

const admin = require("firebase-admin");

const serviceAccount = require("./home-iot.json");

const remocon = require("./app/libs/remocon");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://home-iot-5cfa9.firebaseio.com"
});

const db = admin.database();
const ref = db.ref("googlehome");

const airconRef = ref.child("aircon/power");
const lightRef = ref.child("light/power");

lightRef.on("value", function(snapshot) {
    console.log("Success");
    console.log("value Changed!!!");
    console.log(snapshot.val());
    if(snapshot.val() == "on"){
        remocon.light_on();
    }
    if(snapshot.val() == "off"){
        remocon.light_off();
    }   
}, 
function(errorObject) {
    console.log("failed: " + errorObject.code);
} );

airconRef.on("value", function(snapshot) {
    console.log("Success");
    console.log("value Changed!!!");
    console.log(snapshot.val());
    if(snapshot.val() == "on"){
        remocon.aircon_on();
    }
    if(snapshot.val() == "off"){
        remocon.aircon_off();
    }   
}, 
function(errorObject) {
    console.log("failed: " + errorObject.code);
} );


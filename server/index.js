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
const climate = require("./app/libs/climate");
const googlehome = require("./app/libs/googlehome");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://home-iot-5cfa9.firebaseio.com"
});

const db = admin.database();
const ref = db.ref("googlehome");

const allRef = ref.child("all/power");
const airconRef = ref.child("aircon/power");
const lightRef = ref.child("light/power");
const climaRef = ref.child("clima/power");
const keyRef = ref.child("key/power");
const ps4Ref = ref.child("ps4/word");

allRef.on("value", function(snapshot) {
    console.log("Success");
    console.log("value Changed!!!");
    console.log(snapshot.val());
    if(snapshot.val().trim() == "on"){
        remocon.all_on();
    }
    if(snapshot.val().trim() == "off"){
        remocon.all_off();
    }
    ref.child("all").set({"power": ""});
}, 
function(errorObject) {
    console.log("failed: " + errorObject.code);
} );

lightRef.on("value", function(snapshot) {
    console.log("Success");
    console.log("value Changed!!!");
    console.log(snapshot.val());
    if(snapshot.val().trim() == "on"){
        remocon.light_on();
    }
    if(snapshot.val().trim() == "off"){
        remocon.light_off();
    }
    ref.child("light").set({"power": ""});
}, 
function(errorObject) {
    console.log("failed: " + errorObject.code);
} );

airconRef.on("value", function(snapshot) {
    console.log("Success");
    console.log("value Changed!!!");
    console.log(snapshot.val());
    if(snapshot.val().trim() == "on"){
        remocon.aircon_on();
    }
    if(snapshot.val().trim() == "off"){
        remocon.aircon_off();
    }
    ref.child("aircon").set({"power": ""});
}, 
function(errorObject) {
    console.log("failed: " + errorObject.code);
} );

climaRef.on("value", function(snapshot) {
    console.log("Success");
    console.log("value Changed!!!");
    console.log(snapshot.val());
    climate.climateSay(); 
    ref.child("clima").set({"power": ""});
}, 
function(errorObject) {
    console.log("failed: " + errorObject.code);
} );

keyRef.on("value", function(snapshot) {
    console.log("Success");
    console.log("value Changed!!!");
    console.log(snapshot.val());
    googlehome.say("やるじゃん！");
    ref.child("key").set({"power": ""});
}, 
function(errorObject) {
    console.log("failed: " + errorObject.code);
} );

//jsonからvalueに一致する値取得
const option =  {
          "起動": " ",
          "オン": " ",
          "スタート": " ",
          "スタンバイ": "standby",
          "停止": "standby",
          "オフ": "standby",
          "ストップ": "standby",
          "ホーム": "remote ps",
          "フォーム": "remote ps",
          "メニュー": "remote ps",
          "エンター": "remote enter",
          "センター": "remote enter",
          "選択": "remote enter",
          "バック": "remote back",
          "戻る": "remote back",
          "戻って": "remote back",
          "オプション": "remote options",
          "上": "remote up",
          "笛": "remote up",
          "うえ": "remote up",
          "下": "remote down",
          "した": "remote down",
          "左": "remote left",
          "右": "remote right",
          "トルネ": "start CUSA00442",
          "とる": "start CUSA00442",
          "メディア": "start CUSA02012",
          "default": false
        };

const command = "sudo ps4-waker ";

function getJsonData(value) {
    try{
        console.log(option[value]);
        return option[value] ? command + option[value] : option["default"];
    }catch(ex){
        console.log(ex);
        console.log(2);
        return option["default"];
    }
}

ps4Ref.on("value", function(changedSnapshot) {
  //値取得
  const value = changedSnapshot.val();
  if (value["word"]) {
    console.log(1, value["word"].trim());

    //コマンド生成
    const command = getJsonData(value["word"].trim());

    //コマンド実行
    if (command) {
      const exec = require('child_process').exec;
      exec(command);
      console.log(command);
      //firebase clear
      ref.child("ps4").set({"word": ""});;
    }

  }
});


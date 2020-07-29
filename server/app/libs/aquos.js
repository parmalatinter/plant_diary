// ref : https://github.com/benburkhart1/sharp-aquos-remote-control/blob/master/lib/aquos.js

  try{
    var Aquos = require("sharp-aquos-remote-control").Aquos;
    var gw = new Aquos("192.168.10.112", 10002, '', '');
  }catch(e){
    console.log(e.name);
    console.log(e.message);
  }



async function power(onoff){
  console.log(1);
  try{
    gw.power(onoff, function(err, data) {
        console.log(10);
        return;
    });
  }catch(e){
    console.log(e.name);
    console.log(e.message);
  }
};

async function channel_down(){
  console.log(2);
  try{
    gw.channelDown(function(err, data) {
        console.log(20);
        return;
    });
  }catch(e){
    console.log(e.name);
    console.log(e.message);
  }
};

async function channel_up() {
  console.log(3);
  try{
    gw.channelUp(function(err, data) {
        console.log(30);
        return;
    });
  }catch(e){
    console.log(e.name);
    console.log(e.message);
  }

};

async function input(req) {
  console.log(4);
  try{
    gw.input(req.query.num, function(err, data) {
        console.log(40);
        return;
    });
  }catch(e){
    console.log(e.name);
    console.log(e.message);
  }

};


exports.tv_on = (req) => power(true);

exports.tv_off = (req) => power(false);

exports.tv_channel_down = (req) => channel_down();

exports.tv_channel_up = (req) => channel_up();

exports.tv_input = (req) => input(req);
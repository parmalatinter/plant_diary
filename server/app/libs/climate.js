const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function command(commandStr) {
  var { stdout, stderr } = await exec(commandStr);
  try{
  	var res = JSON.parse(stdout);
  	return res;
  }catch(e){
  	return { "temp" : 0, "humidity" : 0};
  }
}

exports.climateSay = (req) => command("python3 /home/pi/Documents/git/plant_diary/temperature_humidity_sensor.py").then(result => {
                                command("curl -X POST -d \"text=温度はtemp度、湿度はhumidity％です。\" localhost:8091/google-home-notifier".replace("temp", result.temp).replace("humidity", result.humidity));
                            });

exports.climate = () => command("python3 /home/pi/Documents/git/plant_diary/temperature_humidity_sensor.py").then(result => {
                                return result;
                            });

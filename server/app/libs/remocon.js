const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function command(commandStr) {
  const { stdout, stderr } = await exec(commandStr);
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}


exports.aircon_on = (req) => command("python3 /home/pi/Documents/git/plant_diary/irrp.py -p -g17 -f /home/pi/Documents/git/plant_diary/codes aircon:on");

exports.aircon_off = (req) => command("python3 /home/pi/Documents/git/plant_diary/irrp.py -p -g17 -f /home/pi/Documents/git/plant_diary/codes aircon:off");

exports.light_on = (req) => command("python3 /home/pi/Documents/git/plant_diary/irrp.py -p -g17 -f /home/pi/Documents/git/plant_diary/codes light:on");

exports.light_off = (req) => command("python3 /home/pi/Documents/git/plant_diary/irrp.py -p -g17 -f /home/pi/Documents/git/plant_diary/codes light:off");
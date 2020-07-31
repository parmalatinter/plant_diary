const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function command(commandStr) {
  const { stdout, stderr } = await exec(commandStr);
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}


exports.aircon_on = (req) => command("python3 /home/pi/Documents/git/plant_diary/irrp.py -p -g17 -f /home/pi/Documents/git/plant_diary/codes aircon:on")
                            .then(result => {
                                command("curl -X POST -d \"text=エアコン オン\" localhost:8091/google-home-notifier");
                            });

exports.aircon_off = (req) => command("python3 /home/pi/Documents/git/plant_diary/irrp.py -p -g17 -f /home/pi/Documents/git/plant_diary/codes aircon:off")
                            .then(result => {
                                command("curl -X POST -d \"text=エアコン オフ\" localhost:8091/google-home-notifier");
                            });

exports.light_on = (req) => command("python3 /home/pi/Documents/git/plant_diary/irrp.py -p -g17 -f /home/pi/Documents/git/plant_diary/codes light:on")
                            .then(result => {
                                command("curl -X POST -d \"text=ライト オン\" localhost:8091/google-home-notifier");
                            });

exports.light_off = (req) => command("python3 /home/pi/Documents/git/plant_diary/irrp.py -p -g17 -f /home/pi/Documents/git/plant_diary/codes light:off")
                            .then(result => {
                                command("curl -X POST -d \"text=ライト オフ\" localhost:8091/google-home-notifier");
                            });

exports.all_on = (req) => command("python3 /home/pi/Documents/git/plant_diary/irrp.py -p -g17 -f /home/pi/Documents/git/plant_diary/codes light:on")
                            .then(result => {
                                command("python3 /home/pi/Documents/git/plant_diary/irrp.py -p -g17 -f /home/pi/Documents/git/plant_diary/codes aircon:on").then(result => {
                                    command("sudo ps4-waker").then(result => {
                                        command("curl -X POST -d \"text=オール オン\" localhost:8091/google-home-notifier");
                                    });
                                });
                            });

exports.all_off = (req) => command("python3 /home/pi/Documents/git/plant_diary/irrp.py -p -g17 -f /home/pi/Documents/git/plant_diary/codes light:off")
                            .then(result => {
                                command("python3 /home/pi/Documents/git/plant_diary/irrp.py -p -g17 -f /home/pi/Documents/git/plant_diary/codes aircon:off").then(result => {
                                    command("sudo ps4-waker standby").then(result => {
                                        command("curl -X POST -d \"text=オール オフ\" localhost:8091/google-home-notifier");
                                    });
                                });
                            });
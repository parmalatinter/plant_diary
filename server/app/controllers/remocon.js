const remocon = require("../libs/remocon");
// const aquos = require("../libs/aquos");

exports.get = (req, res) => {
	res.render('pages/remocon');
}
exports.aircon_on = (req, res) => {
	remocon.aircon_on(res);
	res.redirect("/remocon");
}
exports.aircon_off = (req, res) => {
	remocon.aircon_off(res);
	res.redirect("/remocon");
}
exports.light_on = (req, res) => {
	remocon.light_on(res);
	res.redirect("/remocon");
}
exports.light_off = (req, res) => {
	remocon.light_off(res);
	res.redirect("/remocon");
}
exports.all_on = (req, res) => {
	remocon.all_on(res);
	res.redirect("/remocon");
}
exports.all_off = (req, res) => {
	remocon.all_off(res);
	res.redirect("/remocon");
}
// exports.tv_on = (req, res) => {
	// res.render('pages/remocon', aquos.tv_on(req));
// }
// exports.tv_off = (req, res) => {
	// res.render('pages/remocon', aquos.tv_off(req));
// }
// exports.tv_channel_down = (req, res) => {
	// res.render('pages/remocon', aquos.tv_channel_down(req));
// }
// exports.tv_channel_up = (req, res) => {
	// res.render('pages/remocon', aquos.tv_channel_up(req));
// }
// exports.tv_input = (req, res) => {
	// res.render('pages/remocon', aquos.tv_input(req));
// }
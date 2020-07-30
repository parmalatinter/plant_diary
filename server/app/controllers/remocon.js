const remocon = require("../libs/remocon");
// const aquos = require("../libs/aquos");

exports.get    = (req, res) => res.render('pages/remocon');
exports.aircon_on    = (req, res) => res.render('pages/remocon', remocon.aircon_on(req));
exports.aircon_off    = (req, res) => res.render('pages/remocon', remocon.aircon_off(req));
exports.light_on    = (req, res) => res.render('pages/remocon', remocon.light_on(req));
exports.light_off    = (req, res) => res.render('pages/remocon', remocon.light_off(req));
exports.all_on    = (req, res) => res.render('pages/remocon', remocon.all_on(req));
exports.all_off    = (req, res) => res.render('pages/remocon', remocon.all_off(req));
// exports.tv_on    = (req, res) => res.render('pages/remocon', aquos.tv_on(req));
// exports.tv_off    = (req, res) => res.render('pages/remocon', aquos.tv_off(req));
// exports.tv_channel_down    = (req, res) => res.render('pages/remocon', aquos.tv_channel_down(req));
// exports.tv_channel_up    = (req, res) => res.render('pages/remocon', aquos.tv_channel_up(req));
// exports.tv_input    = (req, res) => res.render('pages/remocon', aquos.tv_input(req));
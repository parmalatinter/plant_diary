const climate = require("../libs/climate");

exports.post   = (req, res) => res.render('pages/remocon', climate.climateSay(req));
exports.get    = (req, res) => res.render('pages/remocon', climate.climateSay(req));
exports.put    = (req, res) => res.render('pages/remocon', climate.climateSay(req));
exports.patch  = (req, res) => res.render('pages/remocon', climate.climateSay(req));
exports.delete = (req, res) => res.render('pages/remocon', climate.climateSay(req));
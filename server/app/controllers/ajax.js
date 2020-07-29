const utility = require("../libs/utility");

exports.post   = (req, res) => res.send(utility.set_body(req));
exports.get    = (req, res) => res.send(utility.set_body(req));
exports.put    = (req, res) => res.send(utility.set_body(req));
exports.patch  = (req, res) => res.send(utility.set_body(req));
exports.delete = (req, res) => res.send(utility.set_body(req));

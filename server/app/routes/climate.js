const router = require('express').Router({});
const climate  = require('./../controllers/climate.js');

router.get('/', (req, res) => climate.get(req, res));
router.post('/', (req, res) => climate.post(req, res));
router.put('/', (req, res) => climate.put(req, res));
router.patch('/', (req, res) => climate.patch(req, res));
router.delete('/', (req, res) => climate.patch(req, res));

module.exports = router;

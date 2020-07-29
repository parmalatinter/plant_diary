const router = require('express').Router({});
const index  = require('./../controllers/index.js');

router.get('/', (req, res) => index.get(req, res));
router.post('/', (req, res) => index.post(req, res));
router.put('/', (req, res) => index.put(req, res));
router.patch('/', (req, res) => index.patch(req, res));
router.delete('/', (req, res) => index.patch(req, res));

module.exports = router;

const router = require('express').Router({});
const ajax   = require('./../controllers/ajax.js');

router.get('/', (req, res) => ajax.get(req, res));
router.post('/', (req, res) => ajax.post(req, res));
router.put('/', (req, res) => ajax.put(req, res));
router.patch('/', (req, res) => ajax.patch(req, res));
router.delete('/', (req, res) => ajax.delete(req, res));

module.exports = router;
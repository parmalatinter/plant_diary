const router = require('express').Router({});
const remocon  = require('./../controllers/remocon.js');

router.get('/', (req, res) => remocon.get(req, res));
router.get('/aircon/on', (req, res) => remocon.aircon_on(req, res));
router.get('/aircon/off', (req, res) => remocon.aircon_off(req, res));
router.get('/light/on', (req, res) => remocon.light_on(req, res));
router.get('/light/off', (req, res) => remocon.light_off(req, res));
router.get('/all/on', (req, res) => remocon.all_on(req, res));
router.get('/all/off', (req, res) => remocon.all_off(req, res));
// router.get('/tv/on', (req, res) => remocon.tv_on(req, res));
// router.get('/tv/off', (req, res) => remocon.tv_off(req, res));
// router.get('/tv/channel_down', (req, res) => remocon.tv_channel_down(req, res));
// router.get('/tv/channel_up', (req, res) => remocon.tv_channel_up(req, res));
// router.get('/tv/input', (req, res) => remocon.tv_input(req, res));
router.post('/', (req, res) => remocon.post(req, res));
router.put('/', (req, res) => remocon.put(req, res));
router.patch('/', (req, res) => remocon.patch(req, res));
router.delete('/', (req, res) => remocon.patch(req, res));

module.exports = router;

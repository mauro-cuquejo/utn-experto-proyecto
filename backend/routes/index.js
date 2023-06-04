let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('admin/login');
});

module.exports = router;

/* GET home page. */
router.get('/index', function (req, res, next) {
  res.redirect('admin/login');
});

module.exports = router;
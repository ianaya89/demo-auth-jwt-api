const Router = require('express').Router
const router = new Router()

const check = function (req, res, next) {
  return res.status(200).send('The token is valid 😃 👏 🍻')
}

router.get('/', check)

module.exports = router

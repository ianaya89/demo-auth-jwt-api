const Router = require('express').Router
const jwt = require('jsonwebtoken')
const router = new Router()

const auth = function (req, res, next) {
  req.logger.verbose(`Authenticating user with email ${req.body.email}`)

  if (!req.body.email) {
    return res.status(400).send('Missing email parameter 🙄')
  }

  if (!req.body.password) {
    return res.status(400).send('Missing password parameter 🙄')
  }

  const user = req.usersDb.find(u => {
    return (u.email === req.body.email) && (u.password === req.body.password)
  })

  if (!user) {
    req.logger.warn(`User with email ${req.body.email} not found 😱 👎`)
    return res.status(401).send('Access Denied 🛑')
  }

  req.logger.verbose(`Authorizing user with ${req.body.email} 🙌`)
  delete user.password

  const token = `Bearer ${jwt.sign(user, req.config.secret)}`
  res.send(200, { token })
}

router.post('/', auth)

module.exports = router

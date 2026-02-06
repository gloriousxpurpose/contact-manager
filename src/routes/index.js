const router = require('express').Router()

const routes = [
    require('./contact.route'),
    require('./user.route')
];

routes.forEach((route) => router.use(route))

module.exports = router
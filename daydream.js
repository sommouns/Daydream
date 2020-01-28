const koa = require('koa')
const { initRouter, initController, initService } = require('./dream-loader')

module.exports = class Daydream {
    constructor(conf) {
        this.$app = new koa(conf)
        this.$service = initService()
        this.$ctrl = initController()
        this.$router = initRouter(this)
        this.$app.use(this.$router.routes())
    }

    start (port = 3000, cb) {
        this.$app.listen(port, cb)
    }
}
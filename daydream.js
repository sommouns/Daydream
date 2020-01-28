const koa = require('koa')
const { initRouter } = require('./dream-loader')

module.exports = class Daydream {
    constructor(conf) {
        this.$app = new koa(conf)
        this.$router = initRouter()
        this.$app.use(this.$router.routes())
    }

    start (port = 3000, cb) {
        this.$app.listen(port, cb)
    }
}
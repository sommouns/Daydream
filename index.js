const app = new (require('koa'))()

// regist router
const {initRouter} = require('./dream-loader')
app.use(initRouter().routes())

// listen port
app.listen(3000)
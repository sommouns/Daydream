const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

/**
 * load files and dirs
 * @param {String} dir 
 * @param {Function} cb  
 */
function load (dir, cb) {
    // get absolute path
    const url = path.resolve(__dirname, dir)

    // read dir
    const files = fs.readdirSync(url)

    files.forEach(filename => {
        // remove ext name
        filename = filename.replace('.js', '')
        const file = require(url + '/' + filename)
        cb(filename, file)
    })
}

/**
 * init router
 */
function initRouter (app) {
    const router = new Router()
    load('routes', (filename, routes) => {
        routes = typeof routes === 'function' ? routes(app) : routes
        const prefix = filename === 'index' ? '' : '/' + filename
        Object.keys(routes).forEach(key => {
            const [method, path] = key.split(' ')

            // regist routes
            router[method](prefix + path, async ctx => {
                app.ctx = ctx
                await routes[key](app)
            })
        })
    })

    return router
}

/**
 * init controller
 * @param {any} app app实例对象
 */
function initController (app) {
    const controllers = {}
    load('controller', (filename, controller) => {
        controllers[filename] = controller
    })
    return controllers
}

/**
 * init service
 */
function initService () {
    const services = {}
    load('service', (filename, service) => {
        services[filename] = service
    })
    return services
}

/**
 * init schedule
 */
function initSchedule(app) {
    load('schedule', (filename, {interval, handler}) => {
        require('node-schedule').scheduleJob(interval, (app) => {handler(app)})
    })
}


/**
 * init config
 * @param {any} app app实例对象
 */
function loadConfig(app) {
    load('config', (filename, conf) => {

        // mysql
        if (conf.db) {
            app.$db = new (require('sequelize'))(conf.db)
            app.$model = {}
            load('model', (filename, {schema = {}, options = {}}) => {
                app.$model[filename] = app.$db.define(filename, schema, options)
            })
            app.$db.sync()
        }

        if(conf.middleware) {
            conf.middleware.forEach(mid => {
                const midPath = path.resolve(__dirname, 'middleware', mid)
                app.$app.use(require(midPath))
            })
        }
    })
}

module.exports = { initRouter, initController, initService, loadConfig, initSchedule }
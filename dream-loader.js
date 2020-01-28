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
 * @param {any} app app实例对象
 */
function initRouter (app) {
    const router = new Router()
    load('routes', (filename, routes) => {
        routes = typeof routes === 'function' ? routes(app) : routes
        const prefix = filename === 'index' ? '' : '/' + filename
        Object.keys(routes).forEach(key => {
            const [method, path] = key.split(' ')

            // regist routes
            router[method](prefix + path, routes[key])
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
    load('controller', (filename,    controller) => {
        controllers[filename] = controller
    })
    return controllers
}
module.exports = { initRouter, initController }
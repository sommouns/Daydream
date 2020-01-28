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
function initRouter () {
    const router = new Router()
    load('routes', (filename, routes) => {
        const prefix = filename === 'index' ? '' : '/' + filename
        Object.keys(routes).forEach(key => {
            const [method, path] = key.split(' ')
            console.log(method.toLocaleUpperCase(), prefix, path)

            // regist routes
            router[method](prefix + path, routes[key])
        })
    })

    return router
}

module.exports = { initRouter }
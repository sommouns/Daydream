module.exports = {
    'get /': async (app) => {
        const name = await app.$service.user.getName()
        app.ctx.body = 'user: ' + name
    },
    'get /detail': async (app) => {
        const age = await app.$service.user.getAge()
        app.ctx.body = 'age: ' + age
    }
}
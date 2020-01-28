module.exports = {
    'get /': async ctx => {
        ctx.body = 'user home page'
    },
    'get /detail': async ctx => {
        ctx.body = 'user detail page'
    }
}
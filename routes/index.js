module.exports = {
    'get /': async ctx => {
        ctx.body = 'home page'
    },
    'get /detail': async ctx => {
        ctx.body = 'detail page'
    }
}
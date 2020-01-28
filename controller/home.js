module.exports = {
    index: async app => {
        app.ctx.body = 'Index'
    },
    detail: async app => {
        app.ctx.body = 'detail page'
    }
}
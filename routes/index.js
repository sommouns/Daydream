module.exports = app => ({
    'get /': async () => {
        await app.$ctrl.home.index(app)
    },
    'get /detail': app.$ctrl.home.detail
})
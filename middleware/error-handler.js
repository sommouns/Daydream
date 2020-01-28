module.exports = async (ctx, next) => {
    try {
        await next()
    } catch (e) {
        console.log(e)
    }
}
module.exports = {
    interval: '30 * * * * *',
    handler() {
        console.log('this is  a job' + Date.now())
    }
}
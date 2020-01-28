const Daydream = require('./daydream')

const app = new Daydream()

app.start(3000, () => {
    console.log('Daydream app is running at localhost: 3000')
})
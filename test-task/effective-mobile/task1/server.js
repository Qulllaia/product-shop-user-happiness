const express = require("express")
const app = express()
const productRouter = require('./routers/product.router.js')
const remainRouter = require('./routers/remain.router.js')
const bodyParser = require('body-parser')
const actionHistoryRouter = require("./routers/action-history.router.js")
const middleware = require('./middleware.js')

app.use(bodyParser({extended:true}));
app.use(express.json())
app.use(middleware.eventForHistory)

app.use('/product', productRouter)
app.use('/remain', remainRouter)
app.use('/history', actionHistoryRouter)

app.listen(8000, "localhost", ()=>{
    console.log('server starts')
})

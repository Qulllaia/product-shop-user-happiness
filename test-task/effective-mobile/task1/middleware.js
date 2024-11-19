const axios = require('axios')

class Middleware{

    async eventForHistory (req, res, next) {
        if (req.url.split('/')[1] === 'remain') { 
            await axios({
                method:'post', 
                url:'http://localhost:8000/history/',
                data:{
                    shopId: req.method === 'GET' ? null : req.body.shopId, 
                    productId: req.method === 'GET' ? null : req.body.productId, 
                    date: new Date().toLocaleString(), 
                    action: req.method, 
                }
            }).catch((e)=>{
                res.status(500).send({"error": e, "message":e.message})
            })
        }
        next()
    }
}

module.exports = new Middleware()
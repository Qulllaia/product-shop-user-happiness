const db = require('../database')


class ProductController{
    async getWithName(req, res){
        let result;
        if(req.body.productName)
            result = await db.query(`select * from product where "productName" like '%${req.body.productName}%'`)
        else
            result = await db.query('select * from product order by "productName"')
        res.status(200).send(result.rows)
    }
    async getWithPLU(req, res){
        let result;
        if(req.body.productId)
            result = await db.query(`select * from product where "PLU" = '${req.body.productId}'`)
        else
            result = await db.query('select * from product order by "PLU"')
        res.status(200).send(result.rows)  
    }
    async createProduct(req, res){
        if(req.body.productName){
            const query = await db.query('insert into product ("productName") values($1) returning *', [req.body.productName]);
            res.status(200).send(query.rows)  
        }
        else
            res.status(404).send({"message":"Не введено название продукта"})
    }
}    

module.exports = new ProductController()
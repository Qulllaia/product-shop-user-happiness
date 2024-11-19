const db = require('../database')

class RemainController{
    async createRemain(req, res){
        let {shopId, productId, productOrder, productLeft} = req.body;
        try{
            if(!shopId || !productId){
                res.status(404).send({"message":"Поля c ID магазина и продукта не могут быть пустыми"})
                return
            }
            
            const query = await db.query(
                'insert into product_shop ("shopId", "productId", "productOrder", "productLeft")' + 
                'values($1,$2,$3,$4) returning *', 
                [
                    shopId, 
                    productId, 
                    productOrder ? productOrder : 0, 
                    productLeft ? productLeft : 0
                ])
            res.status(200).send(query.rows)

        }catch(e){
            res.status(500).send({"error": e, "message":e.message})
        }
    }
    async updateRemain(req, res){
        let {shopId, productId, productOrderDifference, productLeftDifference} = req.body
        try{
            if(!shopId && !productId){
                res.status(404).send({"message":"ID продукта и магазина должны быть введены"})
                return
            }

            if(!productOrderDifference && !productLeftDifference){
                res.status(404).send({"message":"Изменение остатка в заказе или на полке должно быть введено"})
                return
            }

            const remainData = await db.query(
                'select "productOrder", "productLeft" from product_shop ' + 
                'where "shopId" = $1 and "productId" = $2', [shopId, productId]
            )

            const {productOrder, productLeft} = remainData.rows[0]
            const query = await db.query('update product_shop set "productOrder" = $1, "productLeft" = $2 '+
                'where "shopId" = $3 and "productId" = $4 returning *', [
                    productOrder + productOrderDifference ? productOrderDifference : 0, 
                    productLeft + productLeftDifference ? productLeftDifference : 0,
                    shopId,
                    productId
                ])
                
            res.status(200).send(query.rows)
        }
        catch(e){
            res.status(500).send({"error": e, "message":e.message})
        }
    }
    async getRemainWithPLU(req, res){
        let result;
        if(req.body.productId)
            result = await db.query(`select * from product_shop where "productId" = '${req.body.productId}'`)
        else
            result = await db.query('select * from product_shop order by "productId"')
        res.status(200).send(result.rows)  
    }

    async getRemainWithShopId(req, res){
        let result;
        if(req.body.shopId)
            result = await db.query(`select * from product_shop where "shopId" = '${req.body.shopId}'`)
        else
            result = await db.query('select * from product_shop order by "shopId"')
        res.status(200).send(result.rows)  
    }

    async getRemainOrder(req, res){
        const query = await db.query('select * from product_shop order by "productOrder"')
        res.status(200).send(query.rows)
    }
    
    async getRemainLeft(req, res){
        const query = await db.query('select * from product_shop order by "productLeft"')
        res.status(200).send(query.rows)
    }
}

module.exports = new RemainController()
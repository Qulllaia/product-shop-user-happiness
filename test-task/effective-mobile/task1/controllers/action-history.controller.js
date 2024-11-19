const db = require('../database')

class ActionHistory{
    async createAction(req, res){
        const {shopId, productId, date, action} = req.body;
        const query = await db.query('insert into action_history ("shopId", "productId", "date", "action") '+
            'values($1, $2, $3, $4) returning *', [shopId, productId, date, action])
        res.send(query)
    }
    async getHistoryWithPLU(req, res){
        let result;
        if(req.body.productId)
            result = await db.query(`select * from action_history where "productId" = '${req.body.productId}'`)
        else
            result = await db.query('select * from action_history order by "productId"')
        res.status(200).send(result.rows)  
    }
    async getHistoryWithShopId(req, res){
        let result;
        if(req.body.shopId)
            result = await db.query(`select * from action_history where "shopId" = '${req.body.shopId}'`)
        else
            result = await db.query('select * from action_history order by "shopId"')
        res.status(200).send(result.rows)  
    }
    async getHistoryWithDate(req, res){
        let result;
        if(req.body.date)
            result = await db.query(`select * from action_history where "date" like '%${req.body.date}%'`)
        else
            result = await db.query('select * from action_history order by "date"')
        res.status(200).send(result.rows)  
    }
    async getHistoryWithAction(req, res){
        let result;
        if(req.body.action)
            result = await db.query(`select * from action_history where "action" = '${req.body.action}'`)
        else
            result = await db.query('select * from action_history order by "action"')
        res.status(200).send(result.rows) 
    }
    
}

module.exports = new ActionHistory()
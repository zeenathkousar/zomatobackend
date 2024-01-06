const express=require('express');
const router=express.Router();

const Order=require('../models/Orders');

router.post('/orderData',async(req,res)=>{
    let data=req.body.order_data;
    await data.splice(0,0,{Order_date :req.body.order_date})

    //if email not existing in db then  create : else : InsertMany()
    let eId=await Order.findOne({'email' : req.body.email})
    console.log(eId);
    if(eId === null){
        try{
            await Order.create({
                email:req.body.email,
                order_data: [data]
            }).then(()=>{
                res.json({success:'new user order created'})
            })  
        }
        catch(e){
            console.log(e.message);
            res.status(401).send('server error',e.message)
        }

    }
    else{
        try{
                await Order.findOneAndUpdate({ 'email' : req.body.email},
                    {
                        $push: { order_data: data } }).then(()=>{
                            res.json({ success: `user order updated`})
                            
                        })
            }
            catch(error){
                res.send("Server Error ",error.message)
            }
            

        }
    }


)
router.post('/myorderData',async(req,res)=>{
    try{
        let myData=await Order.findOne({'email': req.body.email});
        res.json({orderData: myData})

    }
    catch(e){
        res.send("Server Error ",e.message)

    }

})


module.exports=router;
const express=require('express');
const app=express();
const port= process.env.PORT || 3000;
const  mongoDB=require('./db');
const cors=require('cors');
require('dotenv').config();
mongoDB();

app.use(cors())
app.get('/',(req,res)=>{
    res.send('hello')
})
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"https://frontendzomatowebsite.onrender.com/");
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
})
app.use(express.json())
app.use('/api/',require('./Routes/CreateUser'))
app.use('/api/',require('./Routes/DisplayData'))
app.use('/api/',require('./Routes/OrderData'))

app.get('/',(req,res)=>{
    res.send('hello world')
})



app.listen(port,()=>{
    console.log(`server started backedn on port ${port}`)
})

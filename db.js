const mongoose = require('mongoose');
// const MongoURI = 'mongodb+srv://zomatozee:zomatozee@cluster0.xlrs6ke.mongodb.net/zomatodb?retryWrites=true&w=majority';
const mongoDB = async () => {
    await mongoose.connect(process.env.MONGOURL).then(async () => {
        console.log('db connected')
        //fetching data
        const fetchedData = await mongoose.connection.db.collection('fooditems');
        console.log(`fetched data is ${fetchedData}`)
        // console.log(fetchedData)
        console.log('fetched data is:',  fetchedData.find({}).toArray() ) // u get output as it returning a promise - so add await.
        // const data= await fetchedData.find({}).toArray();
        //     if(data){
        //         global.fooditems=data;
        //         console.log(global.fooditems);

        //     }
        //     else{
        //         console.log(e)
        //     }
        // });

        const data= await  fetchedData.find({}).toArray();
        const foodCategory=await mongoose.connection.db.collection('foodCategory');
        const catData=await foodCategory.find({}).toArray();
            if(data){
                global.fooditems=data;
                global.foodCategory=catData;

                // console.log(global.fooditems);
                console.log(global.foodCategory)

            }
            else{
                console.log(e)
            }





        // const foodCategory=await mongoose.connection.db.collection('foodcollection')
        // if(data){
        // global.fooditems=data;
        // console.log(global.fooditems);
        // }
        // else{
        //     console.log('error in fetching')
        // }

        // await fetchedData.find({}).toArray(async function (err, data) {
        //     const foodCategory = await mongoose.connection.db.collection('foodCategory');
        //     foodCategory.find({}).toArray(function (err, catData) {
        //         if (data) {
        //             global.fooditems = data;
        //             global.foodCategory=catData;
        //             console.log(data)
        //             console.log(global.fooditems)

        //         }
        //         else {
        //             console.log('error in fetching db')


        //         }
        //     })
            
        // });
    }

    )}
module.exports = mongoDB;
const mongoose=require('mongoose')

    const connectdb=async ()=>{
        try{
            const conn =await mongoose.connect(process.env.MONGOURI,{
                useNewUrlParser:true,
                useUnifiedTopology:true,
                
            });

            console.log(`Mongo Db connected ${conn.connection.host}`);
            
        }
        catch(e){
            console.log(e.message);
            
        }
    }


    module.exports=connectdb;
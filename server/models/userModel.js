const mongoose = require ('mongoose');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    dipslayPicture:{
        type:String,
        require:true,
        default:"https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
    },
    
   
}, {
    timestamps:true
})

const User= mongoose.Model("User",userSchema);
module.exports= User;


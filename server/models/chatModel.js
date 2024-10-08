const mongoose = require ('mongoose');
const chatSchema=mongoose.Schema({
    chatName:{
        type:String,
        trim:true
    },
    isGroupChat:{
        type:Boolean,
        default:false
    },
    user:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    latestMessage:{
       type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    groupAdmin:{
          type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
   
}, {
    timestamps:true
})

const chatModel= mongoose.Model("Chats",chatSchema);
module.exports= chatModel;


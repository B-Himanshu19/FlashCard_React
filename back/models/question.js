const mongoose=require('mongoose')

const questionSchema=mongoose.Schema({

    question:{
        type:String
    },
    options:{
        type:Array
    },
    answer:{
        type:String
    }
},{
    timeStamp:true
})
const questionmodel=mongoose.model('Question',questionSchema)
module.exports=questionmodel

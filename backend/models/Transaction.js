const mongoose=require('mongoose')

const transactionSchema =new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        ref:"User"
    },
    amount:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        enum:["income","expense"],
        required:true
    },
      category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  note: {
    type: String
  }
}, { timestamps: true })

module.exports=mongoose.model("Transaction",transactionSchema)


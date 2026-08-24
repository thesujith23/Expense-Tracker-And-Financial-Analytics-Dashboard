const express=require('express')
const Transaction=require('../models/Transaction')
const authMiddleware=require('../middleware/authMiddleware')
const { default: mongoose } = require('mongoose')

const router=express.Router()

router.post('/',authMiddleware,async(req,res)=>{
    try{
        const {amount,type,category,date,note}=req.body

        const newTransaction=new Transaction({
            userId:req.user.id,
            amount,
            type,
            category,
            date,
            note
        })

        await newTransaction.save()

        res.status(201).json(newTransaction)
    }catch(err){
        console.error("TRANSACTION POST ERROR:", err.message)
        res.status(500).json({msg:err.message})
    }
})

router.get('/',authMiddleware,async(req,res)=>{
    try{
        const transactions=await Transaction.find({
            userId:req.user.id
        }).sort({date:-1})
        res.json(transactions)
    }catch(err){
        res.status(500).json({msg:err.message})
    }
})

router.get("/summary",authMiddleware,async(req,res)=>{
    try{
        const summary=await Transaction.aggregate([
            {
                $match:{
                    userId:req.user.id
                }
            },
            {
                $group:{
                    _id:"$type",
                    total:{$sum:"$amount"}
                }
            }
        ])

        let totalIncome=0
        let totalExpense=0
        console.log("Logged in user ID:", req.user.id)
        summary.forEach(item=>{
            if(item._id==="income") totalIncome=item.total
            if(item._id==="expense") totalExpense=item.total
        })

        res.json({
            totalExpense,
            totalIncome,
            balance:totalIncome-totalExpense
        })
    }catch(err){
        res.status(500).json({msg:err.message})
    }
})

router.get('/category-summary',authMiddleware,async(req,res)=>{
    try{
        const summary=await Transaction.aggregate([
            {
                $match:{
                    userId:req.user.id
                }
            },
            {
                $group:{
                    _id:"$category",
                    total:{$sum:"$amount"}
                }
            },
            {
                $sort:{total:-1}
            }

        ])
        res.json(summary)
    }catch(err){
        res.status(500).json({msg:err.message})
    }
})

router.get('/income-summary',authMiddleware,async(req,res)=>{
    try{
        const summary=await Transaction.aggregate([
            {
                $match:{
                    userId:req.user.id,
                    type:"income"
                }
            },
            {
                $group:{
                    _id:"$category",
                    total:{$sum:"$amount"}
                }
            },
            {
                $sort:{total:-1}
            }
        ])
          res.json(summary)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get("/expense-summary", authMiddleware, async (req, res) => {
  try {
    const summary = await Transaction.aggregate([
      {
        $match: {
          userId: req.user.id,
          type: "expense"
        }
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: { total: -1 }
      }
    ])

    res.json(summary)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get("/monthly-expense", authMiddleware, async (req, res) => {
  try {
    const summary = await Transaction.aggregate([
      {
        $match: {
          userId: req.user.id,
          type: "expense"
        }
      },
      {
        $group: {
          _id: { 
           year: {$year:"$date"},
            month:{$month: "$date"}
            },
          total: { $sum: "$amount" }
        }
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          total: 1
        }
      },
      {
        $sort: { year:1,month: 1 }
      }
    ])

    res.json(summary)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    })
    
    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' })
    }
    
    res.json({ msg: 'Transaction removed' })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
})

module.exports=router
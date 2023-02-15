const Expense=require('../models/expense');

exports.postAddExpense=async(req,res,next)=>{
    try{
   const price=req.body.price;
   const description=req.body.description;
   const category=req.body.category;
   const userId=req.user.id;
   const data=await Expense.create({price:price,description:description,category:category,userId:userId})
   res.status(201).json({expenseDetails:data});   
}catch(err){
        console.log(err);
    }
}

exports.getExpenses=async(req,res,next)=>{
    try{
    const expenses=await Expense.findAll({where:{userId:req.user.id}});
    res.status(200).json({allExpense:expenses});
    }catch(err){
        console.log(err);
    }
   }
   
   exports.deleteExpense=async(req,res,next)=>{
      try{
        const uId=req.params.id;
       await Expense.destroy({where:{id:uId,userId:req.user.id}});
       res.sendStatus(200);
     
    }
       catch(err){
           console.log(err);
       }
   }


const Expense=require('../models/expense');
const User=require('../models/user');
const sequelize=require('../util/database');

exports.postAddExpense=async(req,res,next)=>{
    const t=await sequelize.transaction();
    try{
   const price=req.body.price;
   const description=req.body.description;
   const category=req.body.category;
   const userId=req.user.id;

   if(price==undefined||price.length==0){
    return res.status(400).json({success:false,message:"parameters Missing"})
   }

   const user=await User.findOne({where:{id:userId}});
   var totalexpense=user.totalexpense;
   totalexpense=Number(totalexpense)+Number(price);   
   
   const data=await Expense.create({price:price,description:description,category:category,userId:userId},{transaction:t})
   await user.update({totalexpense:totalexpense},{transaction:t})
    await t.commit();
   res.status(201).json({expenseDetails:data});   
}catch (err){
    await t.rollback();
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
    const t=await sequelize.transaction();

      try{
        const uId=req.params.id;
        const userId=req.user.id;
        const expense=await Expense.findOne({where:{id:uId}});
         const price=expense.price;
        const user=await User.findOne({where:{id:userId}});
        var totalexpense=user.totalexpense;
        totalexpense=Number(totalexpense)-Number(price);   
       await Expense.destroy({where:{id:uId,userId:userId}},{transaction:t});
       await user.update({totalexpense:totalexpense},{transaction:t})
    await t.commit();   
       res.sendStatus(200);
    }
       catch(err){
        await t.rollback();
           console.log(err);
       }
   }


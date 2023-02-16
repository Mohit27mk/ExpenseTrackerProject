const Expense=require('../models/expense');
const User=require('../models/user');

const sequelize=require('../util/database');

const getLeaderUserBoard=async(req,res)=>{
try{
   const leaderBoardofusers=await User.findAll({
    attributes:['id','name',[sequelize.fn('sum',sequelize.col('expenses.price')),'total_cost']],
   include:[
      {
        model:Expense,
        attributes:[]
      }
   ],
   group:['user.id'],
   order:[[sequelize.col('total_cost'),"DESC"]]  
});
   
   res.status(200).json(leaderBoardofusers);

}catch(err){
    console.log(err);
    res.status(500).json(err);
}
}






module.exports={
    getLeaderUserBoard
}
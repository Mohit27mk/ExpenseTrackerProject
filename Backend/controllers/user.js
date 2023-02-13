const User=require('../models/user');


exports.postAddUser=async(req,res,next)=>{
    try{
   const name=req.body.name;
   const email=req.body.email;
   const password=req.body.password;
   
   const emailExists = await User.findOne({ where: { email: email } });
   if (emailExists ) {
    return res.send({Email:"exist"});
   }
   const data=await User.create({name:name,email:email,password:password})
   res.status(201).json({userDetails:data});   
}catch(err){
        console.log(err);
    }
}
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

exports.postLoginUser=async(req,res,next)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;
        
        const emailExists = await User.findOne({ where: { email: email } });
        if (emailExists) {
        if(emailExists.dataValues.password==password){
            res.status(201).json({login:"Login succesful"});   
        }else{
            res.status(401).json({login:"User not authorized"});   
        }
 
        }else{
            res.status(404).json({login:"User not found)"}); 
        }
      
     }catch(err){
             console.log(err);
         }
};
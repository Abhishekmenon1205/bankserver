const jwt=require('jsonwebtoken')
const db=require('./db.js')

userDetails={
    1000:{acno:1000,username:"anu",password:"abc123",balance:0,transaction:[]},
    1001:{acno:1001,username:"amal",password:"abc123",balance:0,transaction:[]},
    1003:{acno:1003,username:"arun",password:"abc123",balance:0,transaction:[]},
    1004:{acno:1004,username:"akhil",password:"abc123",balance:0,transaction:[]}
}

register=(uname,acno,psw)=>{
   if(acno in userDetails){
   return {
    status:false,
    message:'user already present',
    statusCode:401
   }
  }
  else{
    userDetails[acno]={acno,username:uname,password:psw,balance:0,transaction:[]}

    return{
        status:true,
        message:'register success',
        statusCode:200
    
  }
  }
  }
  login=(acno,psw)=>{
    if (acno in userDetails) {
      if (psw == userDetails[acno]["password"]) {
        currentUser=userDetails[acno]["username"]
    currentAcno=acno

   const token= jwt.sign({currentAcno},"supersecretkey123")

    return{
      status:true,
      message:'login success',
      statusCode:200,
      currentUser,
      currentAcno,
      token
    }
  
  }

  else{
    return{
      status:false,
      messsage:'incorrect password',
      statusCode:401
    }
  }
}  
  else {
    return{
      status:false,
      messsage:'not registered',
      statusCode:401
  }
 }
}

  
deposit=(acnum,password,amount)=>{
  
  var amnt=parseInt(amount)
 if (acnum in userDetails) {
   if (password==userDetails[acnum]["password"]) {
     
     
     userDetails[acnum]["balance"]+=amnt
     
     userDetails[acnum]["transaction"].push({Type:"CREDIT",amount:amnt})

     
     return{
      status:true,
      message:`${amnt} is credited to your ac and the balance is ${userDetails[acnum]["balance"]}`,
      statusCode:200
     }
   
   }
   else{
     return {
      status:false,
      message:'incorrect acno',
      statusCode:401
     }
   }
 }  
 else{
   return {
    status:false,
    message:'not registered',
    statusCode:401
   }
 }
}
 

withdraw=(acnum,password,amount)=>{
    
  var amnt=parseInt(amount)

 if (acnum in userDetails) {
   if (password==userDetails[acnum]["password"]) {
    if (amnt <= userDetails[acnum]["balance"]) {
    
     userDetails[acnum]["balance"]-=amnt
     
     userDetails[acnum]["transaction"].push({Type:"DEBIT",amount:amnt})
     return{ 
                status:true,
                message:`${amnt} is debited to your ac and the balance is ${userDetails[acnum]["balance"]}`,
     statusCode:200
     }
   }
   else{
    
     return {
      status:false,
      message:'insufficient balance',
      statusCode:401
     }
   }
 }  
 else{
  
   return {
    status:false,
    messsage:'incorrect password',
    statusCode:401
  }
 }
}
else{
  
  return {
    status:false,
    messsage:'incorrect acnum',
    statusCode:401
  }
}
}


getTransaction=(acno)=>{
  return {
    status:true,
    statusCode:200,
    transaction:userDetails[acno]["transaction"]
  }
  
}
  module.exports={
    register,login,deposit,withdraw,getTransaction
  }
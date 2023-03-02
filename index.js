// import dataservice file
const dataService=require('./service/dataservice')

// import json web token
const jwt=require('jsonwebtoken')

// import express

const express=require("express");

// create app using express
const app=express()


// to parse json data from req body
app.use(express.json())


// middleware

const jwtMiddleware=(req,res,next)=>{
    try{
    const token=req.headers['access_token']
    // verify token
    const data=jwt.verify(token,"supersecretkey123")
    console.log("-----------middleware---------");
    console.log(data);
    next()
}

catch{
        res.status(422).json({
            statusCode:422,
            status:false,
            message:'please login first'
        })
}

}
// register-post
app.post('/register',(req,res)=>{
    dataService.register(req.body.uname,req.body.acno,req.body.psw)
    res.status(result.statusCode).json(result)
})

// convert object to json and send as response
    // console.log(req.body);
    // res.send("success")



// login
app.get('/login',(req,res)=>{
    const result=dataService.login(req.body.acno,req.body.psw)
    // convert object to json and send as response
    res.status(result.statusCode).json(result)


})


// deposit
app.post('/deposit',jwtMiddleware,(req,res)=>{

    const result=dataService.deposit(req.body.acnum,req.body.password,req.body.amount)
    // convert object to json and send as response
    res.status(result.statusCode).json(result)
})


// withdraw
app.post('/withdraw',(req,res)=>{
    const result=dataService.withdraw(req.body.acnum,req.body.password,req.body.amount)
    // convert object to json and send as response
    res.status(result.statusCode).json(result)
})


// getTransaction
app.get('/transaction',(req,res)=>{
    const result=dataService.getTransaction(req.body.acno)
    // convert object to json and send as response
    res.status(result.statusCode).json(result)
})
// delete





// request
// app.get('/',(req,res)=>{
//     res.send('get Method...123')
// })

// app.post('/',(req,res)=>{
//     res.send('post Method...123')
// })
// app.patch('/',(req,res)=>{
//     res.send('patch Method...123')
// })
// app.put('/',(req,res)=>{
//     res.send('put Method...123')
// })
// app.delete('/',(req,res)=>{
//     res.send('delete Method...123')
// })

// create port 
app.listen(3000,()=>{console.log("server started at port number 3000");})

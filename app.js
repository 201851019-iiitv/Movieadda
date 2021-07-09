const express=require('express')
const request=require('request')
const app=express()
const dotenv=require('dotenv')

dotenv.config()
const port=process.env.PORT ||3000
app.set("view engine","ejs")

app.get('/',(req,res)=>{
    
//res.send('Hompage')
//console.log(req.params)
//res.send("details of "+req.params.id)
res.render("home")


})

app.get('/about',(req,res)=>{

res.render("about")

})


app.get('/movies',(req,res)=>{

    const url='http://www.omdbapi.com/?s='+req.query.MovieName+'&apikey='+process.env.API_KEY
    //console.log(url)
    //res.send("details of "+url)
request(url,function(error,response,body){

    if(!error && response.statusCode==200)
    {
        const data=JSON.parse(body)
        res.render("result",{moviesData:data})
    }
    else{
        res.send("Something went wrong!!!")
    }



})


})

app.get("/movies/:id" ,(req,res)=>{

    const url='http://www.omdbapi.com/?i='+req.params.id+'&apikey='+process.env.API_KEY

    //console.log(url)
    //res.send("details of "+url)
request(url,function(error,response,body){

    if(!error && response.statusCode==200)
    {
        const data=JSON.parse(body)
        res.render('details',{details:data})
    }
    else{
        res.send("Something went wrong!!!")
    }



})   


})


app.get('*' ,(req,res)=>{
    res.send("404 not found !!")
})


app.listen(port,()=>{

    console.log('server has started')
})

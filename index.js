console.log('Starting index.js');

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
const port =process.env.PORT || 3000;

hbs.registerPartials(path.join(__dirname,'/views/partials'));

app.set('view-engine','hbs');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

app.use((req,res,next)=>{
    var time=new Date().toString();
    var log=`${time} : ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('./log/server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to log req.')
            console.log(err);
        }
    })
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(path.join(__dirname,'/public')));

app.get('/',(req,res) =>{
    res.render('home.hbs',{
        pageTitle:'Home page',
        message:'Welcome to home page'
    })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About page',
        message:'Welcome to about page'
    })
});

app.get('/bad',(req,res)=>{
    res.send({
        error_message:"You are in the wrong planet",
        status_code:400
    })
});

app.listen(port,()=>console.log('Server is running on '+port));
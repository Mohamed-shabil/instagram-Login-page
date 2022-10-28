const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb+srv://admin-shabil:shabil_dev_Mongo_123@cluster0.fxwxz.mongodb.net/instaDB',{useNewUrlParser: true,useUnifiedTopology: true},()=>{
    console.log('Db Listening');
})

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));



const userSchema= new mongoose.Schema({
     answer:String
})
const Users = new mongoose.model('user',userSchema);

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/',(req,res)=>{
    console.log(req.body);
    const newUser = new Users({
        answer : req.body.answer,
    })
    newUser.save()

    res.render('loading');
})

app.listen(process.env.PORT||3000,()=>{
    console.log('Server Listening on Port 3000');
})
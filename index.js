const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("./course")
const Course = mongoose.model("courses");

mongoose.connect("mongodb+srv://sooa_mongo_admin:CbfRdzY1dULYKIiE@sooa-mongo-cluster.lrlq0px.mongodb.net/SOOA_subjects_db?retryWrites=true&w=majority", ()=>{
    console.log("Database is connected");
}
);

app.use(bodyParser.json());

app.get("/grades",(req,res) => {
    Course.find({},'students_record').then((course)=>{
        res.json(course)
    }).catch((err) => {
        throw err;
    })
})

app.get("/grade/:subject/:group",(req,res) => {

    Course.findOne({'Subject' : req.params.subject, 'group_number' : req.params.group},'students_record').then((course)=>{
        if(course){
            res.json(course)
        }else{
            res.sendStatus(404);
        }
        
    }).catch((err) => {
        
    })
})

app.get("/grade/:id",(req,res) => {

    Course.findById(req.params.id, 'students_record' ).then((course)=>{
        if(course){
            res.json(course)
        }else{
            res.sendStatus(404);
        }
        
    }).catch((err) => {
        
    })
})

app.delete("/grade/:id/:student/:grade",(req,res) => {

    Course.findById(req.params.id).then((course)=>{
        if(course){
            var mensaje;
            tam = course.students_record.length;
            for (let i = 0; i < tam; i++) {
                if(course.students_record[i].student==req.params.student){
                    var index = course.students_record[i].grades.indexOf(req.params.grade);
                    if (index!=-1){
                        course.students_record[i].grades.splice(index, 1);
                        mensaje="Eliminado";
                    }else{
                        mensaje="No encontrado";
                    }
                    course.save();
                    break;
                }
              }
              
        res.send(mensaje);
        
        }else{
            res.sendStatus(404);
        }
    }).catch((err) => {
        throw err;
    })
})

app.delete("/grade/:subject/:group/:student/:grade",(req,res) => {
    Course.findOne({'Subject' : req.params.Subject, 'group_number' : req.params.group}).then((course)=>{
        if(course){
            var mensaje;
            tam = course.students_record.length;
            for (let i = 0; i < tam; i++) {
                if(course.students_record[i].student==req.params.student){
                    var index = course.students_record[i].grades.indexOf(req.params.grade);
                    if (index!=-1){
                        course.students_record[i].grades.splice(index, 1);
                        mensaje="Eliminado";
                    }else{
                        mensaje="No encontrado";
                    }
                    course.save();
                    break;
                }
              }
              
        res.send(mensaje);
        }else{
            res.sendStatus(404);
        }
    }).catch((err) => {
        throw err;
    })
})

app.put("/grade/:id/:student/:grade",(req,res) => {
    Course.findById(req.params.id).then((course)=>{
        if(course){
            tam = course.students_record.length;
            for (let i = 0; i < tam; i++) {
                if(course.students_record[i].student==req.params.student){
                    course.students_record[i].grades.push(req.params.grade);
                    course.save();
                    break;
                }
              }
              
        res.send("guardado");
        
        }else{
            res.sendStatus(404);
        }
    }).catch((err) => {
        throw err;
    })
    
})

app.put("/grade/:subject/:group/:student/:grade",(req,res) => {
    Course.findOne({'Subject' : req.params.subject, 'group_number' : req.params.group}).then((course)=>{
        if(course){
            tam = course.students_record.length;
            for (let i = 0; i < tam; i++) {
                if(course.students_record[i].student==req.params.student){
                    course.students_record[i].grades.push(req.params.grade);
                    course.save();
                    break;
                }
              }
              
        res.send("guardado");
        
        }else{
            res.sendStatus(404);
        }
    }).catch((err) => {
        throw err;
    })
    
})

app.listen(4545, () => {
    console.log("hola mundo");
})
const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
    },
    class:{
        type:String,
        required:true,
    },
    contact:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
        required:true,
    }
},
{
    timestamps:true
})

const Student = mongoose.model('student',studentSchema);

module.exports = Student;
const Student = require('../models/student')

async function handleGetAllStudents(req,res){
    const allStudents = await Student.find({});
    const html = `<ul>
        ${allStudents.map(student =>`<li> ${student.first_name} : ${student.email}</li>`
        ).join()}
    </ul>`;
    res.status(200).send(html);
}


async function handleCreateStudent(req,res){
    const body = req.body;
    if(body){
        const result = await Student.create({
          first_name : body.first_name,
          last_name : body.last_name,
          class : body.class,
          contact : Number(body.contact),
          email : body.email,
          gender : body.gender,
        })
        return res.status(200).send({status: 200, Msg: 'New user Created',Data: result});
    }
}

async function handleUpdateStudent(req,res){
    const updateBody =  req.body
    const id = req.params.id;
    const updateResult = await Student.findByIdAndUpdate(id,updateBody)
    if(updateResult){
        res.status(200).send({status:200,msg:'Student updated',changed_data: updateResult});
    }
}

async function handleDeleteStudentById(req,res){
    const id = req.params.id;
    const deleteStudent = await Student.findByIdAndDelete(id);
    if(deleteStudent){
        res.status(200).send({status:200,msg:'Student deleted',result: deleteStudent});
    }
}
module.exports = {handleGetAllStudents, handleCreateStudent, handleUpdateStudent,handleDeleteStudentById};
const express = require('express')
const mongoose = require('mongoose')

const app = express();
const port = 8005;

app.use(express.urlencoded({extended:false}))

mongoose.connect('mongodb://127.0.0.1:27017/learn-mongo-2').then(()=> console.log('mongoDb Connected'))
.catch((err) => console.log('Error:',err))


app.get('/', async (req,res)=>{
    const allStudents = await Student.find({});
    const html = `<ul>
        ${allStudents.map(student =>`<li> ${student.first_name} : ${student.email}</li>`
        ).join()}
    </ul>`;
    return res.status(200).send(html);
})


app.post('/student', async(req,res)=>{
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
        res.status(200).send({status: 200, Msg: 'New user Created',Data: result});
    }
})
app.route('/student/:id').patch(async (req,res)=>{
    const updateBody =  req.body
    const id = req.params.id;
    const updateResult = await Student.findByIdAndUpdate(id,updateBody)
    if(updateResult){
        res.status(200).send({status:200,msg:'Student updated',changed_data: updateResult});
    }
})
.delete(async(req,res) => {
    const id = req.params.id;
    const deleteStudent = await Student.findByIdAndDelete(id);
    if(deleteStudent){
        res.status(200).send({status:200,msg:'Student deleted',result: deleteStudent});
    }
})

app.listen(port,(err)=> {
    if(err){
      console.log({'Error': err})
    }
    console.log("Server is running on port :",port)
});